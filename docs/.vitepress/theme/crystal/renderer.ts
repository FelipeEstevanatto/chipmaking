/**
 * The WebGL2 renderer behind `CrystalViewer.vue`.
 *
 * Everything is instanced: one draw call for every atom, one for every bond and cell edge. The
 * geometry that reaches the GPU is three small meshes (a sphere, a cylinder) plus two flat
 * instance buffers, so the cost is set by the number of atoms and not by their detail — 280 atoms
 * at the largest size is a few hundred thousand triangles, which any phone from the last decade
 * draws without dropping a frame.
 *
 * Choices worth keeping:
 *
 *  - **Spheres carry their own ink.** The silhouette is mixed towards the species' line colour, so
 *    an atom reads as a filled circle with a stroke, like every drawn figure in this site, instead
 *    of a shaded ball that disappears against a light page.
 *  - **Bonds are one cylinder with two colours**, split at the midpoint. A Si–C bond is therefore
 *    half grey and half dark without a second draw.
 *  - **The page owns the colours.** The viewer asks for the panel background and nothing else; the
 *    species palette comes from `structures.ts`, so a light and a dark reader see the same
 *    material.
 *  - **A cut atom is solved, not clipped.** The unit-cell panel cuts its atoms at the cell's faces,
 *    and each fragment works out where the eye ray first touches the sphere-and-cell solid. Clipping
 *    the sphere and trusting the depth buffer instead leaves the atom's far inside wall visible
 *    where it was cut away, and the exact intersection costs one `gl_FragDepth` write, which is early
 *    depth testing for the atoms — a few hundred thousand fragments, and not worth a second program.
 *  - **Nothing runs when nothing moves.** The animation loop stops when the canvas leaves the
 *    viewport or when the scene is still, and a lost context is rebuilt rather than left frozen.
 */

import { ATOM_STRIDE, BOND_STRIDE, type Instances, type Vec3 } from './geometry'
import { cylinderMesh, sphereMesh, type Mesh } from './meshes'

type Mat4 = Float32Array

/** Vertical field of view, in degrees. Narrow enough to keep the lattice from looking bulbous. */
const FIELD_OF_VIEW = 40
/** How far the camera may look down on the block. */
const PITCH_LIMIT = 80
/** Zoom limits, as a multiple of the distance that fits the whole block. */
const ZOOM_MIN = 0.55
const ZOOM_MAX = 2.8
/** Milliseconds of quiet before the block starts turning again. */
const RESUME_MS = 4000
/** Degrees per second of idle rotation. */
const SPIN = 10
/** Degrees of rotation per pixel dragged. */
const DRAG = 0.32
/** Milliseconds within which a released drag keeps gliding. */
const INERTIA_MS = 520
/** Above this many CSS pixels, the renderer stops paying for a third screen pixel ratio. */
const MAX_PIXEL_RATIO = 2

const LIGHT_KEY = normalize([0.42, 0.72, 0.55])
const LIGHT_FILL = normalize([-0.58, -0.12, -0.62])

function normalize(vector: Vec3): Vec3 {
  const length = Math.hypot(vector[0], vector[1], vector[2]) || 1
  return [vector[0] / length, vector[1] / length, vector[2] / length]
}

/* ------------------------------------------------------------------ matrices */

function perspective(out: Mat4, fovY: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fovY / 2)
  out.fill(0)
  out[0] = f / aspect
  out[5] = f
  out[10] = (far + near) / (near - far)
  out[11] = -1
  out[14] = (2 * far * near) / (near - far)
  return out
}

function lookAt(out: Mat4, eye: Vec3, target: Vec3, up: Vec3): Mat4 {
  const z = normalize([eye[0] - target[0], eye[1] - target[1], eye[2] - target[2]])
  const x = normalize([
    up[1] * z[2] - up[2] * z[1],
    up[2] * z[0] - up[0] * z[2],
    up[0] * z[1] - up[1] * z[0],
  ])
  const y = [
    z[1] * x[2] - z[2] * x[1],
    z[2] * x[0] - z[0] * x[2],
    z[0] * x[1] - z[1] * x[0],
  ]

  out[0] = x[0]
  out[1] = y[0]
  out[2] = z[0]
  out[3] = 0
  out[4] = x[1]
  out[5] = y[1]
  out[6] = z[1]
  out[7] = 0
  out[8] = x[2]
  out[9] = y[2]
  out[10] = z[2]
  out[11] = 0
  out[12] = -(x[0] * eye[0] + x[1] * eye[1] + x[2] * eye[2])
  out[13] = -(y[0] * eye[0] + y[1] * eye[1] + y[2] * eye[2])
  out[14] = -(z[0] * eye[0] + z[1] * eye[1] + z[2] * eye[2])
  out[15] = 1
  return out
}

