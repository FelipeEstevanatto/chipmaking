/**
 * The animated cross-section behind `FabProcess.vue`.
 *
 * It is a plain canvas model with no Vue in it, so the same code can be exercised from a scratch
 * page. Everything is drawn in a fixed 900 × 560 space and the component scales that to the width
 * the page gives it.
 *
 * Each module of the loop draws the wafer as a **cross-section** and animates the one thing that
 * process does to it, using the numbers the chapter gives:
 *
 *  - oxidation splits the growing oxide around the original silicon surface — about 46 % of the
 *    thickness is silicon consumed below it, about 54 % grows above it — and the thickness follows
 *    Deal–Grove, going linear while the film is thin and parabolic once it thickens;
 *  - deposition pulses an ALD precursor onto a trench and draws the film as a true conformal coat,
 *    clipped to the vacuum side of the surface so wall, floor and top come out the same thickness;
 *  - lithography spins the resist down to a thickness that falls with the square root of the spin
 *    speed, exposes it through the openings of the mask and dissolves what was exposed;
 *  - etching drives the film down only where the mask opened, with vertical walls, and shows the
 *    isotropic profile a wet etch would have left as a ghost beside it;
 *  - implantation tilts the beam 7° off the normal so ions do not channel down the lattice, lets
 *    them stop around a projected range, then anneals the damage back into crystal;
 *  - planarisation presses a rotating pad on the relief and flattens it, then dishing and erosion
 *    appear where the pattern is wide or dense;
 *  - metrology bounces polarised light off the stack and resolves the thickness from the reflection.
 *
 * Every stage prints the quantities it is computing — through `readout` — and every drawing carries
 * a scale bar, because a 2 nm film and a 300 mm wafer cannot share one ruler.
 */

import { STAGE_DURATION, stagePhases, type FabMode, type FabReadout } from './fab-stages'

export const SCENE_W = 900
export const SCENE_H = 560

export interface Palette {
  muted: string
  faint: string
  panel: string
  panelLine: string
  si: string
  siLine: string
  oxide: string
  oxideLine: string
  film: string
  filmLine: string
  resist: string
  resistLine: string
  exposed: string
  mask: string
  quartz: string
  metal: string
  metalLine: string
  cu: string
  ion: string
  beam: string
  heat: string
  good: string
  alert: string
  glow: string
}

export const LIGHT: Palette = {
  muted: '#4a5568',
  faint: '#a0aec0',
  panel: '#ffffff',
  panelLine: '#cbd5e0',
  si: '#cfd8e3',
  siLine: '#7d8b9c',
  oxide: '#f6e05e',
  oxideLine: '#b7791f',
  film: '#90cdf4',
  filmLine: '#2b6cb0',
  resist: '#c6f6d5',
  resistLine: '#2f855a',
  exposed: '#68d391',
  mask: '#2d3748',
  quartz: '#e2e8f0',
  metal: '#805ad5',
  metalLine: '#553c9a',
  cu: '#ed8936',
  ion: '#dd6b20',
  beam: '#c05621',
  heat: '#c53030',
  good: '#2f855a',
  alert: '#c53030',
  glow: 'rgba(221, 107, 32, 0.15)',
}

export const DARK: Palette = {
  muted: '#a0aec0',
  faint: '#718096',
  panel: '#1c222c',
  panelLine: '#3a4351',
  si: '#48525f',
  siLine: '#8b98aa',
  oxide: '#caa53c',
  oxideLine: '#f0d488',
  film: '#3a7fb5',
  filmLine: '#8cc7ea',
  resist: '#2f6b4a',
  resistLine: '#7fd6a2',
  exposed: '#4ea06e',
  mask: '#0b1017',
  quartz: '#39424f',
  metal: '#7c5cc4',
  metalLine: '#c3aaf0',
  cu: '#e08a30',
  ion: '#f0a04a',
  beam: '#f5b878',
  heat: '#f06868',
  good: '#6fd39a',
  alert: '#f06868',
  glow: 'rgba(237, 137, 54, 0.13)',
}

/* ------------------------------------------------------------------ geometry */

const X0 = 120
const X1 = 780
const VW = X1 - X0
/** The nominal top of the silicon — the surface before the loop touched it. */
const SUF = 330
/** The bottom of the drawn substrate. */
const BASE = 496

/**
 * The three openings the mask carries, shared by lithography, etching and deposition, so that a
 * reader stepping through those modules sees the same pattern rather than three unrelated ones.
 */
const WIN = [
  { a: 302, b: 358 },
  { a: 422, b: 478 },
  { a: 542, b: 598 },
]

/**
 * The patterned film the CD-SEM reads. A schematic grating rather than a scale drawing: the point is
 * that the layer now has lines with widths, which is what a critical dimension is.
 */
const CD_GRATING = { x0: 158, period: 64, width: 46, count: 10 }

/** The same opening seen from close up: the trench the ALD film is laid into. */
const TRENCH = { a: WIN[1].a, b: WIN[1].b, depth: 112 }

/** Share of an oxide's thickness that lies below the original surface (Si density 2.33, SiO₂ 2.27). */
const CONSUMED = 0.456

/**
 * How far the lithography mask floats above the resist. Projection lithography never touches the
 * wafer, and the gap is what makes the cones of light readable.
 */
const MASK_GAP = 130

/* -------------------------------------------------------------- small helpers */

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v)
const clamp01 = (v: number) => clamp(v, 0, 1)
/** Smoothstep of a 0…1 ramp. */
const smooth = (v: number) => {
  const x = clamp01(v)
  return x * x * (3 - 2 * x)
}
/** Progress through the window [a, b] of a clock running in seconds. */
const span = (t: number, a: number, b: number) => smooth((t - a) / (b - a))
const lerp = (a: number, b: number, k: number) => a + (b - a) * k

const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'

/** A hex colour blended toward another, for the thickness map's ramp. */
function parseHex(h: string): [number, number, number] {
  const s = h.replace('#', '')
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)]
}
function mix(a: string, b: string, k: number): string {
  const [ar, ag, ab] = parseHex(a)
  const [br, bg, bb] = parseHex(b)
  return `rgb(${Math.round(lerp(ar, br, k))}, ${Math.round(lerp(ag, bg, k))}, ${Math.round(lerp(ab, bb, k))})`
}

/**
 * Deal–Grove at 1000 °C on (100) silicon: x² + A·x = B·t, with t in hours and x returned in nm.
 * Steam (wet) is roughly twenty times faster than dry O₂, which is why the thick oxides are grown
 * wet and only the gate oxide is grown dry.
 */
const DG = {
  dry: { A: 0.165, B: 0.0117 },
  wet: { A: 0.226, B: 0.287 },
}
function dealGrove(hours: number, c = DG.wet): number {
  const x = (-c.A + Math.sqrt(c.A * c.A + 4 * c.B * Math.max(hours, 0))) / 2
  return x * 1000
}

/* ------------------------------------------------------------------- the scene */

export class FabScene {
  /** Off for readers who asked for reduced motion: molecules hold still and only the end state shows. */
  motion = true

  private index = 0
  private mode: FabMode = 'furnace'
  /** Clock of the current module, in milliseconds. */
  private t = 0

  get stage(): number {
    return this.index
  }

  enter(index: number, mode: FabMode) {
    this.index = index
    this.mode = mode
    this.t = 0
  }

  /** Jumps to the end of the current module, for reduced motion. */
  settle() {
    this.t = STAGE_DURATION[this.mode]
  }

  update(dt: number) {
    const limit = STAGE_DURATION[this.mode]
    this.t = clamp(this.t + dt, 0, limit)
  }

  /** How far through the current module's process the scene is, as a 0…1 fraction. */
  progress(): number {
    return clamp01(this.t / STAGE_DURATION[this.mode])
  }

  /** Jumps to a point in the current module's process, for the scrubber. */
  seek(fraction: number) {
    this.t = clamp01(fraction) * STAGE_DURATION[this.mode]
  }

  /** The second at which each phase of the current module begins, for the timeline's checkpoints. */
  phaseStarts(): number[] {
    return stagePhases(this.mode).map((phase) => phase.at)
  }

  draw(ctx: CanvasRenderingContext2D, p: Palette) {
    const s = this.t / 1000
    ctx.lineJoin = 'round'
    ctx.lineCap = 'butt'
    switch (this.mode) {
      case 'furnace':
        this.drawFurnace(ctx, p, s)
        break
      case 'deposit':
        this.drawDeposit(ctx, p, s)
        break
      case 'coat':
        this.drawCoat(ctx, p, s)
        break
      case 'etch':
        this.drawEtch(ctx, p, s)
        break
      case 'implant':
        this.drawImplant(ctx, p, s)
        break
      case 'cmp':
        this.drawCmp(ctx, p, s)
        break
      case 'measure':
        this.drawMeasure(ctx, p, s)
        break
    }
  }

  readout(): FabReadout[] {
    const s = this.t / 1000
    switch (this.mode) {
      case 'furnace': {
        const nm = dealGrove(this.growthHours(s))
        return [
          { id: 'temperature', value: '1000 °C' },
          { id: 'oxidant', value: 'H₂O' },
          { id: 'oxide', value: `${nm.toFixed(1)} nm` },
        ]
      }
      case 'deposit': {
        const cycles = this.aldCycles(s)
        return [
          { id: 'cycles', value: `${cycles}` },
          { id: 'gpc', value: '0.11 nm' },
          { id: 'film', value: `${(cycles * 0.11).toFixed(2)} nm` },
        ]
      }
      case 'coat':
        return this.coatReadout(s)
      case 'etch': {
        const nm = this.etchDepthNm(s)
        return [
          { id: 'depth', value: `${Math.round(nm)} nm` },
          { id: 'selectivity', value: '20:1' },
          { id: 'gas', value: 'SF₆ / O₂' },
        ]
      }
      case 'implant': {
        const dose = clamp01((s - 0.4) / 3) * 3
        return [
          { id: 'energy', value: '30 keV' },
          { id: 'dose', value: `${dose.toFixed(1)} × 10¹⁵ cm⁻²` },
          { id: 'range', value: '90 nm' },
          { id: 'tilt', value: '7°' },
        ]
      }
      case 'cmp': {
        const removed = clamp01((s - 0.6) / 5.4) * 180
        return [
          { id: 'pressure', value: '4 psi' },
          { id: 'rate', value: '200 nm/min' },
          { id: 'removed', value: `${Math.round(removed)} nm` },
        ]
      }
      case 'measure': {
        const list = stagePhases('measure')
        const at = (i: number, d: number) => list[i]?.at ?? d
        const tCd = at(1, 4.2)
        if (s < tCd) {
          const points = Math.round(clamp01(s / tCd) * 96)
          return [
            { id: 'film', value: '3.10 nm' },
            { id: 'points', value: `${points}` },
            { id: 'precision', value: '±0.02 nm' },
          ]
        }
        if (s < at(2, 7.4)) return [{ id: 'cd', value: '45 nm' }, { id: 'precision', value: '±0.5 nm' }]
        return [{ id: 'film', value: '3.10 nm' }, { id: 'cd', value: '45 nm' }]
      }
    }
  }

