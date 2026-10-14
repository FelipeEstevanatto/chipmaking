/**
 * The 3D wafer behind `FabProcess.vue`.
 *
 * Three.js is pulled in with a dynamic import, so the library is never in the page's initial
 * payload: the chapter only pays for it where the reader actually reaches the viewer.
 *
 * Each module of the loop has its own rig, built once and shown only while that module is current.
 * The rigs carry the process a step further than a marker would: a furnace tube with the oxide
 * growing under Deal-Grove-like kinetics, an ALD showerhead laying the film down cycle by cycle,
 * the resist spun out to a thickness that follows the spin speed, an exposure whose beams line up
 * with the openings of the mask, a directional etch with selectivity, an implant with a projected
 * range, a pad that removes the relief at a Preston-like rate, and an ellipsometer that reads the
 * film back. Each rig also prints the numbers it is computing, through `setReadout`.
 *
 * The module returns a plain handle so the Vue file stays a frame: controls, text and lifecycle.
 */

import type { FabMode, FabReadout } from './fab-stages'

type Three = typeof import('three')

export interface FabSceneHandle {
  setStage(index: number, mode: FabMode): void
  setBackground(color: string): void
  setAutoRotate(on: boolean): void
  setFocus(on: boolean): void
  setReadout(listener: ((lines: FabReadout[]) => void) | null): void
  orbitBy(dx: number, dy: number): void
  zoomBy(factor: number): void
  reset(): void
  dispose(): void
}

/** The mask is a GRID × GRID array of openings, and the UV beams are placed on the same lattice. */
const GRID = 4
const MASK_W = 1.5

function maskCenters(size: number): Array<[number, number]> {
  const pitch = size / GRID
  const centers: Array<[number, number]> = []
  for (let i = 0; i < GRID; i += 1) {
    for (let j = 0; j < GRID; j += 1) centers.push([(i + 0.5) * pitch, (j + 0.5) * pitch])
  }
  return centers
}

/** The lattice in the mask's own units, which is where the beams are placed. */
function beamPositions(): Array<[number, number]> {
  return maskCenters(256).map(([px, pz]) => [(px / 256 - 0.5) * MASK_W, (pz / 256 - 0.5) * MASK_W])
}