function multiply(out: Mat4, a: Mat4, b: Mat4): Mat4 {
  for (let column = 0; column < 4; column += 1) {
    for (let row = 0; row < 4; row += 1) {
      out[column * 4 + row] =
        a[row] * b[column * 4] +
        a[4 + row] * b[column * 4 + 1] +
        a[8 + row] * b[column * 4 + 2] +
        a[12 + row] * b[column * 4 + 3]
    }
  }
  return out
}

/* ------------------------------------------------------------------- shaders */

/** Lighting and the ink edge, shared by both programs so an atom and a bond match. */
const SHADING = `
uniform vec3 uEye;
uniform vec3 uLightKey;
uniform vec3 uLightFill;
uniform vec3 uInk;
uniform float uInkStrength;
uniform float uInkMix;
uniform float uHatchPitch;
uniform vec3 uReciprocalA;
uniform vec3 uReciprocalB;
uniform vec3 uReciprocalC;
uniform bool uClipOn;
uniform float uClipMargin;

/* The occupancy panel cuts the cell open: anything outside its faces is dropped, and the faces
   themselves are left a hair outside so the frame drawn on them is not shaved in half. */
bool outsideCell(vec3 world) {
  if (!uClipOn) return false;
  vec3 f = vec3(dot(world, uReciprocalA), dot(world, uReciprocalB), dot(world, uReciprocalC));
  return any(lessThan(f, vec3(-uClipMargin))) || any(greaterThan(f, vec3(1.0 + uClipMargin)));
}

vec3 shade(vec3 base, vec3 ink, vec3 normal, vec3 world) {
  vec3 n = normalize(normal);
  vec3 view = normalize(uEye - world);
  float key = max(dot(n, uLightKey), 0.0);
  float fill = max(dot(n, uLightFill), 0.0);
  float half_ = max(dot(n, normalize(uLightKey + view)), 0.0);
  float rim = pow(1.0 - max(dot(n, view), 0.0), 3.0);

  vec3 color = base * (0.42 + 0.06 * uInkStrength + 0.60 * key + 0.24 * fill);
  color += vec3(pow(half_, 36.0) * 0.22);

  // The edge is what separates an atom from the page. On a light page that means the darker line
  // colour of the drawn figures; on a dark one, the same colour lightened, or a carbon sphere
  // would sit invisible on its own background.
  vec3 edge = mix(ink, vec3(1.0), uInkMix);
  return mix(color, edge, rim * uInkStrength);
}

/**
 * The inside of an atom, where the surface the eye is looking at has been cut away: matte and flat,
 * so it never reads as more sphere. The bonds use it; the atoms are cut by the first-touch test instead.
 */
vec3 sectionShade(vec3 base, vec3 normal) {
  return base * (0.55 + 0.28 * max(dot(normalize(normal), uLightKey), 0.0));
}
`

const SPHERE_VERTEX = `#version 300 es
precision highp float;

layout(location = 0) in vec3 aPosition;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec3 iCenter;
layout(location = 3) in float iRadius;
layout(location = 4) in vec3 iColor;
layout(location = 5) in vec3 iInk;

uniform mat4 uViewProjection;

out vec3 vNormal;
out vec3 vWorld;
out vec3 vColor;
out vec3 vInk;
out vec3 vCentre;
out float vRadius;

void main() {
  vec3 world = iCenter + aPosition * iRadius;
  vWorld = world;
  vNormal = aNormal;
  vColor = iColor;
  vInk = iInk;
  vCentre = iCenter;
  vRadius = iRadius;
  gl_Position = uViewProjection * vec4(world, 1.0);
}
`