  /* ------------------------------------------------------------ stage models */

  private growthHours(s: number): number {
    return span(s, 0.5, 6.5) * 1
  }

  private aldCycles(s: number): number {
    return Math.min(12, Math.floor(Math.max(0, s - 0.6) / 0.95))
  }

  private spinRpm(s: number): number {
    return Math.round(span(s, 1.6, 4.1) * 3000)
  }

  private resistNm(s: number): number {
    const rpm = this.spinRpm(s)
    if (rpm < 60) return 4000
    // Spin coating: h ∝ ω^(-1/2). C chosen so 3000 rpm gives ~850 nm.
    return 46555 / Math.sqrt(rpm)
  }

  /** Thickness against spin speed: the film thins as the square root of the rotation. */
  private spinInset(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const f = this.plotFrame(ctx, p, 124, 44, 158, 128, 'rpm', 'nm')
    const wMin = 500
    const wMax = 4000
    const hAt = (rpm: number) => 46555 / Math.sqrt(rpm)
    const hMax = hAt(wMin)
    const hMin = hAt(wMax)
    ctx.beginPath()
    for (let i = 0; i <= 24; i += 1) {
      const rpm = wMin + (i / 24) * (wMax - wMin)
      const px = f.ax + (i / 24) * f.aw
      const py = f.ay - ((hAt(rpm) - hMin) / (hMax - hMin)) * f.ah
      if (i) ctx.lineTo(px, py)
      else ctx.moveTo(px, py)
    }
    ctx.strokeStyle = p.resistLine
    ctx.lineWidth = 2.4
    ctx.stroke()
    const rpm = Math.max(this.spinRpm(s), wMin)
    const ny = (hAt(rpm) - hMin) / (hMax - hMin)
    this.dot(ctx, f.ax + ((rpm - wMin) / (wMax - wMin)) * f.aw, f.ay - ny * f.ah, 4.5, p.heat, 0.95)
  }

  /**
   * The wafer seen from above while it spins: the resist running outward from the centre and the
   * rotation arrow. A cross-section shows what the spin does to the film but not that the wafer is
   * turning, so this panel carries the turn itself.
   */
  private spinDisc(ctx: CanvasRenderingContext2D, p: Palette, s: number, tSpin: number, tBake: number) {
    const on = Math.min(span(s, tSpin - 0.1, tSpin + 0.4), 1 - span(s, tBake - 0.5, tBake))
    if (on <= 0.02) return

    const x = 604
    const y = 44
    const w = 268
    const h = 150
    ctx.save()
    ctx.globalAlpha = on
    this.rect(ctx, x, y, w, h, p.panel, p.panelLine, 1.4)
    this.text(ctx, 'top view', x + w / 2, y + 15, p.muted, 12)

    const cx = x + w / 2
    const cy = y + h / 2 + 6
    const R = 43
    const turned = this.motion ? (s - tSpin) * 5 : 0

    // The wafer edge.
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, Math.PI * 2)
    ctx.fillStyle = p.si
    ctx.fill()
    ctx.strokeStyle = p.siLine
    ctx.lineWidth = 1.4
    ctx.stroke()