/** The grid of dies stamped on the wafer face, drawn once into a texture. */
function dieTexture(THREE: Three): import('three').CanvasTexture {
  const size = 512
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  const r = size / 2

  g.fillStyle = '#dbe3ec'
  g.beginPath()
  g.arc(r, r, r - 6, 0, Math.PI * 2)
  g.fill()
  g.strokeStyle = '#a0aec0'
  g.lineWidth = 2
  g.stroke()

  g.save()
  g.beginPath()
  g.arc(r, r, r - 8, 0, Math.PI * 2)
  g.clip()
  g.strokeStyle = '#8a94a6'
  g.lineWidth = 1.5
  for (let x = 8; x < size; x += 44) {
    g.beginPath()
    g.moveTo(x, 0)
    g.lineTo(x, size)
    g.stroke()
  }
  for (let y = 8; y < size; y += 44) {
    g.beginPath()
    g.moveTo(0, y)
    g.lineTo(size, y)
    g.stroke()
  }
  g.restore()

  g.fillStyle = '#ffffff'
  g.beginPath()
  g.arc(r, r, r + 2, Math.PI * 0.78, Math.PI * 1.02)
  g.arc(r, r, r - 22, Math.PI * 1.02, Math.PI * 0.78, true)
  g.closePath()
  g.fill()

  const texture = new THREE.CanvasTexture(c)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

/** A dark plate with the openings the UV beams pass through. */
function maskTexture(THREE: Three): import('three').CanvasTexture {
  const size = 256
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  g.fillStyle = '#2d3748'
  g.fillRect(0, 0, size, size)
  g.fillStyle = '#cbd5e0'
  const pitch = size / GRID
  for (const [px, pz] of maskCenters(size)) g.fillRect(px - pitch * 0.25, pz - pitch * 0.25, pitch * 0.5, pitch * 0.5)
  const texture = new THREE.CanvasTexture(c)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

interface Rig {
  group: import('three').Group
  reset(): void
  update(t: number, dt: number): void
  readout(t: number): FabReadout[]
}

export async function createFabScene(canvas: HTMLCanvasElement): Promise<FabSceneHandle | null> {
  let THREE: Three
  try {
    THREE = await import('three')
  } catch {
    return null
  }

  let renderer: import('three').WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  } catch {
    return null
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)

  scene.add(new THREE.AmbientLight(0xffffff, 1.05))
  const key = new THREE.DirectionalLight(0xffffff, 1.7)
  key.position.set(3.5, 5, 4)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0xffffff, 0.55)
  rim.position.set(-4, 2.5, -3)
  scene.add(rim)

  const wafer = new THREE.Group()
  scene.add(wafer)

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 0.06, 96, 1, false),
    new THREE.MeshStandardMaterial({ color: 0x9aa7b8, metalness: 0.4, roughness: 0.45 }),
  )
  wafer.add(body)

  const face = new THREE.Mesh(
    new THREE.CircleGeometry(1, 96),
    new THREE.MeshStandardMaterial({ map: dieTexture(THREE), metalness: 0.15, roughness: 0.7 }),
  )
  face.rotation.x = -Math.PI / 2
  face.position.y = 0.031
  wafer.add(face)

  // ---- small builders -------------------------------------------------------

  const disc = (radius: number, color: number, opacity: number, y: number) => {
    const mesh = new THREE.Mesh(
      new THREE.CircleGeometry(radius, 64),
      new THREE.MeshStandardMaterial({ color, transparent: true, opacity, roughness: 0.6, depthWrite: false }),
    )
    mesh.rotation.x = -Math.PI / 2
    mesh.position.y = y
    return mesh
  }

  const curtain = (count: number, radius: number, color: number, size: number) => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const a = Math.random() * Math.PI * 2
      const r = Math.sqrt(Math.random()) * radius
      positions[i * 3] = Math.cos(a) * r
      positions[i * 3 + 1] = Math.random() * 0.9
      positions[i * 3 + 2] = Math.sin(a) * r
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return new THREE.Points(
      geometry,
      new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.9, depthWrite: false }),
    )
  }

  const glow = (radius: number, height: number, color: number, opacity: number) =>
    new THREE.Mesh(
      new THREE.ConeGeometry(radius, height, 40, 1, true),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }),
    )

  const beam = (radius: number, height: number, color: number, opacity: number) =>
    new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, height, 12, 1, true),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }),
    )

  // ---- rigs -----------------------------------------------------------------

  /**
   * The resist as a real radial thickness field.
   *
   * The profile h(r, t) is advanced with the spin-coating lubrication equation
   * `∂h/∂t = -(1/r) ∂(r·Q)/∂r`, with `Q = (ρ·ω² / 3η)·r·h³` (Emslie, Bonner and Miller, 1958): the
   * centrifugal force drives the fluid outward, the film thins, and the excess leaves at the wafer
   * edge. The field is drawn as a surface of revolution, with the height exaggerated by a fixed
   * factor because 1 µm of resist on a 300 mm wafer is invisible at true scale.
   */
  function resistField() {
    const RINGS = 48
    const SEG = 96
    const dr = 1 / RINGS
    const RHO = 1100
    const ETA = 5e-4
    const H_REF = 3000e-9
    const Y_MAX = 0.5
    const DEBUGMAT = new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.DoubleSide })

    let h = new Float32Array(RINGS)

    const profile: import('three').Vector2[] = [new THREE.Vector2(0, 0)]
    for (let i = 0; i < RINGS; i += 1) profile.push(new THREE.Vector2((i + 0.5) * dr, 0))
    profile.push(new THREE.Vector2(1, 0))

    const geometry = new THREE.LatheGeometry(profile, SEG)
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(geometry.attributes.position.count * 3), 3))
    const material = DEBUGMAT
    const mesh = new THREE.Mesh(geometry, material)

    function paint() {
      const pos = geometry.attributes.position
      const col = geometry.attributes.color
      for (let p = 0; p < profile.length; p += 1) {
        const cell = p === 0 ? 0 : Math.min(RINGS - 1, p - 1)
        const t = Math.min(1, h[cell] / H_REF)
        const y = Y_MAX * t
        const r = 0.74 - 0.34 * t
        const g = 0.6 - 0.36 * t
        const b = 0.96 - 0.18 * t
        for (let j = 0; j <= SEG; j += 1) {
          const v = j * profile.length + p
          pos.array[v * 3 + 1] = y
          col.array[v * 3] = r
          col.array[v * 3 + 1] = g
          col.array[v * 3 + 2] = b
        }
      }
      pos.needsUpdate = true
      col.needsUpdate = true
      geometry.computeVertexNormals()
    }

    function init() {
      for (let i = 0; i < RINGS; i += 1) {
        h[i] = 2000e-9 + 800e-9 * Math.exp(-((((i + 0.5) * dr) / 0.3) ** 2))
      }
      paint()
    }

    function substep(dt: number, omega: number) {
      const K = (RHO * omega * omega) / (3 * ETA)
      const Q = new Float32Array(RINGS + 1)
      for (let i = 0; i <= RINGS; i += 1) {
        let hf: number
        if (i === 0) hf = 0
        else if (i === RINGS) hf = h[RINGS - 1]
        else hf = 0.5 * (h[i - 1] + h[i])
        Q[i] = K * (i * dr) * hf * hf * hf
      }
      const next = new Float32Array(RINGS)
      for (let i = 0; i < RINGS; i += 1) {
        const rc = (i + 0.5) * dr
        const flux = (i + 1) * dr * Q[i + 1] - i * dr * Q[i]
        next[i] = Math.max(0, h[i] - (dt * flux) / (rc * dr))
      }
      h = next
    }

    function advance(dt: number, omega: number) {
      const steps = Math.max(1, Math.ceil(dt / 0.002))
      const sub = dt / steps
      for (let k = 0; k < steps; k += 1) substep(sub, omega)
      paint()
    }

    function shrink(factor: number) {
      for (let i = 0; i < RINGS; i += 1) h[i] *= factor
      paint()
    }

    function measure() {
      let sum = 0
      let weight = 0
      for (let i = 0; i < RINGS; i += 1) {
        const rc = (i + 0.5) * dr
        sum += h[i] * rc
        weight += rc
      }
      return { centre: h[0], edge: h[RINGS - 1], mean: sum / weight }
    }

    function surfaceY() {
      return Y_MAX * Math.min(1, measure().mean / H_REF) + 0.006
    }

    return { mesh, init, advance, shrink, measure, surfaceY }
  }

  /** Oxidation: a furnace tube, a flow of dry oxygen, and the oxide growing on the wafer. */
  function furnaceRig(): Rig {
    const group = new THREE.Group()
    const tube = new THREE.Mesh(
      new THREE.CylinderGeometry(1.35, 1.35, 3.4, 44, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xa0aec0, transparent: true, opacity: 0.16, side: THREE.DoubleSide, metalness: 0.2, roughness: 0.3 }),
    )
    tube.rotation.x = Math.PI / 2
    tube.position.y = 0.2
    group.add(tube)

    const coils: import('three').Mesh[] = []
    for (let i = 0; i < 6; i += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.36, 0.03, 10, 40),
        new THREE.MeshStandardMaterial({ color: 0xdd6b20, emissive: 0xdd6b20, emissiveIntensity: 0.8, roughness: 0.5 }),
      )
      ring.rotation.y = Math.PI / 2
      ring.position.set(-1.3 + i * 0.52, 0.2, 0)
      coils.push(ring)
      group.add(ring)
    }

    const gas = curtain(300, 1.0, 0x90cdf4, 0.016)
    gas.rotation.z = Math.PI / 2
    group.add(gas)

    const oxide = disc(0.98, 0xf6e05e, 0, 0.045)
    group.add(oxide)

    // Deal-Grove, thin-oxide branch: x² + A·x = B·t, with the constants tuned to land near 1.2 nm.
    const A = 0.6
    const B = 0.6
    const growth = (t: number) => (-A + Math.sqrt(A * A + 4 * B * t)) / 2

    return {
      group,
      reset() {
        oxide.material.opacity = 0
      },
      update(t) {
        coils.forEach((ring, i) => {
          ;(ring.material as import('three').MeshStandardMaterial).emissiveIntensity = 0.5 + 0.4 * Math.sin(t * 3 - i * 0.5)
        })
        gas.position.z = 1.7 - ((t * 0.6) % 3.4)
        const x = growth(t)
        oxide.material.opacity = Math.min(0.6, x / 1.3)
      },
      readout(t) {
        const x = growth(t)
        return [
          { id: 'temperature', value: '1000 °C' },
          { id: 'gas', value: 'O₂ seco' },
          { id: 'oxide', value: `${x.toFixed(2)} nm` },
        ]
      },
    }
  }

  /** Deposition: an ALD showerhead pulsing precursor onto the wafer, one cycle at a time. */
  function depositRig(): Rig {
    const group = new THREE.Group()
    const head = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 0.08, 48),
      new THREE.MeshStandardMaterial({ color: 0x4a5568, metalness: 0.6, roughness: 0.35 }),
    )
    head.position.y = 1.1
    group.add(head)
    const holes: import('three').Mesh[] = []
    for (let i = 0; i < 40; i += 1) {
      const a = Math.random() * Math.PI * 2
      const r = Math.sqrt(Math.random()) * 0.85
      const hole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.02, 8),
        new THREE.MeshBasicMaterial({ color: 0x90cdf4 }),
      )
      hole.position.set(Math.cos(a) * r, 1.05, Math.sin(a) * r)
      holes.push(hole)
      group.add(hole)
    }
    const pulse = curtain(360, 0.95, 0x63b3ed, 0.017)
    pulse.position.y = 0.6
    group.add(pulse)
    const film = disc(0.98, 0xa0aec0, 0, 0.045)
    group.add(film)

    const CYCLE = 0.55
    const GPC = 0.11 // nm per cycle, a typical ALD value

    return {
      group,
      reset() {
        film.material.opacity = 0
      },
      update(t) {
        // A pulse every CYCLE seconds: precursor in, purge, precursor in.
        const phase = (t % CYCLE) / CYCLE
        pulse.visible = phase < 0.5
        pulse.position.y = 1.05 - ((t % CYCLE) / CYCLE) * 0.95
        const cycles = Math.floor(t / CYCLE)
        film.material.opacity = Math.min(0.75, (cycles * GPC) / 3)
        holes.forEach((h, i) => {
          ;(h.material as import('three').MeshBasicMaterial).opacity = phase < 0.5 && i % 3 === 0 ? 1 : 0.3
        })
      },
      readout(t) {
        const cycles = Math.floor(t / CYCLE)
        return [
          { id: 'cycles', value: `${cycles}` },
          { id: 'gpc', value: `${GPC.toFixed(2)} nm` },
          { id: 'film', value: `${(cycles * GPC).toFixed(2)} nm` },
        ]
      },
    }
  }

  /**
   * Lithography: spin coating, soft bake, exposure and development.
   *
   * The resist thins with the spin speed (the classic spin-coating result: the film thickness falls
   * as the square root of the angular speed), the mask then comes down and the ultraviolet beams
   * line up with its openings, and the exposed squares are dissolved away at the end.
   */
  function coatRig(): Rig {
    const group = new THREE.Group()

    const nozzle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.06, 0.16, 20),
      new THREE.MeshStandardMaterial({ color: 0x4a5568, metalness: 0.6, roughness: 0.35 }),
    )
    nozzle.position.set(0, 0.72, 0)
    group.add(nozzle)

    const drop = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 20, 16),
      new THREE.MeshStandardMaterial({ color: 0xb794f4, roughness: 0.35 }),
    )
    drop.position.set(0, 0.6, 0)
    group.add(drop)

    const field = resistField()
    group.add(field.mesh)

    // The thicker rim the spin leaves at the edge of the wafer.
    const bead = new THREE.Mesh(
      new THREE.TorusGeometry(0.96, 0.022, 10, 80),
      new THREE.MeshStandardMaterial({ color: 0x9f7aea, transparent: true, opacity: 0, roughness: 0.4 }),
    )
    bead.rotation.x = Math.PI / 2
    bead.position.y = 0.06
    group.add(bead)

    const hotplate = disc(1.05, 0xdd6b20, 0, -0.07)
    group.add(hotplate)

    const mask = new THREE.Mesh(
      new THREE.BoxGeometry(MASK_W, 0.04, MASK_W),
      new THREE.MeshStandardMaterial({ map: maskTexture(THREE), transparent: true, opacity: 0.55, roughness: 0.5, depthWrite: false }),
    )
    mask.position.y = 1.5
    group.add(mask)

    // One beam per opening, so the light matches the mask instead of flooding the wafer.
    const beams: import('three').Mesh[] = []
    const squares: import('three').Mesh[] = []
    for (const [x, z] of beamPositions()) {
      const b = beam(0.05, 0.9, 0xb794f4, 0)
      b.position.set(x, 0.62, z)
      beams.push(b)
      group.add(b)
      const sq = new THREE.Mesh(
        new THREE.PlaneGeometry(0.11, 0.11),
        new THREE.MeshStandardMaterial({ color: 0xd6bcfa, transparent: true, opacity: 0, depthWrite: false }),
      )
      sq.rotation.x = -Math.PI / 2
      sq.position.set(x, 0.062, z)
      squares.push(sq)
      group.add(sq)
    }

    let spinBoost = 1

    return {
      group,
      reset() {
        drop.visible = true
        drop.position.y = 0.6
        drop.scale.setScalar(1)
        field.init()
        bead.material.opacity = 0
        hotplate.material.opacity = 0
        mask.position.y = 1.5
        beams.forEach((b) => ((b.material as import('three').MeshBasicMaterial).opacity = 0))
        squares.forEach((s) => ((s.material as import('three').MeshStandardMaterial).opacity = 0))
        spinBoost = 1
      },
      update(t, dt) {
        const s = 2.6 // TEMP freeze
        // 1. Dispense (0.0 to 1.3 s).
        const fall = Math.min(1, s / 1.1)
        drop.visible = s < 1.5
        drop.position.y = 0.6 - fall * 0.55
        if (s >= 1.1 && s < 1.5) drop.scale.set(1 + (s - 1.1) * 3, Math.max(0.15, 1 - (s - 1.1) * 2.4), 1 + (s - 1.1) * 3)

        // 2. Spin coat (1.3 to 3.8 s): the lubrication model drives the fluid outward and thins it.
        const ramp = Math.max(0, Math.min(1, (s - 1.3) / 0.9))
        const rpm = Math.round(ramp * 3000)
        spinBoost = s > 1.3 && s < 3.8 ? 1 + ramp * 13 : 1
        if (s > 1.3 && s < 3.8) field.advance(dt, Math.max(1, (rpm / 60) * 2 * Math.PI))
        bead.material.opacity = s > 2.4 ? 0.5 : 0

        // 3. Soft bake (3.8 to 4.6 s): the solvent leaves, so the film shrinks to its dry thickness.
        const baking = s > 3.8 && s < 4.6
        hotplate.material.opacity = baking ? 0.35 + 0.15 * Math.sin(t * 4) : 0
        if (baking) field.shrink(Math.pow(0.12, dt / 0.8))

        // 4. Exposure (4.6 to 6.6 s): the mask comes down and the beams print the openings.
        mask.position.y = 1.5 - Math.max(0, Math.min(0.85, (s - 4.6) / 0.9)) * 0.85
        const lit = s > 5.4 && s < 6.6
        beams.forEach((b) => ((b.material as import('three').MeshBasicMaterial).opacity = lit ? 0.34 + 0.16 * Math.sin(t * 20) : 0))
        const surface = field.surfaceY()
        squares.forEach((sq) => {
          sq.position.y = surface
          ;(sq.material as import('three').MeshStandardMaterial).opacity = s > 5.4 ? 0.9 : 0
        })

        // 5. Development (6.6 to 8.0 s): the exposed squares are dissolved away.
        if (s > 6.6) squares.forEach((sq) => ((sq.material as import('three').MeshStandardMaterial).opacity = Math.max(0, 0.9 - (s - 6.6) * 2)))
      },
      readout(t) {
        const s = t % 8
        const m = field.measure()
        const nm = (v: number) => `${Math.round(v * 1e9)} nm`
        if (s < 1.3) return [{ id: 'resist', value: nm(m.centre) }, { id: 'spin', value: '0 rpm' }]
        if (s < 3.8) {
          const rpm = Math.round(Math.max(0, Math.min(1, (s - 1.3) / 0.9)) * 3000)
          return [{ id: 'spin', value: `${rpm} rpm` }, { id: 'resist', value: nm(m.centre) }]
        }
        if (s < 4.6) return [{ id: 'bake', value: '100 °C' }, { id: 'resist', value: nm(m.centre) }]
        if (s < 6.6) return [{ id: 'wavelength', value: '193 nm' }, { id: 'dose', value: '30 mJ/cm²' }]
        return [{ id: 'develop', value: 'TMAH' }, { id: 'pattern', value: '45 nm' }]
      },
      get spin() {
        return spinBoost
      },
    } as Rig & { spin: number }
  }

  /** Etching: a directional plasma that cuts the film and stops on the oxide. */
  function etchRig(): Rig {
    const group = new THREE.Group()
    const plasma = glow(0.7, 0.7, 0x4fd1c5, 0.22)
    plasma.position.y = 0.42
    group.add(plasma)
    const ions = curtain(320, 0.6, 0x63b3ed, 0.02)
    ions.position.y = 0.4
    group.add(ions)
    // The trench: a dark slot that deepens, with the oxide left standing underneath.
    const trench = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.1, 0.24),
      new THREE.MeshStandardMaterial({ color: 0x2d3748, roughness: 0.7 }),
    )
    trench.position.y = 0.05
    group.add(trench)
    const oxideStop = disc(0.98, 0xf6e05e, 0, 0.044)
    group.add(oxideStop)

    return {
      group,
      reset() {
        trench.scale.y = 0.001
        oxideStop.material.opacity = 0
      },
      update(t) {
        plasma.material.opacity = 0.16 + 0.1 * Math.sin(t * 5)
        ions.position.y = 1.0 - ((t * 1.2) % 1.0)
        trench.scale.y = Math.min(1, Math.max(0.001, t / 3))
        oxideStop.material.opacity = Math.min(0.35, Math.max(0, (t - 2) / 2) * 0.35)
      },
      readout(t) {
        const depth = Math.min(90, t * 30)
        return [
          { id: 'depth', value: `${Math.round(depth)} nm` },
          { id: 'selectivity', value: '8:1' },
          { id: 'gas', value: 'SF₆ / O₂' },
        ]
      },
    }
  }

  /** Implantation: a beam that drives the dopant to a projected range, then an anneal. */
  function implantRig(): Rig {
    const group = new THREE.Group()
    const column = beam(0.18, 0.95, 0x4299e1, 0.16)
    column.position.y = 0.5
    group.add(column)
    const ions = curtain(260, 0.2, 0x90cdf4, 0.026)
    ions.position.y = 0.5
    group.add(ions)
    // The stopped ions, spread around the projected range.
    const stop = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 24, 16),
      new THREE.MeshBasicMaterial({ color: 0x90cdf4, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
    )
    stop.position.y = 0.0
    group.add(stop)
    const doped = disc(0.3, 0x90cdf4, 0, 0.045)
    group.add(doped)
    const anneal = disc(0.98, 0xed8936, 0, 0.05)
    group.add(anneal)

    return {
      group,
      reset() {
        stop.material.opacity = 0
        doped.material.opacity = 0
        anneal.material.opacity = 0
      },
      update(t) {
        column.material.opacity = t < 3.4 ? 0.12 + 0.08 * Math.sin(t * 6) : 0
        ions.visible = t < 3.4
        ions.position.y = 1.0 - ((t * 2.4) % 1.0)
        stop.material.opacity = t < 3.4 ? Math.min(0.8, t / 2) : Math.max(0, 0.8 - (t - 3.4) * 2)
        doped.material.opacity = Math.min(0.75, Math.max(0, (t - 0.5) / 2.5) * 0.75)
        anneal.material.opacity = t > 3.6 ? 0.3 * (0.6 + 0.4 * Math.sin(t * 4)) : 0
      },
      readout(t) {
        const dose = Math.min(3, t / 1.2)
        return [
          { id: 'energy', value: '30 keV' },
          { id: 'dose', value: `${dose.toFixed(1)}×10¹⁵ cm⁻²` },
          { id: 'range', value: '90 nm' },
        ]
      },
    }
  }

  /** Planarisation: a pad that removes the relief at a Preston-like rate. */
  function cmpRig(): Rig {
    const group = new THREE.Group()
    const pad = new THREE.Mesh(
      new THREE.CylinderGeometry(0.52, 0.52, 0.09, 48),
      new THREE.MeshStandardMaterial({ color: 0x718096, metalness: 0.3, roughness: 0.6 }),
    )
    pad.position.set(0.3, 0.16, 0.22)
    group.add(pad)
    const slurry = disc(0.98, 0xdd6b20, 0, 0.05)
    group.add(slurry)
    // The relief the pad is erasing.
    const relief = disc(0.98, 0x4a5568, 0, 0.058)
    relief.scale.setScalar(0.001)
    group.add(relief)

    return {
      group,
      reset() {
        slurry.material.opacity = 0
        relief.scale.setScalar(0.001)
      },
      update(t) {
        pad.rotation.y = t * 4
        pad.position.y = 0.16 - 0.02 * Math.sin(t * 2)
        slurry.material.opacity = 0.25 * (0.6 + 0.4 * Math.sin(t * 3))
        relief.scale.setScalar(Math.max(0.001, 1 - Math.min(1, t / 3)))
      },
      readout(t) {
        const removed = Math.min(180, t * 60)
        return [
          { id: 'pressure', value: '4 psi' },
          { id: 'removed', value: `${Math.round(removed)} nm` },
          { id: 'rate', value: '200 nm/min' },
        ]
      },
    }
  }

  /** Metrology: an ellipsometer reading the film, sweeping a thickness map of the wafer as it goes. */
  function measureRig(): Rig {
    const group = new THREE.Group()

    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.14, 0.18),
      new THREE.MeshStandardMaterial({ color: 0x2d3748, metalness: 0.5, roughness: 0.4 }),
    )
    group.add(head)

    // The beam in, and the two reflections: one off the top of the film, one off the film/substrate
    // interface. The two paths are what an ellipsometer turns into a thickness.
    const incoming = beam(0.012, 0.5, 0x2f855a, 0.75)
    const top = beam(0.012, 0.42, 0x2f855a, 0.75)
    const bottom = beam(0.012, 0.42, 0x68d391, 0.6)
    group.add(incoming, top, bottom)

    const spot = new THREE.Mesh(
      new THREE.RingGeometry(0.03, 0.05, 32),
      new THREE.MeshBasicMaterial({ color: 0x2f855a, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false }),
    )
    spot.rotation.x = -Math.PI / 2
    spot.position.y = 0.05
    group.add(spot)

    // The thickness map: one dot per measured site, lit as the head sweeps its spiral.
    const SITES = 96
    const sites: Array<[number, number]> = []
    const dots: import('three').Mesh[] = []
    for (let k = 0; k < SITES; k += 1) {
      const a = k * 0.42
      const r = 0.06 + 0.88 * (k / (SITES - 1))
      sites.push([Math.cos(a) * r, Math.sin(a) * r])
      const dot = new THREE.Mesh(
        new THREE.RingGeometry(0.012, 0.022, 16),
        new THREE.MeshBasicMaterial({ color: 0x2f855a, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }),
      )
      dot.rotation.x = -Math.PI / 2
      dot.position.set(sites[k][0], 0.048, sites[k][1])
      dots.push(dot)
      group.add(dot)
    }

    let at = 0
    return {
      group,
      reset() {
        dots.forEach((d) => ((d.material as import('three').MeshBasicMaterial).opacity = 0))
        at = 0
      },
      update(t) {
        const sweep = (t / 6) % 1
        at = Math.min(SITES - 1, Math.floor(sweep * SITES))
        const [x, z] = sites[at]
        head.position.set(x - 0.26, 0.34, z)
        incoming.position.set(x - 0.13, 0.2, z)
        incoming.rotation.z = -0.75
        top.position.set(x + 0.13, 0.2, z)
        top.rotation.z = 0.75
        bottom.position.set(x + 0.11, 0.17, z)
        bottom.rotation.z = 0.6
        spot.position.set(x, 0.05, z)
        dots.forEach((d, i) => ((d.material as import('three').MeshBasicMaterial).opacity = i <= at ? 0.75 : 0))
      },
      readout(t) {
        const sweep = (t / 6) % 1
        const points = Math.round(Math.min(1, sweep) * SITES)
        return [
          { id: 'method', value: 'Elipsometria' },
          { id: 'film', value: '3.10 nm' },
          { id: 'precision', value: `±0.02 nm · ${points}` },
        ]
      },
    }
  }

  const rigs: Record<FabMode, Rig> = {
    furnace: furnaceRig(),
    deposit: depositRig(),
    coat: coatRig(),
    etch: etchRig(),
    implant: implantRig(),
    cmp: cmpRig(),
    measure: measureRig(),
  }
  for (const rig of Object.values(rigs)) {
    rig.group.visible = false
    wafer.add(rig.group)
  }

  let active: Rig = rigs.furnace
  let activeMode: FabMode = 'furnace'
  let readoutListener: ((lines: FabReadout[]) => void) | null = null
  let readoutClock = 0

  // ---- camera ---------------------------------------------------------------

  const home = { yaw: 0.7, pitch: 0.62, dist: 3.3 }
  let yaw = home.yaw
  let pitch = home.pitch
  let dist = home.dist
  let distTarget = home.dist
  const look = new THREE.Vector3(0, 0, 0)
  const lookTarget = new THREE.Vector3(0, 0, 0)
  const DIE = new THREE.Vector3(0.34, 0.03, 0.24)
  let focus = false
  let spin = 0
  let autoRotate = true
  let raf = 0
  let last = 0
  let stageClock = 0

  function placeCamera() {
    const cp = Math.cos(pitch)
    camera.position.set(
      look.x + dist * cp * Math.sin(yaw),
      look.y + dist * Math.sin(pitch),
      look.z + dist * cp * Math.cos(yaw),
    )
    camera.lookAt(look)
  }

  function resize() {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  function frame(time: number) {
    const dt = last ? Math.min((time - last) / 1000, 0.1) : 0
    last = time
    stageClock += dt

    const boost = (active as Rig & { spin?: number }).spin ?? 1
    if (autoRotate) spin += dt * 0.32 * boost
    wafer.rotation.y = spin

    const k = Math.min(1, dt * 6)
    dist += (distTarget - dist) * k
    look.lerp(lookTarget, k)
    placeCamera()

    active.update(stageClock, dt)

    readoutClock += dt
    if (readoutListener && readoutClock > 0.2) {
      readoutClock = 0
      readoutListener(active.readout(stageClock))
    }

    renderer.render(scene, camera)
    raf = requestAnimationFrame(frame)
  }

  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  resize()
  placeCamera()
  active.group.visible = true
  active.reset()
  raf = requestAnimationFrame(frame)

  // ---- pointer: drag to orbit, wheel and pinch to zoom ----------------------

  const pointers = new Map<number, { x: number; y: number }>()
  let pinchDistance = 0

  function onPointerDown(event: PointerEvent) {
    canvas.setPointerCapture(event.pointerId)
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()]
      pinchDistance = Math.hypot(a.x - b.x, a.y - b.y)
    }
  }

  function onPointerMove(event: PointerEvent) {
    const previous = pointers.get(event.pointerId)
    if (!previous) return
    const dx = event.clientX - previous.x
    const dy = event.clientY - previous.y
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointers.size >= 2) {
      const [a, b] = [...pointers.values()]
      const next = Math.hypot(a.x - b.x, a.y - b.y)
      if (pinchDistance > 0 && next > 0) distTarget = Math.max(1.5, Math.min(7, distTarget * (pinchDistance / next)))
      pinchDistance = next
      return
    }

    yaw += dx * 0.008
    pitch = Math.max(-0.15, Math.min(1.4, pitch + dy * 0.006))
  }

  function onPointerUp(event: PointerEvent) {
    pointers.delete(event.pointerId)
    pinchDistance = 0
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId)
  }

  function onWheel(event: WheelEvent) {
    event.preventDefault()
    distTarget = Math.max(1.5, Math.min(7, distTarget * (event.deltaY > 0 ? 1.12 : 0.89)))
  }

  canvas.addEventListener('pointerdown', onPointerDown)
  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerup', onPointerUp)
  canvas.addEventListener('pointercancel', onPointerUp)
  canvas.addEventListener('wheel', onWheel, { passive: false })

  return {
    setStage(index: number, mode: FabMode) {
      if (mode !== activeMode) {
        active.group.visible = false
        active = rigs[mode]
        activeMode = mode
        active.group.visible = true
        active.reset()
      }
      stageClock = 0
      readoutClock = 1
      void index
    },
    setBackground(color: string) {
      scene.background = new THREE.Color(color)
    },
    setAutoRotate(on: boolean) {
      autoRotate = on
    },
    setFocus(on: boolean) {
      focus = on
      distTarget = focus ? 1.75 : home.dist
      lookTarget.copy(focus ? DIE : new THREE.Vector3(0, 0, 0))
    },
    setReadout(listener: ((lines: FabReadout[]) => void) | null) {
      readoutListener = listener
    },
    orbitBy(dx: number, dy: number) {
      yaw += dx
      pitch = Math.max(-0.15, Math.min(1.4, pitch + dy))
      placeCamera()
    },
    zoomBy(factor: number) {
      distTarget = Math.max(1.5, Math.min(7, distTarget * factor))
    },
    reset() {
      yaw = home.yaw
      pitch = home.pitch
      distTarget = focus ? 1.75 : home.dist
      lookTarget.copy(focus ? DIE : new THREE.Vector3(0, 0, 0))
      spin = 0
      stageClock = 0
      active.reset()
    },
    dispose() {
      cancelAnimationFrame(raf)
      observer.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
      canvas.removeEventListener('wheel', onWheel)
      scene.traverse((object) => {
        const mesh = object as import('three').Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const material = mesh.material as import('three').Material | import('three').Material[]
        if (Array.isArray(material)) material.forEach((m) => m.dispose())
        else material?.dispose()
      })
      renderer.dispose()
    },
  }
}