const SPHERE_FRAGMENT = `#version 300 es
precision highp float;

in vec3 vWorld;
in vec3 vColor;
in vec3 vInk;
in vec3 vCentre;
in float vRadius;

out vec4 outColor;

${SHADING}

uniform mat4 uViewProjection;

/**
 * Where the eye ray first enters the solid being drawn: the atom's sphere where it lies inside the
 * cell, and the cell's own far face where the atom runs out of it. The intersection is solved here
 * rather than left to the depth buffer for two reasons, and both of them are the reason the cut is
 * drawn at all.
 *
 * A clipped sphere loses the surface the eye is looking at, and what is left of it is the far inside
 * wall: drawing that wall is the hollow look of an atom that has not been cut but scooped out. And
 * near a cell edge that cuts an atom diagonally, both the near and the far surface of the sphere can
 * fall outside the cell, so no fragment of it is left inside and the corner would be missing
 * altogether.
 *
 * The point this returns is the whole surface of the solid, so the depth written for it belongs to
 * the pixel and not to the fragment: every fragment of the pixel lands on the same point, and it
 * does not matter which one the rasteriser keeps.
 */
bool firstTouch(out vec3 point, out vec3 normal, out bool cut) {
  vec3 direction = normalize(vWorld - uEye);
  vec3 offset = uEye - vCentre;
  float along = dot(offset, direction);
  float discriminant = along * along - dot(offset, offset) + vRadius * vRadius;
  if (discriminant <= 0.0) return false;

  float root = sqrt(discriminant);
  float start = -along - root;
  float stop = -along + root;
  vec3 faceNormal = vec3(0.0);
  cut = false;

  if (uClipOn) {
    // The cell as three slabs in its own reciprocal basis, a hair outside the faces so the frame
    // drawn on them is not shaved in half.
    float low = -uClipMargin;
    float high = 1.0 + uClipMargin;
    vec3 eye = vec3(dot(uEye, uReciprocalA), dot(uEye, uReciprocalB), dot(uEye, uReciprocalC));
    vec3 slope = vec3(
      dot(direction, uReciprocalA),
      dot(direction, uReciprocalB),
      dot(direction, uReciprocalC)
    );

    for (int axis = 0; axis < 3; axis += 1) {
      float rate = slope[axis];
      if (abs(rate) < 1e-9) {
        if (eye[axis] < low || eye[axis] > high) return false;
        continue;
      }
      float one = (low - eye[axis]) / rate;
      float other = (high - eye[axis]) / rate;
      float enter = min(one, other);
      if (enter > start) {
        start = enter;
        vec3 reciprocal = axis == 0 ? uReciprocalA : (axis == 1 ? uReciprocalB : uReciprocalC);
        faceNormal = normalize(reciprocal) * (one <= other ? -1.0 : 1.0);
        cut = true;
      }
      stop = min(stop, max(one, other));
    }
  }

  // The camera orbits outside the block, so the ray never starts inside the solid.
  if (start > stop || start <= 0.0) return false;

  point = uEye + direction * start;
  normal = cut ? faceNormal : (point - vCentre) / vRadius;
  return true;
}

/**
 * A cut face is drawn like a section on paper: a flat plate crossed by parallel lines at 45 degrees,
 * a fixed distance apart on the screen. A hatch laid out in the plane of the face turns into a moiré
 * band wherever the face is seen at a grazing angle, which is where a cut face spends its time.
 */
vec3 hatched(vec3 base, vec3 ink, vec3 point, vec3 normal) {
  float diagonal = (gl_FragCoord.x + gl_FragCoord.y) / uHatchPitch;
  float gap = uHatchPitch * (0.5 - abs(fract(diagonal) - 0.5));
  float stripe = 1.0 - smoothstep(0.6, 1.2, gap);

  float light = 0.76 + 0.22 * max(dot(normal, uLightKey), 0.0);
  vec3 plate = mix(base, vec3(1.0), 0.24) * light;
  vec3 line = mix(base, ink, 0.72) * light;
  vec3 color = mix(plate, line, stripe);

  // The section meets the sphere at its rim, and a drawn section carries a line there.
  float rim = smoothstep(0.9, 1.0, distance(point, vCentre) / vRadius);
  return mix(color, mix(ink, vec3(1.0), uInkMix), rim * 0.65);
}

void main() {
  vec3 point;
  vec3 normal;
  bool cut;
  if (!firstTouch(point, normal, cut)) discard;

  vec4 projected = uViewProjection * vec4(point, 1.0);
  gl_FragDepth = projected.z / projected.w * 0.5 + 0.5;
  outColor = vec4(cut ? hatched(vColor, vInk, point, normal) : shade(vColor, vInk, normal, point), 1.0);
}
`

const BOND_VERTEX = `#version 300 es
precision highp float;

layout(location = 0) in vec3 aPosition;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec3 iFrom;
layout(location = 3) in float iRadius;
layout(location = 4) in vec3 iTo;
layout(location = 5) in vec3 iColorFrom;
layout(location = 6) in vec3 iColorTo;

uniform mat4 uViewProjection;

out vec3 vNormal;
out vec3 vWorld;
out vec3 vColorFrom;
out vec3 vColorTo;
out float vAlong;

void main() {
  vec3 axis = iTo - iFrom;
  float length = max(length(axis), 1e-6);
  vec3 direction = axis / length;
  vec3 helper = abs(direction.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 side = normalize(cross(helper, direction));
  vec3 other = cross(direction, side);

  vec3 world = iFrom
    + side * (aPosition.x * iRadius)
    + direction * (aPosition.y * length)
    + other * (aPosition.z * iRadius);

  vWorld = world;
  vNormal = normalize(side * aNormal.x + direction * aNormal.y + other * aNormal.z);
  vColorFrom = iColorFrom;
  vColorTo = iColorTo;
  vAlong = aPosition.y;
  gl_Position = uViewProjection * vec4(world, 1.0);
}
`