    // The resist, running outward from where the drop landed.
    const rr = Math.max(6, R * clamp01(span(s, tSpin, tSpin + 2.2)))
    ctx.beginPath()
    ctx.arc(cx, cy, rr, 0, Math.PI * 2)
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, rr)
    g.addColorStop(0, p.resist)
    g.addColorStop(1, mix(p.resist, p.resistLine, 0.5))
    ctx.fillStyle = g
    ctx.fill()
    ctx.strokeStyle = p.resistLine
    ctx.lineWidth = 1.2
    ctx.stroke()

    // One spiral rather than radial spokes: spokes look still whatever the angle, a spiral turns.
    if (this.motion) {
      ctx.save()
      ctx.globalAlpha = on * 0.8
      ctx.strokeStyle = mix(p.resist, '#ffffff', 0.55)
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let i = 0; i <= 60; i += 1) {
        const t = i / 60
        const a = turned + t * 10
        const px = cx + Math.cos(a) * rr * t
        const py = cy + Math.sin(a) * rr * t
        if (i) ctx.lineTo(px, py)
        else ctx.moveTo(px, py)
      }
      ctx.stroke()
      ctx.restore()
    }

    // The arrow around the rim, head at the end so the sense of the turn is on the arrow.
    const ar = R + 9
    const a1 = Math.PI * 1.55
    ctx.strokeStyle = p.good
    ctx.lineWidth = 2.4
    ctx.beginPath()
    ctx.arc(cx, cy, ar, -0.5, a1)
    ctx.stroke()
    const tipA = a1 + 0.25
    this.poly(
      ctx,
      [
        [cx + Math.cos(tipA) * ar, cy + Math.sin(tipA) * ar],
        [cx + Math.cos(a1) * (ar - 6), cy + Math.sin(a1) * (ar - 6)],
        [cx + Math.cos(a1) * (ar + 6), cy + Math.sin(a1) * (ar + 6)],
      ],
      p.good,
    )
    ctx.restore()
  }

  /** A lithography phase boundary in seconds, read from the module's own phase script. */
  private coatAt(index: number, fallback: number): number {
    return stagePhases('coat')[index]?.at ?? fallback
  }

  private coatReadout(s: number): FabReadout[] {
    const nm = Math.round(this.resistNm(s))
    if (s < this.coatAt(1, 1.6)) return [{ id: 'spin', value: '0 rpm' }, { id: 'resist', value: `${nm} nm` }]
    if (s < this.coatAt(2, 4.6)) {
      return [{ id: 'spin', value: `${this.spinRpm(s)} rpm` }, { id: 'resist', value: `${nm} nm` }]
    }
    if (s < this.coatAt(3, 6.2)) return [{ id: 'bake', value: '95 °C' }, { id: 'resist', value: `${nm} nm` }]
    if (s < this.coatAt(4, 8.8)) return [{ id: 'wavelength', value: '193 nm' }, { id: 'dose', value: '30 mJ/cm²' }]
    if (s < this.coatAt(5, 10.8)) return [{ id: 'bake', value: '110 °C' }, { id: 'resist', value: `${nm} nm` }]
    return [{ id: 'cd', value: '45 nm' }, { id: 'resist', value: `${nm} nm` }]
  }

  private etchDepthNm(s: number): number {
    return span(s, 1.2, 5.6) * 122
  }

  /* --------------------------------------------------------------- primitives */

  private rect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string | CanvasGradient, stroke?: string, lw = 1.6) {
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fillStyle = fill
    ctx.fill()
    if (stroke) {
      ctx.strokeStyle = stroke
      ctx.lineWidth = lw
      ctx.stroke()
    }
  }

  private poly(ctx: CanvasRenderingContext2D, pts: Array<[number, number]>, fill: string | CanvasGradient, stroke?: string, lw = 1.6) {
    ctx.beginPath()
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
    ctx.closePath()
    ctx.fillStyle = fill
    ctx.fill()
    if (stroke) {
      ctx.strokeStyle = stroke
      ctx.lineWidth = lw
      ctx.stroke()
    }
  }

  private line(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, colour: string, w = 1.4, dash?: number[]) {
    ctx.save()
    if (dash) ctx.setLineDash(dash)
    ctx.strokeStyle = colour
    ctx.lineWidth = w
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.restore()
  }

  private text(
    ctx: CanvasRenderingContext2D,
    value: string,
    x: number,
    y: number,
    colour: string,
    size = 15,
    align: CanvasTextAlign = 'center',
    baseline: CanvasTextBaseline = 'middle',
    weight = 600,
  ) {
    ctx.fillStyle = colour
    ctx.font = `${weight} ${size}px ${FONT}`
    ctx.textAlign = align
    ctx.textBaseline = baseline
    ctx.fillText(value, x, y)
  }

  /** A downward arrow from y1 to y2 at x, head at the far end. */
  private arrowDown(ctx: CanvasRenderingContext2D, x: number, y1: number, y2: number, colour: string, w = 2.2) {
    const head = 7
    const dir = Math.sign(y2 - y1) || 1
    ctx.strokeStyle = colour
    ctx.fillStyle = colour
    ctx.lineWidth = w
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(x, y1)
    ctx.lineTo(x, y2 - dir * head)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x - head, y2 - dir * head * 1.8)
    ctx.lineTo(x, y2)
    ctx.lineTo(x + head, y2 - dir * head * 1.8)
    ctx.closePath()
    ctx.fill()
  }

  /** A dashed leader, the annotation grammar the site's drawings share. */
  private lead(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, colour: string) {
    this.line(ctx, x1, y1, x2, y2, colour, 1.2, [4, 3])
  }

  /** A vertical dimension line with ticks and its value. */
  private dimV(ctx: CanvasRenderingContext2D, x: number, yTop: number, yBot: number, value: string, colour: string) {
    this.line(ctx, x, yTop, x, yBot, colour, 1.3)
    this.line(ctx, x - 5, yTop, x + 5, yTop, colour, 1.3)
    this.line(ctx, x - 5, yBot, x + 5, yBot, colour, 1.3)
    this.text(ctx, value, x + 10, (yTop + yBot) / 2, colour, 14, 'left')
  }

  /** A translucent band, for the furnace glow and the anneal. */
  private glowBand(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, p: Palette, alpha = 1) {
    const g = ctx.createLinearGradient(0, y, 0, y + h)
    g.addColorStop(0, 'rgba(0,0,0,0)')
    g.addColorStop(0.5, p.glow)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.fillStyle = g
    ctx.fillRect(x, y, w, h)
    ctx.restore()
  }

  /** A water molecule: the oxidant of wet oxidation. */
  private water(ctx: CanvasRenderingContext2D, x: number, y: number, alpha: number, p: Palette) {
    if (alpha <= 0.02) return
    ctx.save()
    ctx.globalAlpha = alpha
    this.line(ctx, x, y, x - 7, y - 8, p.beam, 2)
    this.line(ctx, x, y, x + 7, y - 8, p.beam, 2)
    for (const hx of [x - 7, x + 7]) {
      ctx.beginPath()
      ctx.arc(hx, y - 8, 3.4, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      ctx.lineWidth = 1.2
      ctx.strokeStyle = p.faint
      ctx.stroke()
    }
    ctx.beginPath()
    ctx.arc(x, y, 5.2, 0, Math.PI * 2)
    ctx.fillStyle = '#fed7d7'
    ctx.fill()
    ctx.lineWidth = 1.4
    ctx.strokeStyle = p.alert
    ctx.stroke()
    ctx.restore()
  }

  private dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, colour: string, alpha: number) {
    if (alpha <= 0.02) return
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = colour
    ctx.fill()
    ctx.restore()
  }

  /** The opaque silicon block from `top` down to the base of the view. */
  private silicon(ctx: CanvasRenderingContext2D, p: Palette, top: number) {
    this.rect(ctx, X0, top, VW, BASE - top, p.si, p.siLine)
  }

  private scaleBar(ctx: CanvasRenderingContext2D, p: Palette, px: number, label: string) {
    const y = BASE + 26
    const x = X1 - px
    this.line(ctx, x, y, x + px, y, p.muted, 1.6)
    this.line(ctx, x, y - 5, x, y + 5, p.muted, 1.6)
    this.line(ctx, x + px, y - 5, x + px, y + 5, p.muted, 1.6)
    this.text(ctx, label, x + px / 2, y + 17, p.muted, 14)
  }

  private caption(ctx: CanvasRenderingContext2D, p: Palette, value: string) {
    this.text(ctx, value, X0, BASE + 26, p.muted, 15, 'left')
  }

  /** A dollop of resist: a rounded slab that reads as a bead of liquid and flattens into the film. */
  private puddle(ctx: CanvasRenderingContext2D, cx: number, baseY: number, r: number, h: number, fill: string, line: string) {
    const rad = Math.min(r, h) * 0.3
    const x = cx - r
    const y = baseY - h
    ctx.beginPath()
    ctx.moveTo(x + rad, y)
    ctx.lineTo(x + 2 * r - rad, y)
    ctx.quadraticCurveTo(x + 2 * r, y, x + 2 * r, y + rad)
    ctx.lineTo(x + 2 * r, baseY)
    ctx.lineTo(x, baseY)
    ctx.lineTo(x, y + rad)
    ctx.quadraticCurveTo(x, y, x + rad, y)
    ctx.closePath()
    ctx.fillStyle = fill
    ctx.fill()
    ctx.strokeStyle = line
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.beginPath()
    ctx.ellipse(cx - r * 0.42, y + h * 0.34, r * 0.22, h * 0.16, -0.35, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.fill()
  }

  /** An ellipse, for droplets, beads and pendant drops. */
  private blob(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number, fill: string, line?: string) {
    ctx.beginPath()
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
    ctx.fillStyle = fill
    ctx.fill()
    if (line) {
      ctx.strokeStyle = line
      ctx.lineWidth = 1.4
      ctx.stroke()
    }
  }

  /** A trapezoid of light, used for the exposure cones. */
  private cone(ctx: CanvasRenderingContext2D, cx: number, yTop: number, wTop: number, yBot: number, wBot: number, colour: string, alpha: number) {
    ctx.save()
    ctx.globalAlpha = alpha
    this.poly(
      ctx,
      [
        [cx - wBot, yBot],
        [cx + wBot, yBot],
        [cx + wTop, yTop],
        [cx - wTop, yTop],
      ],
      colour,
    )
    ctx.restore()
  }

  /** The frame of a small inset plot; returns the rectangle its axes occupy. */
  private plotFrame(
    ctx: CanvasRenderingContext2D,
    p: Palette,
    x: number,
    y: number,
    w: number,
    h: number,
    xLabel: string,
    yLabel: string,
  ) {
    this.rect(ctx, x, y, w, h, p.panel, p.panelLine, 1.4)
    const ax = x + 40
    const ay = y + h - 26
    const aw = w - 58
    const ah = h - 52
    this.line(ctx, ax, y + 20, ax, ay, p.faint, 1.2)
    this.line(ctx, ax, ay, ax + aw, ay, p.faint, 1.2)
    this.text(ctx, yLabel, ax + 4, y + 18, p.muted, 12, 'left', 'bottom')
    this.text(ctx, xLabel, ax + aw, ay + 14, p.muted, 12, 'right', 'top')
    return { ax, ay, aw, ah }
  }

  /* ------------------------------------------------------------------ 1. oxidise */

  private drawFurnace(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const nm = dealGrove(this.growthHours(s))
    const h = nm * 0.1
    const siTop = SUF + h * CONSUMED

    // The hot zone behind the wafer.
    this.glowBand(ctx, X0 - 40, 120, VW + 80, 320, p, 0.9 + 0.1 * Math.sin(s * 3))

    this.silicon(ctx, p, siTop)
    if (h > 0.6) this.rect(ctx, X0, siTop - h, VW, h, p.oxide, p.oxideLine)

    // Steam arriving and reacting at the surface.
    if (this.motion) {
      const stream = 8
      for (let i = 0; i < stream; i += 1) {
        const phase = (((s * 0.35 + i / stream) % 1) + 1) % 1
        const x = X0 + 50 + ((i * 121) % 400) + Math.sin((s + i) * 1.4) * 7
        const y = 122 + phase * (siTop - 142)
        const alpha = phase < 0.9 ? 1 : (1 - phase) / 0.1
        this.water(ctx, x, y, alpha, p)
      }
    }

    // The datum: the surface the wafer had before the furnace.
    this.line(ctx, X0 - 28, SUF, X1 + 28, SUF, p.faint, 1.2, [5, 4])
    this.text(ctx, 'original surface', X0 - 34, SUF, p.muted, 14, 'right')

    this.text(ctx, 'Si', X0 + 26, BASE - 24, p.muted, 16, 'left')
    if (h > 18) this.text(ctx, 'SiO₂', X1 - 26, siTop - h / 2, p.muted, 16, 'right')
    this.text(ctx, 'H₂O', X0 - 34, 132, p.muted, 16, 'right')
    this.arrowDown(ctx, X0 - 18, 142, 180, p.beam, 2)

    this.dimV(ctx, X1 + 12, siTop - h, siTop, `${nm.toFixed(0)} nm`, p.muted)
    this.growthInset(ctx, p, s)
    this.scaleBar(ctx, p, 40, '400 nm')
  }

  /** Thickness against time, with the knee where diffusion takes over from the surface reaction. */
  private growthInset(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const f = this.plotFrame(ctx, p, 604, 44, 268, 150, 'time', 'thickness')
    const xmax = dealGrove(1)

    ctx.beginPath()
    for (let i = 0; i <= 48; i += 1) {
      const nx = i / 48
      const px = f.ax + nx * f.aw
      const py = f.ay - (dealGrove(nx) / xmax) * f.ah
      if (i) ctx.lineTo(px, py)
      else ctx.moveTo(px, py)
    }
    ctx.strokeStyle = p.oxide
    ctx.lineWidth = 2.4
    ctx.stroke()

    // The same furnace on dry oxygen: a tenth of the thickness in the same hour. That gap is why the
    // thick oxides are grown wet and only the gate oxide is grown dry.
    ctx.save()
    ctx.beginPath()
    for (let i = 0; i <= 48; i += 1) {
      const nx = i / 48
      const px = f.ax + nx * f.aw
      const py = f.ay - (dealGrove(nx, DG.dry) / xmax) * f.ah
      if (i) ctx.lineTo(px, py)
      else ctx.moveTo(px, py)
    }
    ctx.strokeStyle = p.faint
    ctx.lineWidth = 1.6
    ctx.setLineDash([4, 3])
    ctx.stroke()
    ctx.restore()
    this.text(ctx, 'dry O₂', f.ax + f.aw - 6, f.ay - 8, p.faint, 11, 'right', 'bottom')

    // The knee: where the oxide reaches A, the reaction stops being what limits the growth.
    const knee = (2 * DG.wet.A * DG.wet.A) / DG.wet.B
    const kneeY = f.ay - ((DG.wet.A * 1000) / xmax) * f.ah
    this.line(ctx, f.ax + knee * f.aw, f.ay, f.ax + knee * f.aw, kneeY, p.faint, 1.1, [4, 3])
    this.text(ctx, 'A', f.ax + knee * f.aw + 4, kneeY - 8, p.muted, 12, 'left')

    // Where the process is now.
    const t = this.growthHours(s)
    this.dot(ctx, f.ax + t * f.aw, f.ay - (dealGrove(t) / xmax) * f.ah, 4.5, p.heat, 0.95)
  }

  /* ---------------------------------------------------------------- 2. deposit */

  private drawDeposit(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const cycles = this.aldCycles(s)
    const f = cycles // one scene px per cycle, which is what the readout's 0.11 nm per cycle buys
    const { a, b, depth } = TRENCH
    const floor = SUF + depth

    const surface: Array<[number, number]> = [
      [X0, SUF],
      [a, SUF],
      [a, floor],
      [b, floor],
      [b, SUF],
      [X1, SUF],
    ]
    const below: Array<[number, number]> = [...surface, [X1, BASE], [X0, BASE]]

    // The four half-steps of the cycle: pulse A, purge, pulse B, purge. Each pulse stops on its own
    // when the surface runs out of sites, which is the whole of why ALD is called self-limiting.
    const at = (s - 0.6) / 0.95
    const half = at < 0 ? -1 : ((Math.floor(at * 4) % 4) + 4) % 4
    const pulseA = half === 0
    const pulseB = half === 2

    // The showerhead above the wafer, its nozzles brightening while a precursor is flowing.
    this.rect(ctx, 236, 74, 364, 20, p.mask, p.panelLine)
    for (let x = 262; x <= 580; x += 42) {
      this.dot(ctx, x, 100, 3.2, p.filmLine, pulseA ? 1 : pulseB ? 0.55 : 0.25)
    }

    // The precursor of the moment: A in blue, B in orange, nothing at all during the purges.
    if (this.motion) {
      const drops = 18
      for (let i = 0; i < drops; i += 1) {
        const phase = (((s * 0.95 + i / drops) % 1) + 1) % 1
        const px = 250 + ((i * 89) % 330)
        const target = px > a && px < b ? floor : SUF
        const y = 106 + phase * (target - 118)
        const alpha = 0.9 * (1 - Math.max(0, (phase - 0.9) / 0.1))
        if (pulseA) this.dot(ctx, px, y, 2.8, p.filmLine, alpha)
        else if (pulseB) this.dot(ctx, px, y, 3.4, p.ion, alpha)
      }
    }
    this.text(
      ctx,
      half < 0 ? '' : pulseA ? 'precursor A' : pulseB ? 'precursor B' : 'purge',
      X0 + 18,
      96,
      p.muted,
      13,
      'left',
    )

    // The substrate, then the ALD film as a true conformal coat: the surface polyline stroked at
    // width 2f, clipped to the vacuum, so the half that would fall inside the silicon is thrown
    // away and wall, floor and top all come out the same thickness.
    this.poly(ctx, below, p.si, p.siLine)

    if (f > 0.4) {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(X0, 0)
      ctx.lineTo(X1, 0)
      ctx.lineTo(X1, SUF)
      ctx.lineTo(b, SUF)
      ctx.lineTo(b, floor)
      ctx.lineTo(a, floor)
      ctx.lineTo(a, SUF)
      ctx.lineTo(X0, SUF)
      ctx.closePath()
      ctx.clip()
      ctx.lineJoin = 'round'
      ctx.beginPath()
      surface.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
      ctx.strokeStyle = p.filmLine
      ctx.lineWidth = f * 2 + 1.4
      ctx.stroke()
      ctx.strokeStyle = p.film
      ctx.lineWidth = f * 2
      ctx.stroke()
      ctx.restore()

      this.text(ctx, 'barrier', X1 - 8, SUF - f - 20, p.muted, 15, 'right')
      this.lead(ctx, X1 - 96, SUF - f - 12, X1 - 132, SUF - f / 2, p.faint)
    }

    this.text(ctx, 'Si', a - 34, BASE - 24, p.muted, 16, 'right')

    // The trench is not made here: an earlier lap opened it. Saying so is what keeps the module from
    // looking like the wafer arrived with a hole in it.
    this.text(ctx, 'trench from an earlier lap', 256, 210, p.muted, 12, 'right')
    this.lead(ctx, 262, 216, a + 4, SUF + 18, p.faint)

    this.depositInset(ctx, p, cycles)
    this.dimV(ctx, b + 26, floor - f, floor, `${(cycles * 0.11).toFixed(2)} nm`, p.muted)
    this.scaleBar(ctx, p, 36, '4 nm')
    this.caption(ctx, p, `ALD · cycle ${cycles}`)
  }

  /** Thickness against cycles: a straight line, which is the whole promise of ALD. */
  private depositInset(ctx: CanvasRenderingContext2D, p: Palette, cycles: number) {
    const f = this.plotFrame(ctx, p, 604, 44, 268, 150, 'cycles', 'thickness')
    const maxCycles = 12
    const maxNm = maxCycles * 0.11
    ctx.beginPath()
    for (let i = 0; i <= 24; i += 1) {
      const n = (i / 24) * maxCycles
      const px = f.ax + (n / maxCycles) * f.aw
      const py = f.ay - ((n * 0.11) / maxNm) * f.ah
      if (i) ctx.lineTo(px, py)
      else ctx.moveTo(px, py)
    }
    ctx.strokeStyle = p.film
    ctx.lineWidth = 2.4
    ctx.stroke()
    this.dot(ctx, f.ax + (cycles / maxCycles) * f.aw, f.ay - ((cycles * 0.11) / maxNm) * f.ah, 4.5, p.heat, 0.95)
  }

  /* ------------------------------------------------------------ 3. lithography */

  private drawCoat(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const tSpin = this.coatAt(1, 1.6)
    const tBake = this.coatAt(2, 4.6)
    const tExpose = this.coatAt(3, 6.2)
    const tPeb = this.coatAt(4, 8.8)
    const tDevelop = this.coatAt(5, 10.8)

    const stackTop = SUF - 22 // oxide (14) + deposited film (8) already on the wafer
    const nm = this.resistNm(s)
    const shrink = s > tBake ? lerp(1, 0.88, span(s, tBake, tBake + 1.4)) : 1
    const rPx = clamp(nm * 0.03 * shrink, 8, 62)

    // The stack the resist sits on.
    this.silicon(ctx, p, SUF)
    this.rect(ctx, X0, SUF - 14, VW, 14, p.oxide, p.oxideLine)
    this.rect(ctx, X0, stackTop, VW, 8, p.film, p.filmLine)

    if (s < tSpin) {
      this.coatDispense(ctx, p, s, stackTop, rPx)
    } else {
      this.coatFilm(ctx, p, s, stackTop, rPx, tSpin)
      if (s < tBake) this.coatSpin(ctx, p, s, stackTop, rPx)
      else if (s < tExpose) this.coatBake(ctx, p, s, stackTop, rPx, tBake, tExpose)
      else if (s < tPeb) this.coatExpose(ctx, p, s, stackTop, rPx, tExpose, tPeb)
      else if (s < tDevelop) this.coatPeb(ctx, p, s, stackTop, rPx, tPeb, tDevelop)
      else this.coatDevelop(ctx, p, s, stackTop, rPx, tDevelop)
      this.text(ctx, 'photoresist', X0 + 4, stackTop - rPx - 12, p.muted, 14, 'left')
    }

    // The latent image arrives in two steps, which is what a chemically amplified resist does: the
    // photons only create the acid, and the post-exposure bake is what turns it into a real change.
    const latent = 0.3 * span(s, tExpose + 1.0, tExpose + 1.8)
    const baked = 0.7 * span(s, tPeb + 0.2, tPeb + 1.4)
    const expo = Math.min(1, latent + baked)
    if (expo > 0.02) {
      for (const w of WIN) {
        ctx.save()
        ctx.globalAlpha = expo
        this.rect(ctx, w.a, stackTop - rPx, w.b - w.a, rPx, p.exposed, p.resistLine, 1)
        ctx.restore()
      }
    }

    // Development dissolves the exposed resist from the top down. Clearing the band is what makes a
    // real opening: it takes the resist away and leaves vacuum over the film, so the mask the next
    // module etches through is the complement of the windows.
    if (s >= tDevelop) {
      const gone = span(s, tDevelop, tDevelop + 1.1)
      for (const w of WIN) ctx.clearRect(w.a, stackTop - rPx, w.b - w.a, rPx * gone)
    }

    this.text(ctx, 'Si', X0 + 26, BASE - 24, p.muted, 16, 'left')
    this.spinInset(ctx, p, s)
    this.spinDisc(ctx, p, s, tSpin, tBake)
    this.scaleBar(ctx, p, 60, '2 µm')
  }

  /** The resist as a wet film, spreading to the whole wafer and carrying a sheen and a front bead. */
  private coatFilm(ctx: CanvasRenderingContext2D, p: Palette, s: number, stackTop: number, rPx: number, tSpin: number) {
    const spread = span(s, tSpin, tSpin + 2.6)
    const w = lerp(120, VW, spread)
    const x = 450 - w / 2
    const g = ctx.createLinearGradient(0, stackTop - rPx, 0, stackTop)
    g.addColorStop(0, p.resist)
    g.addColorStop(1, mix(p.resist, p.resistLine, 0.45))
    this.rect(ctx, x, stackTop - rPx, w, rPx, g, p.resistLine)
    this.line(ctx, x + 10, stackTop - rPx + 3, x + w - 10, stackTop - rPx + 3, mix(p.resist, '#ffffff', 0.55), 1.4)
    if (spread < 1) {
      this.blob(ctx, x, stackTop - rPx * 0.45, 7, rPx * 0.55, p.resist, p.resistLine)
      this.blob(ctx, x + w, stackTop - rPx * 0.45, 7, rPx * 0.55, p.resist, p.resistLine)
    }
  }

  /** Dispense: the head, a pendant drop that swells, falls, and spreads into a puddle. */
  private coatDispense(ctx: CanvasRenderingContext2D, p: Palette, s: number, stackTop: number, rPx: number) {
    const cx = 450
    const tipY = 90

    this.text(ctx, 'photoresist', cx, 18, p.muted, 14)
    this.rect(ctx, cx - 30, 30, 60, 34, p.mask, p.panelLine)
    this.poly(
      ctx,
      [
        [cx - 13, 64],
        [cx + 13, 64],
        [cx + 5, tipY],
        [cx - 5, tipY],
      ],
      p.mask,
      p.panelLine,
    )
    this.line(ctx, cx - 22, 36, cx - 22, 60, mix(p.mask, '#ffffff', 0.3), 2)

    const thread = span(s, 0.1, 0.7)
    const swell = span(s, 0.3, 0.72)
    const fall = span(s, 0.74, 1.0)
    const radius = lerp(3, 11, swell)

    if (thread > 0 && fall < 0.02) this.line(ctx, cx, tipY, cx, tipY + thread * 24, p.resistLine, Math.max(2, radius * 0.7))
    if (fall < 1) {
      const dropY = lerp(tipY + 26 + radius, stackTop - radius * 0.4, fall)
      this.blob(ctx, cx, dropY, radius * 0.85, radius * 1.15, p.resist, p.resistLine)
    }

    // The puddle grows into exactly the slab the spin will start from, so nothing jumps at the seam.
    const settle = span(s, 0.96, 1.6)
    if (settle > 0) {
      const pr = lerp(14, 60, settle)
      this.puddle(ctx, cx, stackTop, pr, lerp(12, rPx, settle), p.resist, p.resistLine)
      const ripple = span(s, 0.96, 1.25)
      if (ripple < 1 && this.motion) {
        ctx.save()
        ctx.globalAlpha = (1 - ripple) * 0.5
        ctx.strokeStyle = p.resistLine
        ctx.lineWidth = 1.4
        ctx.beginPath()
        ctx.ellipse(cx, stackTop, pr * (1 + ripple * 0.5), pr * 0.16 * (1 + ripple * 0.5), 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }
    }
  }

  /** The spin: material flung outward along the film, and the excess thrown off the rim. */
  private coatSpin(ctx: CanvasRenderingContext2D, p: Palette, s: number, stackTop: number, rPx: number) {
    this.text(ctx, `${this.spinRpm(s)} rpm`, 450, stackTop - rPx - 26, p.good, 15)
    if (!this.motion) return

    const surface = stackTop - rPx * 0.45
    for (let i = 0; i < 12; i += 1) {
      const phase = (i / 12 + s * 0.55) % 1
      const dir = i % 2 ? 1 : -1
      const x = 450 + dir * (24 + phase * 320)
      if (x < X0 + 8 || x > X1 - 8) continue
      ctx.save()
      ctx.globalAlpha = (1 - phase) * 0.5
      this.line(ctx, x, surface, x + dir * 20, surface, p.resistLine, 1.8)
      ctx.restore()
    }

    for (let i = 0; i < 6; i += 1) {
      const phase = (i / 6 + s * 0.8) % 1
      const dir = i % 2 ? 1 : -1
      const x = dir > 0 ? X1 + 6 + phase * 30 : X0 - 6 - phase * 30
      this.dot(ctx, x, stackTop - 8 + phase * 36, 2.4, p.resistLine, (1 - phase) * 0.85)
    }
  }

  /** Soft bake: a hotplate under the wafer, heat climbing through it, and the solvent leaving. */
  private coatBake(ctx: CanvasRenderingContext2D, p: Palette, s: number, stackTop: number, rPx: number, tBake: number, tExpose: number) {
    const on = Math.min(span(s, tBake, tBake + 0.4), 1 - span(s, tExpose - 0.5, tExpose))
    if (on <= 0.01) return
    this.hotplate(ctx, p, s, on, stackTop, rPx, '95 °C')

    if (this.motion) {
      for (let i = 0; i < 9; i += 1) {
        const phase = (i / 9 + s * 0.55) % 1
        const vx = X0 + 96 + i * 60 + Math.sin((s + i) * 1.7) * 8
        this.dot(ctx, vx, stackTop - rPx - 8 - phase * 82, 1.8 + phase * 2.4, p.muted, (1 - phase) * 0.45 * on)
      }
    }
  }

  /** The hotplate under the wafer, with heat climbing through it. Both bakes sit on it. */
  private hotplate(ctx: CanvasRenderingContext2D, p: Palette, s: number, on: number, stackTop: number, rPx: number, label: string) {
    const hpY = BASE - 2
    const g = ctx.createLinearGradient(0, hpY - 12, 0, hpY + 14)
    g.addColorStop(0, 'rgba(0,0,0,0)')
    g.addColorStop(0.5, p.heat)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.save()
    ctx.globalAlpha = 0.6 * on
    ctx.fillStyle = g
    ctx.fillRect(X0 - 40, hpY - 12, VW + 80, 26)
    ctx.restore()

    ctx.save()
    ctx.globalAlpha = 0.4 * on
    ctx.strokeStyle = p.heat
    ctx.lineWidth = 1.6
    for (let i = 0; i < 5; i += 1) {
      const hx = X0 + 74 + i * 144
      ctx.beginPath()
      for (let y = BASE; y > stackTop - 34; y -= 6) {
        const x = hx + Math.sin(y * 0.07 + s * 7 + i * 1.3) * 6
        if (y === BASE) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
    ctx.restore()

    ctx.save()
    ctx.globalAlpha = 0.13 * on * (0.75 + 0.25 * Math.sin(s * 5))
    ctx.fillStyle = p.heat
    ctx.fillRect(X0, stackTop - rPx, VW, BASE - (stackTop - rPx))
    ctx.restore()

    this.text(ctx, label, 450, BASE + 26, p.heat, 15)
  }

  /** Exposure: a chrome-on-quartz mask coming down, and the cones of light it lets through. */
  private coatExpose(ctx: CanvasRenderingContext2D, p: Palette, s: number, stackTop: number, rPx: number, tExpose: number, tPeb: number) {
    const park = stackTop - rPx - MASK_GAP
    const maskY = lerp(54, park, span(s, tExpose, tExpose + 1.0))
    const maskH = 14
    const lit = span(s, tExpose + 1.0, tExpose + 1.4) * (1 - span(s, tPeb - 0.5, tPeb))
    const shimmer = 0.86 + 0.14 * Math.sin(s * 22)

    // The lamp, and the wash of light it throws down on the mask.
    this.rect(ctx, 330, 16, 240, 12, p.mask, p.panelLine)
    if (lit > 0.01) {
      this.line(ctx, 332, 28, 568, 28, p.metal, 2.5)
      const g = ctx.createLinearGradient(0, 16, 0, maskY)
      g.addColorStop(0, `rgba(128, 90, 213, ${0.24 * lit})`)
      g.addColorStop(1, 'rgba(128, 90, 213, 0)')
      ctx.fillStyle = g
      ctx.fillRect(288, 16, 324, maskY - 16)
      this.text(ctx, '193 nm', 322, 22, p.metal, 13, 'right')
    }

    this.coatMask(ctx, p, maskY, maskH, 1)
    this.text(ctx, 'mask', 288, maskY - 10, p.muted, 14, 'left')

    // One cone of light per opening, with a glow, a core and photons falling through it.
    if (lit <= 0.01) return
    const yTop = maskY + maskH
    const yBot = stackTop - rPx
    for (const w of WIN) {
      const cxm = (w.a + w.b) / 2
      const half = (w.b - w.a) / 2
      this.cone(ctx, cxm, yTop, half + 5, yBot, half + 9, p.metal, 0.16 * lit * shimmer)
      this.cone(ctx, cxm, yTop, half, yBot, half + 4, p.metal, 0.5 * lit * shimmer)
    }
    if (this.motion) {
      for (let i = 0; i < 12; i += 1) {
        const phase = (i / 12 + s * 1.6) % 1
        const w = WIN[i % WIN.length]
        const x = (w.a + w.b) / 2 + Math.sin(i * 3.1) * 7
        this.dot(ctx, x, yTop + phase * (yBot - yTop), 1.8, p.metal, lit * (1 - phase * 0.5))
      }
    }
  }

  /** Post-exposure bake: the wafer leaves the scanner, and the acid the light made does its work. */
  private coatPeb(ctx: CanvasRenderingContext2D, p: Palette, s: number, stackTop: number, rPx: number, tPeb: number, tDevelop: number) {
    const lift = span(s, tPeb, tPeb + 0.9)
    if (lift < 1) this.coatMask(ctx, p, lerp(stackTop - rPx - MASK_GAP, 18, lift), 14, 1 - lift)

    const on = Math.min(span(s, tPeb, tPeb + 0.4), 1 - span(s, tDevelop - 0.4, tDevelop))
    if (on <= 0.01) return
    this.hotplate(ctx, p, s, on, stackTop, rPx, '110 °C')
  }

  /** The chrome-on-quartz mask: an opaque bar everywhere except the openings. */
  private coatMask(ctx: CanvasRenderingContext2D, p: Palette, maskY: number, maskH: number, alpha: number) {
    if (alpha <= 0.02) return
    ctx.save()
    ctx.globalAlpha = alpha
    this.rect(ctx, 288, maskY, 324, maskH, p.quartz, p.panelLine)
    let cursor = 288
    for (const w of WIN) {
      this.rect(ctx, cursor, maskY, w.a - cursor, maskH, p.mask)
      cursor = w.b
    }
    this.rect(ctx, cursor, maskY, 612 - cursor, maskH, p.mask)
    ctx.restore()
  }

  /** Develop: developer floods the surface and the exposed resist goes with it. */
  private coatDevelop(ctx: CanvasRenderingContext2D, p: Palette, s: number, stackTop: number, rPx: number, tDevelop: number) {
    if (this.motion) {
      for (let i = 0; i < 12; i += 1) {
        const phase = (i / 12 + s * 0.85) % 1
        const x = X0 + 44 + ((i * 97) % (VW - 88))
        this.dot(ctx, x, 74 + phase * (stackTop - rPx - 96), 2.4, p.good, (1 - phase * 0.7) * 0.8)
      }
    }

    // A film of developer standing on the resist while it works.
    ctx.save()
    ctx.globalAlpha = 0.28 * (1 - span(s, tDevelop + 1.4, tDevelop + 2.6))
    ctx.fillStyle = p.good
    ctx.fillRect(X0, stackTop - rPx - 3, VW, 3)
    ctx.restore()
  }

  /* ------------------------------------------------------------------ 4. etch */

  private drawEtch(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const depthNm = this.etchDepthNm(s)
    const depth = depthNm * 0.9
    const oxideT = 14
    const filmT = 8
    const maskH = 26
    // The mask sits on the film lithography left, not on bare silicon.
    const filmTop = SUF - oxideT - filmT
    const maskTop = filmTop - maskH
    const trenchBottom = SUF + depth
    const on = span(s, 0.2, 1.0)

    // The stack the lithography module handed over, cut only where the mask opened.
    this.silicon(ctx, p, SUF)
    this.rect(ctx, X0, SUF - oxideT, VW, oxideT, p.oxide, p.oxideLine)
    this.rect(ctx, X0, filmTop, VW, filmT, p.film, p.filmLine)

    if (depth > 1) {
      for (const w of WIN) {
        const cxm = (w.a + w.b) / 2
        ctx.clearRect(w.a, filmTop, w.b - w.a, trenchBottom - filmTop)
        const shade = ctx.createLinearGradient(0, filmTop, 0, trenchBottom)
        shade.addColorStop(0, 'rgba(0, 0, 0, 0.03)')
        shade.addColorStop(1, 'rgba(0, 0, 0, 0.24)')
        ctx.fillStyle = shade
        ctx.fillRect(w.a, filmTop, w.b - w.a, trenchBottom - filmTop)
        this.line(ctx, w.a, filmTop, w.a, trenchBottom, p.siLine, 1.6)
        this.line(ctx, w.b, filmTop, w.b, trenchBottom, p.siLine, 1.6)
        this.line(ctx, w.a, trenchBottom, w.b, trenchBottom, p.siLine, 1.6)

        // The by-products of the etch are pumped away, so they leave the trench.
        if (this.motion && depth > 14) {
          for (let k = 0; k < 3; k += 1) {
            const t = (((s * 0.7 + k / 3) % 1) + 1) % 1
            this.dot(ctx, cxm + Math.sin(k * 2.1 + s) * 9, trenchBottom - t * (depth + 46), 2, p.good, (1 - t) * 0.5)
          }
        }

        // Where the ions strike the floor.
        if (this.motion && depth > 14) {
          const flash = (((s * 1.4) % 1) + 1) % 1
          ctx.save()
          ctx.globalAlpha = (1 - flash) * 0.6 * on
          ctx.strokeStyle = p.filmLine
          ctx.lineWidth = 1.4
          ctx.beginPath()
          ctx.ellipse(cxm, trenchBottom, 6 + flash * 16, 2 + flash * 5, 0, 0, Math.PI * 2)
          ctx.stroke()
          ctx.restore()
        }
      }
    }

    // The plasma: a dim body with a bright sheath right above the wafer. The sheath is where the
    // ions are accelerated, and it is why they arrive perpendicular to the surface.
    const breath = 0.84 + 0.16 * Math.sin(s * 3.2)
    const body = ctx.createLinearGradient(0, 44, 0, maskTop)
    body.addColorStop(0, 'rgba(79, 209, 197, 0.04)')
    body.addColorStop(0.7, 'rgba(79, 209, 197, 0.13)')
    body.addColorStop(1, 'rgba(79, 209, 197, 0.32)')
    ctx.save()
    ctx.globalAlpha = on * breath
    ctx.fillStyle = body
    ctx.fillRect(X0 - 40, 44, VW + 80, maskTop - 44)
    const sheath = ctx.createLinearGradient(0, maskTop - 38, 0, maskTop)
    sheath.addColorStop(0, 'rgba(79, 209, 197, 0)')
    sheath.addColorStop(1, 'rgba(196, 255, 247, 0.48)')
    ctx.fillStyle = sheath
    ctx.fillRect(X0 - 40, maskTop - 38, VW + 80, 38)
    ctx.restore()

    // Ion trajectories: dead vertical, the dots crowding as the field accelerates them.
    if (this.motion && on > 0.05) {
      const cols = 15
      for (let i = 0; i < cols; i += 1) {
        const x = X0 + 18 + (i / (cols - 1)) * (VW - 36)
        const inWindow = WIN.some((w) => x > w.a && x < w.b)
        const endY = inWindow ? trenchBottom : maskTop + 4
        ctx.save()
        ctx.globalAlpha = 0.15 * on
        this.line(ctx, x, 58, x, endY, p.filmLine, 1)
        ctx.restore()
        for (let k = 0; k < 3; k += 1) {
          const t = (((s * 0.5 + i * 0.31 + k / 3) % 1) + 1) % 1
          this.dot(ctx, x, 58 + Math.pow(t, 1.7) * (endY - 58), 2.3, p.filmLine, on * (0.3 + 0.7 * t))
        }
      }
    }

    // The resist mask, worn down by the ions that miss it: at 20:1 selectivity it loses a twentieth
    // of the depth the silicon does. The line it started at stays dashed, so the loss is visible.
    const worn = Math.min(5, depth / 20)
    const mTop = maskTop + worn
    if (worn > 0.4) this.line(ctx, X0, maskTop, X1, maskTop, p.resistLine, 1, [4, 3])
    let cursor = X0
    for (const w of WIN) {
      this.rect(ctx, cursor, mTop, w.a - cursor, maskH - worn, p.resist, p.resistLine)
      cursor = w.b
    }
    this.rect(ctx, cursor, mTop, X1 - cursor, maskH - worn, p.resist, p.resistLine)

    this.text(ctx, 'photoresist', X0 - 6, mTop + (maskH - worn) / 2, p.muted, 14, 'right')
    this.text(ctx, 'Si', X0 + 26, BASE - 24, p.muted, 16, 'left')
    this.text(ctx, 'SiO₂', X0 + 22, SUF - oxideT / 2, p.muted, 12, 'left')
    this.etchProfileInset(ctx, p, s)
    if (depth > 20) this.dimV(ctx, X1 + 12, filmTop, trenchBottom, `${Math.round(depthNm)} nm`, p.muted)
    this.scaleBar(ctx, p, 45, '50 nm')
  }

  /** The chapter's comparison: what the same mask opening gives under a wet etch and under RIE. */
  private etchProfileInset(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const x = 604
    const y = 44
    const w = 268
    const h = 150
    this.rect(ctx, x, y, w, h, p.panel, p.panelLine, 1.4)
    this.text(ctx, 'same mask, two chemistries', x + w / 2, y + 16, p.muted, 12)

    const grow = span(s, 0.8, 3.0)
    const draw = (cx: number, wet: boolean, caption: string) => {
      const top = y + 36
      const die = 46
      this.rect(ctx, cx - 52, top, 104, die, p.si, p.siLine, 1.2)
      this.rect(ctx, cx - 28, top - 10, 18, 10, p.metal, p.metalLine, 1)
      this.rect(ctx, cx + 10, top - 10, 18, 10, p.metal, p.metalLine, 1)

      ctx.save()
      ctx.beginPath()
      if (wet) {
        ctx.arc(cx, top, 20 * grow, 0, Math.PI)
      } else {
        ctx.moveTo(cx - 10, top)
        ctx.lineTo(cx - 10, top + 34 * grow)
        ctx.lineTo(cx + 10, top + 34 * grow)
        ctx.lineTo(cx + 10, top)
      }
      ctx.closePath()
      ctx.fillStyle = p.panel
      ctx.fill()
      ctx.strokeStyle = wet ? p.alert : p.filmLine
      ctx.lineWidth = 1.6
      if (wet) ctx.setLineDash([4, 3])
      ctx.stroke()
      ctx.restore()

      // The wet profile reaches sideways, under the mask; the RIE one does not.
      if (wet && grow > 0.4) {
        const rad = 20 * grow
        this.line(ctx, cx - rad, top + 6, cx - 10, top + 6, p.alert, 1.2)
        this.dot(ctx, cx - rad, top + 6, 2, p.alert, 1)
        this.dot(ctx, cx - 10, top + 6, 2, p.alert, 1)
      }
      this.text(ctx, caption, cx, top + die + 16, p.muted, 12)
    }

    draw(x + 72, true, 'wet · undercuts')
    draw(x + 196, false, 'RIE · vertical')
  }

  /* --------------------------------------------------------------- 5. implant */

  private drawImplant(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const win = WIN[1]
    const cxm = (win.a + win.b) / 2
    const oxideT = 14
    const filmT = 8
    // The same stack lithography and etching worked on, with one window open over the junction.
    const filmTop = SUF - oxideT - filmT
    const maskH = 30
    const maskTop = filmTop - maskH

    this.silicon(ctx, p, SUF)
    this.rect(ctx, X0, SUF - oxideT, VW, oxideT, p.oxide, p.oxideLine)
    this.rect(ctx, X0, filmTop, VW, filmT, p.film, p.filmLine)
    this.rect(ctx, X0, maskTop, win.a - X0, maskH, p.resist, p.resistLine)
    this.rect(ctx, win.b, maskTop, X1 - win.b, maskH, p.resist, p.resistLine)

    // The dopants, stopping around a projected range of 90 nm.
    const depthPx = 162
    const bands = 42
    const reached = clamp01((s - 1.2) / 2.4)
    for (let i = 0; i < bands; i += 1) {
      const d = (i + 0.5) / bands
      const gaussian = Math.exp(-(((d - 0.5) / 0.2) ** 2))
      const halfW = 34 + d * 26
      const y = SUF + d * depthPx
      ctx.save()
      ctx.globalAlpha = gaussian * reached * 0.75
      this.rect(ctx, cxm - halfW, y, halfW * 2, depthPx / bands + 1, p.ion)
      ctx.restore()
    }

    // The beam, drawn over the wafer so the ions read as arriving.
    const tilt = (7 * Math.PI) / 180
    const topY = 46
    const bw = 30
    const dx = (filmTop - topY) * Math.tan(tilt)
    const beamOn = 1 - span(s, 5.4, 5.9)
    ctx.save()
    ctx.globalAlpha = 0.42 * beamOn
    ctx.fillStyle = p.beam
    ctx.beginPath()
    ctx.moveTo(cxm - dx - bw, topY)
    ctx.lineTo(cxm - dx + bw, topY)
    ctx.lineTo(cxm + bw, filmTop)
    ctx.lineTo(cxm - bw, filmTop)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    if (this.motion && s < 5.6) {
      for (let i = 0; i < 16; i += 1) {
        const phase = (((s * 1.6 + i / 16) % 1) + 1) % 1
        const y = topY + phase * (filmTop - topY)
        const x = cxm - dx + (y - topY) * Math.tan(tilt) + Math.sin(i * 2.1) * 6
        this.dot(ctx, x, y, 2.6, p.beam, beamOn)
      }
    }

    // Amorphous damage, healed by the anneal.
    const damage = clamp01((s - 1.6) / 2) * (1 - span(s, 5.6, 7.6))
    if (damage > 0.02) {
      ctx.save()
      ctx.globalAlpha = damage * 0.5
      ctx.strokeStyle = p.alert
      ctx.lineWidth = 1
      ctx.setLineDash([3, 3])
      for (let i = 0; i < bands; i += 2) {
        const y = SUF + ((i + 0.5) / bands) * depthPx
        ctx.beginPath()
        ctx.moveTo(cxm - 60, y)
        ctx.lineTo(cxm + 60, y)
        ctx.stroke()
      }
      ctx.restore()
    }

    // The projected range, which is the depth the beam energy buys: 90 nm here.
    const rp = SUF + 0.5 * depthPx
    this.line(ctx, cxm - 66, rp, cxm + 66, rp, p.beam, 1.1, [4, 3])
    this.text(ctx, 'Rp = 90 nm', cxm + 72, rp, p.beam, 13, 'left')

    // The anneal: a warm pulse once the beam is off.
    const anneal = span(s, 5.9, 6.5) * (1 - span(s, 8.4, 9.0))
    if (anneal > 0.02) {
      this.glowBand(ctx, X0 - 40, SUF - 40, VW + 80, 150, p, anneal)
      this.text(ctx, 'anneal · RTP', X1 - 20, SUF - 34, p.heat, 14, 'right')
    }

    this.text(ctx, 'photoresist', X0 + 4, maskTop - 14, p.muted, 14, 'left')
    this.text(ctx, '7°', cxm - dx - bw - 12, (topY + filmTop) / 2, p.beam, 16, 'right')
    this.text(ctx, 'Si', X1 - 26, BASE - 24, p.muted, 16, 'right')

    this.profileInset(ctx, p, s)
    this.scaleBar(ctx, p, 45, '50 nm')
  }

  /** The concentration-versus-depth profile, drawn as a small chart in the top-right corner. */
  private profileInset(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const x = 604
    const y = 44
    const w = 268
    const { ax, ay, aw, ah } = this.plotFrame(ctx, p, x, y, w, 150, 'depth', 'concentration')

    const reached = clamp01((s - 1.2) / 2.4)
    const curve = (d: number, tail: number) => {
      const peak = 0.5
      const gaussian = Math.exp(-(((d - peak) / 0.2) ** 2))
      const t = d > peak ? tail * 0.5 * Math.exp(-(d - peak) / 0.4) : 0
      return gaussian + t
    }

    // The profile the 7° tilt gives (narrow), against the channelling tail it avoids.
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(ax, ay)
    for (let i = 0; i <= 40; i += 1) {
      const d = i / 40
      ctx.lineTo(ax + d * aw, ay - curve(d, 1.1) * ah * 0.8)
    }
    ctx.lineTo(ax + aw, ay)
    ctx.closePath()
    ctx.globalAlpha = 0.26 * reached
    ctx.fillStyle = p.alert
    ctx.fill()
    ctx.restore()
    this.text(ctx, 'no tilt (tail)', x + w - 16, y + 32, p.alert, 12, 'right')

    ctx.save()
    ctx.beginPath()
    for (let i = 0; i <= 40; i += 1) {
      const d = i / 40
      const px = ax + d * aw
      const py = ay - curve(d, 0) * reached * ah * 0.8
      if (i) ctx.lineTo(px, py)
      else ctx.moveTo(ax, py)
    }
    ctx.strokeStyle = p.beam
    ctx.lineWidth = 2.4
    ctx.stroke()
    ctx.restore()

    this.line(ctx, ax + 0.5 * aw, ay, ax + 0.5 * aw, y + 18, p.faint, 1.1, [4, 3])
    this.text(ctx, 'Rp', ax + 0.5 * aw, y + 22, p.muted, 12, 'center', 'top')
  }

  /* ------------------------------------------------------------------- 6. CMP */

  private drawCmp(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const D = SUF // the flat surface the polish is aiming for
    const DIE = 26 // the dielectric the copper is inlaid in
    const polished = span(s, 0.4, 5.6)
    const over = span(s, 6.0, 7.2)
    const bump = (1 - polished) * 28 // the over-plated copper standing above the dielectric
    const dish = over * 9 // the wide copper sinking into its own line
    const erosion = over * 7 // the dielectric between dense lines wearing away

    const WIDE: [number, number] = [258, 392]
    const DENSE: Array<[number, number]> = [
      [424, 444],
      [460, 480],
      [496, 516],
    ]
    const SPAN: [number, number] = [414, 526]
    const denseDie = (x: number) => x >= SPAN[0] && x <= SPAN[1] && !DENSE.some(([a, b]) => x >= a && x <= b)

    // The silicon under the inlaid dielectric.
    this.rect(ctx, X0, D + DIE, VW, BASE - (D + DIE), p.si, p.siLine)

    // The dielectric, its top lower between the dense lines once the overpolish has run.
    ctx.beginPath()
    ctx.moveTo(X0, D + DIE)
    for (let x = X0; x <= X1; x += 4) ctx.lineTo(x, denseDie(x) ? D + erosion : D)
    ctx.lineTo(X1, D + DIE)
    ctx.closePath()
    ctx.fillStyle = p.oxide
    ctx.fill()
    ctx.strokeStyle = p.oxideLine
    ctx.lineWidth = 1.4
    ctx.stroke()

    // The copper: over-plated above the dielectric first, dished by the overpolish later.
    const cuTop = (wide: boolean) => D - bump + (wide ? dish : dish * 0.3)
    const copper = (a: number, b: number, wide: boolean) => {
      const top = cuTop(wide)
      this.rect(ctx, a, top, b - a, D + DIE - top, p.cu, p.beam, 1.3)
    }
    copper(WIDE[0], WIDE[1], true)
    for (const [a, b] of DENSE) copper(a, b, false)

    // The plane the polish aims for, so dishing and erosion read against something.
    this.line(ctx, X0 - 28, D, X1 + 28, D, p.faint, 1.2, [5, 4])
    this.text(ctx, 'target plane', X0 - 34, D, p.muted, 12, 'right')

    // The pad, sliding sideways (which is how a turning pad looks in a cross-section) and lifting
    // off at the end so the surface it leaves behind can be read.
    const lift = span(s, 6.4, 7.3)
    const padOn = Math.min(span(s, 0.2, 0.9), 1 - span(s, 6.6, 7.3))
    const padBottom = D - bump - 8 - lift * 132
    if (padOn > 0.02) {
      ctx.save()
      ctx.globalAlpha = padOn
      this.rect(ctx, 150, padBottom - 40, 600, 40, p.faint, p.muted)
      ctx.strokeStyle = p.mask
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let i = 0; i < 18; i += 1) {
        const hx = 150 + ((i * 40 + s * 70) % 588)
        ctx.moveTo(hx, padBottom)
        ctx.lineTo(hx + 12, padBottom - 40)
      }
      ctx.stroke()
      ctx.restore()

      this.text(ctx, 'pad', 160, padBottom - 52, p.muted, 14, 'left')
      this.arrowDown(ctx, 470, padBottom - 66, padBottom - 44, p.good, 2.4)
      this.text(ctx, 'down force', 492, padBottom - 58, p.good, 13, 'left')

      // Slurry flowing between the pad and the wafer, and the debris leaving the high spots.
      if (this.motion) {
        for (let i = 0; i < 26; i += 1) {
          const x = X0 + 20 + ((i * 97 + s * 90) % (VW - 40))
          this.dot(ctx, x, padBottom + 4 + (i % 2) * 3, 1.8, p.cu, 0.5 * padOn)
        }
        if (bump > 3) {
          for (let i = 0; i < 8; i += 1) {
            const t = ((((i / 8) + s * 0.6) % 1) + 1) % 1
            const x = WIDE[0] + ((i * 53) % (WIDE[1] - WIDE[0]))
            this.dot(ctx, x, D - bump - 2 - t * 26, 2, p.cu, (1 - t) * 0.55)
          }
        }
      }
    }

    this.text(ctx, 'Si', X0 + 26, BASE - 24, p.muted, 16, 'left')
    this.lead(ctx, 325, D + 16, 250, D + 64, p.faint)
    this.text(ctx, 'copper', 244, D + 68, p.muted, 13, 'right')
    this.lead(ctx, 210, D + 12, 176, D + 64, p.faint)
    this.text(ctx, 'dielectric', 170, D + 68, p.muted, 13, 'right')

    // The two defects that name the end of the process. They wait until the pad has lifted clear,
    // or the leaders would be drawn straight through it.
    if (lift > 0.55) {
      this.lead(ctx, 325, D + dish - 2, 296, D - 56, p.faint)
      this.text(ctx, 'dishing', 290, D - 60, p.muted, 13, 'right')
      const gap = (DENSE[0][1] + DENSE[1][0]) / 2
      this.lead(ctx, gap, D + erosion - 4, 540, D - 56, p.faint)
      this.text(ctx, 'erosion', 546, D - 60, p.muted, 13, 'left')
    }

    this.scaleBar(ctx, p, 38, '200 nm')
  }

  /* -------------------------------------------------------------- 7. metrology */

  private drawMeasure(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const list = stagePhases('measure')
    const at = (i: number, d: number) => list[i]?.at ?? d
    const tCd = at(1, 4.2)
    const tLoop = at(2, 7.4)

    const oxide = 14
    const film = 22
    const top = SUF - oxide - film
    this.silicon(ctx, p, SUF)
    this.rect(ctx, X0, SUF - oxide, VW, oxide, p.oxide, p.oxideLine)

    // The film is one continuous layer while the ellipsometer reads its thickness, then it breaks
    // into lines for the second measurement: a width has nothing to measure until the layer is
    // patterned. The grating is schematic, the way every scale in this module is.
    const lines: Array<[number, number]> = []
    for (let i = 0; i < CD_GRATING.count; i += 1) {
      const a = CD_GRATING.x0 + i * CD_GRATING.period
      lines.push([a, a + CD_GRATING.width])
    }
    const pattern = span(s, tCd - 0.5, tCd + 0.4)
    if (pattern < 0.99) {
      ctx.save()
      ctx.globalAlpha = 1 - pattern
      this.rect(ctx, X0, top, VW, film, p.film, p.filmLine)
      ctx.restore()
    }
    if (pattern > 0.01) {
      ctx.save()
      ctx.globalAlpha = pattern
      for (const [a, b] of lines) this.rect(ctx, a, top, b - a, film, p.film, p.filmLine, 1.3)
      ctx.restore()
    }

    // 1. Film thickness, read off the surface by an ellipsometer.
    const sweep = clamp01(s / tCd)
    // The head stays left of the map inset, so the beam never slides behind the panel.
    const spotX = lerp(X0 + 60, 600, sweep)
    const angle = (68 * Math.PI) / 180
    const len = 130
    const inX = spotX - Math.cos(angle) * len
    const inY = top - Math.sin(angle) * len
    const quiet = 1 - span(s, tCd, tCd + 0.4)
    if (quiet > 0.02) {
      ctx.save()
      ctx.globalAlpha = quiet
      this.rect(ctx, inX - 34, inY - 26, 44, 26, p.mask, p.panelLine)
      this.line(ctx, inX, inY, spotX, top, p.good, 2.4)
      this.line(ctx, spotX, top, spotX + Math.cos(angle) * len, top - Math.sin(angle) * len, p.good, 2.4)
      this.line(ctx, spotX, top, spotX + Math.cos(angle) * (len - 14), top - Math.sin(angle) * (len - 14), p.beam, 1.6)
      this.text(ctx, 'ellipsometer', inX - 22, inY - 32, p.muted, 13, 'right')
      this.dot(ctx, spotX, top + film / 2, 5, p.good, 0.9)
      this.line(ctx, spotX, top - 6, spotX, SUF + 18, p.good, 1.2, [3, 3])
      ctx.restore()
    }

    // 2. Critical dimension, which needs its own ruler: a 45 nm line cannot share a scale with a
    // 3 nm film, so it gets its own inset rather than a zoom that would lose the film.
    if (s > tCd - 0.3) this.cdInset(ctx, p, s, tCd)

    // The line it read, boxed and led back to the inset so the reader knows what is magnified.
    const zoom = Math.min(span(s, tCd + 0.1, tCd + 0.8), 1 - span(s, tLoop - 1.4, tLoop - 0.8))
    if (zoom > 0.02) {
      const [a, b] = lines[4]
      ctx.save()
      ctx.globalAlpha = zoom
      ctx.strokeStyle = p.good
      ctx.lineWidth = 1.2
      ctx.setLineDash([4, 3])
      ctx.strokeRect(a - 5, top - 5, b - a + 10, film + 10)
      ctx.beginPath()
      ctx.moveTo(a - 5, top - 5)
      ctx.lineTo(124, 172)
      ctx.moveTo(b + 5, top - 5)
      ctx.lineTo(292, 172)
      ctx.stroke()
      ctx.restore()
    }

    // 3. Run-to-run control: what the measurement is for.
    this.controlLoop(ctx, p, s, tLoop)

    if (s < tCd + 0.4) this.mapInset(ctx, p, s, tCd)

    this.text(ctx, 'film', X1 - 26, top + film / 2, p.muted, 16, 'right')
    this.text(ctx, 'Si', X0 + 26, BASE - 24, p.muted, 16, 'left')
    this.text(ctx, 'SiO₂', X0 + 122, SUF - oxide / 2, p.muted, 12, 'left')
    this.dimV(ctx, X1 + 12, top, SUF, '3.1 nm', p.muted)
    this.scaleBar(ctx, p, 36, '5 nm')
  }

  /** The second measurement the chapter names: a linewidth, read back by an electron beam. */
  private cdInset(ctx: CanvasRenderingContext2D, p: Palette, s: number, tCd: number) {
    const x = 124
    const y = 40
    const w = 168
    const h = 132
    this.rect(ctx, x, y, w, h, p.panel, p.panelLine, 1.4)
    const cx = x + w / 2
    this.text(ctx, 'CD-SEM', cx, y + 13, p.muted, 12)
    this.text(ctx, 'line width', cx, y + 27, p.muted, 11)

    // The wafer, and one line of the pattern standing on it.
    const baseY = y + h - 22
    const lw = 50
    const lh = 32
    const lineTop = baseY - lh
    this.rect(ctx, x + 14, baseY, w - 28, 12, p.si, p.siLine, 1.1)
    this.rect(ctx, cx - lw / 2, lineTop, lw, lh, p.film, p.filmLine, 1.3)

    // The column, and the beam it walks across the top of the line: the SEM builds the width by
    // scanning an edge, it does not see the whole line at once.
    const hit = span(s, tCd + 0.2, tCd + 0.9)
    this.rect(ctx, cx - 28, y + 36, 56, 13, p.mask, p.panelLine, 1)
    if (hit > 0.02) {
      const sx = cx + lerp(-lw / 2 - 6, lw / 2 + 6, clamp01(span(s, tCd + 0.2, tCd + 1.4)))
      ctx.save()
      ctx.globalAlpha = 0.35 * hit
      this.poly(ctx, [[sx - 3, y + 49], [sx + 3, y + 49], [sx + 1.5, lineTop], [sx - 1.5, lineTop]], p.good)
      ctx.restore()
      this.dot(ctx, sx, lineTop, 3, p.good, hit)
    }

    // The width it reports, measured across the line it landed on.
    const read = span(s, tCd + 1.1, tCd + 1.9)
    if (read > 0.02) {
      ctx.save()
      ctx.globalAlpha = read
      this.line(ctx, cx - lw / 2, lineTop - 7, cx + lw / 2, lineTop - 7, p.good, 1.2)
      this.line(ctx, cx - lw / 2, lineTop - 11, cx - lw / 2, lineTop - 3, p.good, 1.2)
      this.line(ctx, cx + lw / 2, lineTop - 11, cx + lw / 2, lineTop - 3, p.good, 1.2)
      ctx.restore()
      this.text(ctx, '45 nm', cx + lw / 2 + 5, lineTop - 8, p.good, 12, 'left')
    }
  }

  /**
   * Run-to-run control: what the measurement is for. A report stops at the number; control feeds it
   * back, so the panel names the three things that happen to it and the return arrow is the part
   * that makes it a loop rather than a readout.
   */
  private controlLoop(ctx: CanvasRenderingContext2D, p: Palette, s: number, tLoop: number) {
    const on = span(s, tLoop - 0.6, tLoop + 0.2)
    if (on <= 0.02) return
    ctx.save()
    ctx.globalAlpha = on

    const bw = 128
    const bh = 38
    const gap = 46
    const x1 = 212
    const x2 = x1 + bw + gap
    const x3 = x2 + bw + gap
    const y = 208
    const cy = y + bh / 2
    for (const [nx, label] of [
      [x1, 'measure'],
      [x2, 'model'],
      [x3, 'recipe'],
    ] as Array<[number, string]>) {
      this.rect(ctx, nx, y, bw, bh, p.panel, p.panelLine, 1.4)
      this.text(ctx, label, nx + bw / 2, cy, p.muted, 13)
    }
    this.arrowRight(ctx, x1 + bw + 5, x2 - 5, cy, p.good)
    this.arrowRight(ctx, x2 + bw + 5, x3 - 5, cy, p.good)
    this.text(ctx, 'compare', (x1 + bw + x2) / 2, y - 11, p.muted, 11)
    this.text(ctx, 'adjust', (x2 + bw + x3) / 2, y - 11, p.muted, 11)

    // The return path: the adjustment belongs to the next wafers, which is the whole point.
    const ry = y + bh + 20
    ctx.strokeStyle = p.good
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x3 + bw / 2, y + bh)
    ctx.lineTo(x3 + bw / 2, ry)
    ctx.lineTo(x1 + bw / 2, ry)
    ctx.lineTo(x1 + bw / 2, y + bh + 6)
    ctx.stroke()
    this.poly(
      ctx,
      [
        [x1 + bw / 2 - 6, y + bh + 7],
        [x1 + bw / 2 + 6, y + bh + 7],
        [x1 + bw / 2, y + bh - 2],
      ],
      p.good,
    )
    this.text(ctx, 'next wafers', (x1 + x3 + bw) / 2, ry + 13, p.muted, 11)

    ctx.restore()
  }

  /** A short rightward arrow, for the control loop. */
  private arrowRight(ctx: CanvasRenderingContext2D, x1: number, x2: number, y: number, colour: string) {
    const head = 7
    this.line(ctx, x1, y, x2 - head, y, colour, 2)
    this.poly(ctx, [[x2, y], [x2 - head * 1.7, y - head], [x2 - head * 1.7, y + head]], colour)
  }

  /** What the ellipsometer is really producing: a thickness map of the wafer, built point by point. */
  private mapInset(ctx: CanvasRenderingContext2D, p: Palette, s: number, tCd: number) {
    const x = 604
    const y = 44
    const w = 268
    const h = 150
    this.rect(ctx, x, y, w, h, p.panel, p.panelLine, 1.4)

    const cx = x + w / 2
    const cy = y + h / 2 + 10
    const R = 52
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, Math.PI * 2)
    ctx.fillStyle = p.si
    ctx.fill()
    ctx.strokeStyle = p.siLine
    ctx.lineWidth = 1.4
    ctx.stroke()

    // A four-stop ramp on the theme's own colours, from the thinnest film to the thickest.
    const stops = [p.film, p.exposed, p.oxide, p.cu]
    const ramp = (t: number) => {
      const u = clamp01(t) * (stops.length - 1)
      const i = Math.min(stops.length - 2, Math.floor(u))
      return mix(stops[i], stops[i + 1], u - i)
    }

    const N = 96
    const shown = Math.round(clamp01(s / tCd) * N)
    for (let k = 0; k < N; k += 1) {
      const a = k * 0.5
      const rr = R * (0.1 + 0.86 * (k / (N - 1)))
      const measured = k < shown
      ctx.beginPath()
      ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 2.6, 0, Math.PI * 2)
      ctx.fillStyle = measured ? ramp(0.15 + 0.85 * (rr / R) ** 1.5) : p.panelLine
      ctx.globalAlpha = measured ? 1 : 0.5
      ctx.fill()
      ctx.globalAlpha = 1
    }

    this.text(ctx, 'thickness map', cx, y + 16, p.muted, 12)
  }
}