const BOND_FRAGMENT = `#version 300 es
precision highp float;

in vec3 vNormal;
in vec3 vWorld;
in vec3 vColorFrom;
in vec3 vColorTo;
in float vAlong;

out vec4 outColor;

${SHADING}

void main() {
  if (outsideCell(vWorld)) discard;
  // The bond changes material at its midpoint: grey up to a carbon, dark past it, and so on.
  vec3 base = mix(vColorFrom, vColorTo, smoothstep(0.42, 0.58, vAlong));
  if (!gl_FrontFacing) {
    outColor = vec4(sectionShade(base, -vNormal), 1.0);
    return;
  }
  outColor = vec4(shade(base, uInk, vNormal, vWorld), 1.0);
}
`

interface Program {
  program: WebGLProgram
  uniforms: Record<string, WebGLUniformLocation | null>
}

export class CrystalRenderer {
  private readonly canvas: HTMLCanvasElement
  private readonly gl: WebGL2RenderingContext
  private sphere: Program | null = null
  private bond: Program | null = null
  private sphereVao: WebGLVertexArrayObject | null = null
  private bondVao: WebGLVertexArrayObject | null = null
  private sphereMesh: Mesh = sphereMesh()
  private cylinderMesh: Mesh = cylinderMesh()
  private atomBuffer: WebGLBuffer | null = null
  private bondBuffer: WebGLBuffer | null = null
  private meshBuffers: WebGLBuffer[] = []
  private atomData: Float32Array = new Float32Array(0)
  private bondData: Float32Array = new Float32Array(0)
  private atomCount = 0
  private bondCount = 0

  private background: Vec3 = [0.97, 0.97, 0.98]
  private inkMix = 0
  /** Reciprocal vectors of the drawn cell when the view is cut open, null otherwise. */
  private clip: [Vec3, Vec3, Vec3] | null = null
  private target: Vec3 = [0, 0, 0]
  private fit = 10
  private readonly opening: { yaw: number; pitch: number }
  private yaw: number
  private pitch: number
  private zoom = 1
  private spin = true
  private lost = false

  private readonly viewProjection = new Float32Array(16)
  private readonly projection = new Float32Array(16)
  private readonly view = new Float32Array(16)
  private readonly eye: Vec3 = [0, 0, 0]

  private pointers = new Map<number, { x: number; y: number }>()
  private pinch = 0
  private velocity = { yaw: 0, pitch: 0 }
  private draggedAt = 0
  private settledAt = performance.now()
  private engaged = false
  private visible = true
  private frame: number | null = null
  private wake: number | null = null
  private lastFrame = performance.now()

  private readonly observer: IntersectionObserver | null
  private readonly resizeObserver: ResizeObserver | null

  /**
   * `view` is the angle the drawing opens on, in degrees, and the one `reset` returns to. The unit
   * cell asks for a corner: its cut faces have to face the reader, or the panel reads as a handful of
   * whole spheres.
   */
  static create(
    canvas: HTMLCanvasElement,
    view: { yaw: number; pitch: number } = { yaw: 34, pitch: 18 },
  ): CrystalRenderer | null {
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: true,
      depth: true,
      powerPreference: 'low-power',
    })
    return gl ? new CrystalRenderer(canvas, gl, view) : null
  }

  private constructor(
    canvas: HTMLCanvasElement,
    gl: WebGL2RenderingContext,
    view: { yaw: number; pitch: number },
  ) {
    this.canvas = canvas
    this.gl = gl
    this.opening = { yaw: (view.yaw * Math.PI) / 180, pitch: (view.pitch * Math.PI) / 180 }
    this.yaw = this.opening.yaw
    this.pitch = this.opening.pitch

    this.observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver((entries) => {
            this.visible = entries.some((entry) => entry.isIntersecting)
            if (this.visible) this.request()
            else this.stop()
          })
    this.observer?.observe(canvas)

    this.resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => this.resize())
    this.resizeObserver?.observe(canvas)
    if (!this.resizeObserver) window.addEventListener('resize', this.resizeHandler)

    canvas.addEventListener('webglcontextlost', this.onContextLost)
    canvas.addEventListener('webglcontextrestored', this.onContextRestored)
    canvas.addEventListener('pointerdown', this.onPointerDown)
    canvas.addEventListener('pointermove', this.onPointerMove)
    canvas.addEventListener('pointerup', this.onPointerUp)
    canvas.addEventListener('pointercancel', this.onPointerUp)
    canvas.addEventListener('wheel', this.onWheel, { passive: false })

    this.init()
    this.resize()
  }

  /* ------------------------------------------------------------ public API */

  /** Uploads a new block. The camera keeps its angle and its relative zoom. */
  setGeometry(instances: Instances, center: Vec3, radius: number): void {
    this.atomData = instances.atomData
    this.bondData = instances.bondData
    this.atomCount = instances.atomCount
    this.bondCount = instances.bondCount
    this.target = center
    this.fit = (radius / Math.sin((FIELD_OF_VIEW * Math.PI) / 360)) * 1.08
    this.upload()
    this.request()
  }

  setBackground(color: Vec3): void {
    this.background = color
    // Perceived luminance, to decide which way the silhouette edge should go.
    const luminance = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2]
    this.inkMix = luminance < 0.4 ? 0.58 : 0
    this.request()
  }

  /** Cuts the drawing at the faces of one cell: what the occupancy panel needs, and nothing else. */
  setClip(reciprocal: [Vec3, Vec3, Vec3] | null): void {
    this.clip = reciprocal
    this.request()
  }

  setAutoRotate(enabled: boolean): void {
    this.spin = enabled
    this.settledAt = Math.max(this.settledAt, performance.now() - RESUME_MS)
    this.request()
  }

  orbitBy(yawDegrees: number, pitchDegrees: number): void {
    const limit = (PITCH_LIMIT * Math.PI) / 180
    this.yaw += (yawDegrees * Math.PI) / 180
    this.pitch = clamp(this.pitch + (pitchDegrees * Math.PI) / 180, -limit, limit)
    this.touch()
    this.request()
  }

  zoomBy(factor: number): void {
    this.zoom = clamp(this.zoom * factor, ZOOM_MIN, ZOOM_MAX)
    this.touch()
    this.request()
  }

  reset(): void {
    this.yaw = this.opening.yaw
    this.pitch = this.opening.pitch
    this.zoom = 1
    this.velocity = { yaw: 0, pitch: 0 }
    this.touch()
    this.request()
  }

  resize(): void {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)
    const width = Math.max(1, Math.round(this.canvas.clientWidth * ratio))
    const height = Math.max(1, Math.round(this.canvas.clientHeight * ratio))
    if (this.canvas.width === width && this.canvas.height === height) return
    this.canvas.width = width
    this.canvas.height = height
    this.request()
  }

  private disposed = false

  dispose(): void {
    this.disposed = true
    this.visible = false
    this.stop()
    if (this.wake !== null) window.clearTimeout(this.wake)
    this.observer?.disconnect()
    this.resizeObserver?.disconnect()
    window.removeEventListener('resize', this.resizeHandler)
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost)
    this.canvas.removeEventListener('webglcontextrestored', this.onContextRestored)
    this.canvas.removeEventListener('pointerdown', this.onPointerDown)
    this.canvas.removeEventListener('pointermove', this.onPointerMove)
    this.canvas.removeEventListener('pointerup', this.onPointerUp)
    this.canvas.removeEventListener('pointercancel', this.onPointerUp)
    this.canvas.removeEventListener('wheel', this.onWheel)
    for (const program of [this.sphere, this.bond]) {
      if (program) this.gl.deleteProgram(program.program)
    }
    this.gl.deleteVertexArray(this.sphereVao)
    this.gl.deleteVertexArray(this.bondVao)
    this.gl.deleteBuffer(this.atomBuffer)
    this.gl.deleteBuffer(this.bondBuffer)
    for (const buffer of this.meshBuffers) this.gl.deleteBuffer(buffer)
    this.meshBuffers = []
  }

  /* ----------------------------------------------------------------- gl setup */

  private init(): void {
    const gl = this.gl
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearColor(this.background[0], this.background[1], this.background[2], 1)

    this.sphere = this.buildProgram(SPHERE_VERTEX, SPHERE_FRAGMENT)
    this.bond = this.buildProgram(BOND_VERTEX, BOND_FRAGMENT)
    if (!this.sphere || !this.bond) return

    // After a context loss the previous buffers are gone with the context, so the list is reset.
    this.meshBuffers = []
    this.sphereVao = this.buildSphereVao()
    this.bondVao = this.buildBondVao()
  }

  private buildProgram(vertexSource: string, fragmentSource: string): Program | null {
    const gl = this.gl
    const vertex = gl.createShader(gl.VERTEX_SHADER)
    const fragment = gl.createShader(gl.FRAGMENT_SHADER)
    if (!vertex || !fragment) return null

    for (const [shader, source, label] of [
      [vertex, vertexSource, 'vertex'],
      [fragment, fragmentSource, 'fragment'],
    ] as const) {
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`[CrystalViewer] ${label} shader failed:`, gl.getShaderInfoLog(shader))
        return null
      }
    }

    const program = gl.createProgram()
    if (!program) return null
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    gl.deleteShader(vertex)
    gl.deleteShader(fragment)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('[CrystalViewer] shader link failed:', gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      return null
    }

    const uniforms: Record<string, WebGLUniformLocation | null> = {}
    for (const name of [
      'uViewProjection',
      'uEye',
      'uLightKey',
      'uLightFill',
      'uInk',
      'uInkStrength',
      'uInkMix',
      'uHatchPitch',
      'uReciprocalA',
      'uReciprocalB',
      'uReciprocalC',
      'uClipOn',
      'uClipMargin',
    ]) {
      uniforms[name] = gl.getUniformLocation(program, name)
    }
    return { program, uniforms }
  }

  private meshBuffer(mesh: Mesh): [WebGLBuffer | null, WebGLBuffer | null, WebGLBuffer | null] {
    const gl = this.gl
    const positions = gl.createBuffer()
    const normals = gl.createBuffer()
    const indices = gl.createBuffer()
    if (positions) this.meshBuffers.push(positions)
    if (normals) this.meshBuffers.push(normals)
    if (indices) this.meshBuffers.push(indices)
    gl.bindBuffer(gl.ARRAY_BUFFER, positions)
    gl.bufferData(gl.ARRAY_BUFFER, mesh.positions, gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, normals)
    gl.bufferData(gl.ARRAY_BUFFER, mesh.normals, gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW)
    return [positions, normals, indices]
  }

  private buildSphereVao(): WebGLVertexArrayObject | null {
    const gl = this.gl
    const vao = gl.createVertexArray()
    if (!vao) return null
    gl.bindVertexArray(vao)

    const [positions, normals, indices] = this.meshBuffer(this.sphereMesh)
    for (const [location, buffer] of [
      [0, positions],
      [1, normals],
    ] as const) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.enableVertexAttribArray(location)
      gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0)
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices)

    this.atomBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.atomBuffer)
    const stride = ATOM_STRIDE * 4
    gl.enableVertexAttribArray(2)
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, stride, 0)
    gl.enableVertexAttribArray(3)
    gl.vertexAttribPointer(3, 1, gl.FLOAT, false, stride, 12)
    gl.enableVertexAttribArray(4)
    gl.vertexAttribPointer(4, 3, gl.FLOAT, false, stride, 16)
    gl.enableVertexAttribArray(5)
    gl.vertexAttribPointer(5, 3, gl.FLOAT, false, stride, 28)
    for (const location of [2, 3, 4, 5]) gl.vertexAttribDivisor(location, 1)

    gl.bindVertexArray(null)
    return vao
  }

  private buildBondVao(): WebGLVertexArrayObject | null {
    const gl = this.gl
    const vao = gl.createVertexArray()
    if (!vao) return null
    gl.bindVertexArray(vao)

    const [positions, normals, indices] = this.meshBuffer(this.cylinderMesh)
    for (const [location, buffer] of [
      [0, positions],
      [1, normals],
    ] as const) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.enableVertexAttribArray(location)
      gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0)
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices)

    this.bondBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.bondBuffer)
    const stride = BOND_STRIDE * 4
    gl.enableVertexAttribArray(2)
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, stride, 0)
    gl.enableVertexAttribArray(3)
    gl.vertexAttribPointer(3, 1, gl.FLOAT, false, stride, 12)
    gl.enableVertexAttribArray(4)
    gl.vertexAttribPointer(4, 3, gl.FLOAT, false, stride, 16)
    gl.enableVertexAttribArray(5)
    gl.vertexAttribPointer(5, 3, gl.FLOAT, false, stride, 28)
    gl.enableVertexAttribArray(6)
    gl.vertexAttribPointer(6, 3, gl.FLOAT, false, stride, 40)
    for (const location of [2, 3, 4, 5, 6]) gl.vertexAttribDivisor(location, 1)

    gl.bindVertexArray(null)
    return vao
  }

  private upload(): void {
    const gl = this.gl
    if (!this.atomBuffer || !this.bondBuffer) return
    gl.bindBuffer(gl.ARRAY_BUFFER, this.atomBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.atomData, gl.DYNAMIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.bondBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.bondData, gl.DYNAMIC_DRAW)
  }

  /* ---------------------------------------------------------------- the loop */

  private request(): void {
    if (this.frame === null && this.visible && !this.lost && !this.disposed) {
      this.lastFrame = performance.now()
      this.frame = requestAnimationFrame(this.tick)
    }
  }

  private stop(): void {
    if (this.frame !== null) {
      cancelAnimationFrame(this.frame)
      this.frame = null
    }
  }

  private readonly tick = (now: number) => {
    this.frame = null
    const delta = Math.min(now - this.lastFrame, 64)
    this.lastFrame = now

    const dragging = this.pointers.size > 0
    const gliding = now - this.draggedAt < INERTIA_MS
    const idleFor = now - Math.max(this.draggedAt, this.settledAt)
    const turning = this.spin && !dragging && idleFor > RESUME_MS

    if (gliding && !dragging) {
      const decay = Math.pow(0.9, delta / 16)
      this.yaw += (this.velocity.yaw * delta) / 1000
      this.pitch = clamp(
        this.pitch + (this.velocity.pitch * delta) / 1000,
        -(PITCH_LIMIT * Math.PI) / 180,
        (PITCH_LIMIT * Math.PI) / 180,
      )
      this.velocity.yaw *= decay
      this.velocity.pitch *= decay
    } else if (turning) {
      this.yaw += ((SPIN * delta) / 1000) * (Math.PI / 180)
    }

    this.draw()

    if (dragging || gliding || turning) this.request()
    else this.scheduleWake(RESUME_MS - idleFor)
  }

  /** The loop stops while the block is still; the idle rotation is what brings it back. */
  private scheduleWake(inMilliseconds: number): void {
    if (!this.spin || this.wake !== null || inMilliseconds <= 0) return
    this.wake = window.setTimeout(() => {
      this.wake = null
      this.request()
    }, inMilliseconds + 20)
  }

  private draw(): void {
    const gl = this.gl
    if (!this.sphere || !this.bond || !this.sphereVao || !this.bondVao) return

    const aspect = this.canvas.width / Math.max(1, this.canvas.height)
    const distance = this.fit * this.zoom
    const cosine = Math.cos(this.pitch)
    this.eye[0] = this.target[0] + distance * cosine * Math.sin(this.yaw)
    this.eye[1] = this.target[1] + distance * Math.sin(this.pitch)
    this.eye[2] = this.target[2] + distance * cosine * Math.cos(this.yaw)

    perspective(this.projection, (FIELD_OF_VIEW * Math.PI) / 180, aspect, distance * 0.02, distance * 12)
    lookAt(this.view, this.eye, this.target, [0, 1, 0])
    multiply(this.viewProjection, this.projection, this.view)

    // The section hatch is a screen-space pattern, so its pitch is a plain number of device pixels:
    // seven CSS pixels, whatever the ratio this display runs at.
    const ratio = this.canvas.width / Math.max(1, this.canvas.clientWidth)

    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    gl.clearColor(this.background[0], this.background[1], this.background[2], 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // Spheres: their own ink, mixed into the silhouette.
    gl.useProgram(this.sphere.program)
    this.setClipUniforms(this.sphere)
    gl.uniformMatrix4fv(this.sphere.uniforms.uViewProjection, false, this.viewProjection)
    gl.uniform3fv(this.sphere.uniforms.uEye, this.eye)
    gl.uniform3fv(this.sphere.uniforms.uLightKey, LIGHT_KEY)
    gl.uniform3fv(this.sphere.uniforms.uLightFill, LIGHT_FILL)
    gl.uniform1f(this.sphere.uniforms.uInkStrength, 0.72)
    gl.uniform1f(this.sphere.uniforms.uInkMix, this.inkMix)
    gl.uniform1f(this.sphere.uniforms.uHatchPitch, 7 * ratio)
    gl.bindVertexArray(this.sphereVao)
    gl.drawElementsInstanced(
      gl.TRIANGLES,
      this.sphereMesh.indices.length,
      gl.UNSIGNED_SHORT,
      0,
      this.atomCount,
    )

    // Bonds and the cell frame: one neutral ink for all of them.
    gl.useProgram(this.bond.program)
    this.setClipUniforms(this.bond)
    gl.uniformMatrix4fv(this.bond.uniforms.uViewProjection, false, this.viewProjection)
    gl.uniform3fv(this.bond.uniforms.uEye, this.eye)
    gl.uniform3fv(this.bond.uniforms.uLightKey, LIGHT_KEY)
    gl.uniform3fv(this.bond.uniforms.uLightFill, LIGHT_FILL)
    gl.uniform3f(this.bond.uniforms.uInk, 0.28, 0.33, 0.4)
    gl.uniform1f(this.bond.uniforms.uInkStrength, 0.5)
    gl.uniform1f(this.bond.uniforms.uInkMix, this.inkMix)
    gl.bindVertexArray(this.bondVao)
    gl.drawElementsInstanced(
      gl.TRIANGLES,
      this.cylinderMesh.indices.length,
      gl.UNSIGNED_SHORT,
      0,
      this.bondCount,
    )

    gl.bindVertexArray(null)
  }

  /** Called with the program already bound. */
  private setClipUniforms(program: Program): void {
    const gl = this.gl
    const margin = 0.015
    gl.uniform1i(program.uniforms.uClipOn, this.clip ? 1 : 0)
    gl.uniform1f(program.uniforms.uClipMargin, this.clip ? margin : 0)
    if (!this.clip) return
    gl.uniform3fv(program.uniforms.uReciprocalA, this.clip[0])
    gl.uniform3fv(program.uniforms.uReciprocalB, this.clip[1])
    gl.uniform3fv(program.uniforms.uReciprocalC, this.clip[2])
  }

  /* ------------------------------------------------------------------ input */

  private readonly resizeHandler = () => this.resize()

  private readonly onContextLost = (event: Event) => {
    event.preventDefault()
    this.lost = true
    this.stop()
  }

  private readonly onContextRestored = () => {
    this.lost = false
    this.init()
    this.upload()
    this.request()
  }

  private touch(): void {
    this.draggedAt = performance.now()
    this.settledAt = this.draggedAt
  }

  private localPoint(event: PointerEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  private readonly onPointerDown = (event: PointerEvent) => {
    this.engaged = true
    this.canvas.focus({ preventScroll: true })
    this.canvas.setPointerCapture(event.pointerId)
    this.pointers.set(event.pointerId, this.localPoint(event))
    this.pinch = this.pinchDistance()
    this.velocity = { yaw: 0, pitch: 0 }
    this.draggedAt = performance.now()
    this.request()
  }

  private readonly onPointerMove = (event: PointerEvent) => {
    const previous = this.pointers.get(event.pointerId)
    if (!previous) return
    const point = this.localPoint(event)
    this.pointers.set(event.pointerId, point)

    if (this.pointers.size >= 2) {
      const distance = this.pinchDistance()
      if (this.pinch > 0 && distance > 0) this.zoomBy(this.pinch / distance)
      this.pinch = distance
      return
    }

    const dx = point.x - previous.x
    const dy = point.y - previous.y
    const now = performance.now()
    const elapsed = Math.max(now - this.draggedAt, 8) / 1000

    this.yaw -= (dx * DRAG * Math.PI) / 180
    this.pitch = clamp(
      this.pitch + (dy * DRAG * Math.PI) / 180,
      -PITCH_LIMIT * (Math.PI / 180),
      PITCH_LIMIT * (Math.PI / 180),
    )
    // Radians per second at release, so a flick keeps turning for a moment.
    this.velocity = {
      yaw: this.velocity.yaw * 0.6 + ((-dx * DRAG * Math.PI) / 180 / elapsed) * 0.4,
      pitch: this.velocity.pitch * 0.6 + ((dy * DRAG * Math.PI) / 180 / elapsed) * 0.4,
    }
    this.draggedAt = now
    this.request()
  }

  private readonly onPointerUp = (event: PointerEvent) => {
    this.pointers.delete(event.pointerId)
    this.pinch = this.pinchDistance()
    if (!this.pointers.size) {
      const elapsed = performance.now() - this.draggedAt
      if (elapsed > 90) this.velocity = { yaw: 0, pitch: 0 }
      this.settledAt = performance.now()
      this.velocity.yaw = clamp(this.velocity.yaw, -3.2, 3.2)
      this.velocity.pitch = clamp(this.velocity.pitch, -2.2, 2.2)
    }
    this.request()
  }

  private readonly onWheel = (event: WheelEvent) => {
    // A reader scrolling the page past the viewer must not zoom it. The wheel only zooms once the
    // pointer has been used on the canvas, which is also when the hint stops being needed.
    if (!this.engaged) return
    event.preventDefault()
    const scale = event.deltaMode === 1 ? 16 : 1
    this.zoomBy(Math.exp(event.deltaY * scale * 0.0012))
  }

  private pinchDistance(): number {
    const points = [...this.pointers.values()]
    if (points.length < 2) return 0
    return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
