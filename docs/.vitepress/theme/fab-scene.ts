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

import { STAGE_DURATION, type FabMode, type FabReadout } from './fab-stages'

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

/** The three openings the mask carries, shared by lithography and etching. */
const WIN = [
  { a: 268, b: 328 },
  { a: 420, b: 480 },
  { a: 572, b: 632 },
]

/** The trench the ALD film is laid into, in deposition. */
const TRENCH = { a: 398, b: 502, depth: 112 }

/** Share of an oxide's thickness that lies below the original surface (Si density 2.33, SiO₂ 2.27). */
const CONSUMED = 0.456

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
        const points = Math.round(clamp01((s - 1) / 5.5) * 96)
        return [
          { id: 'film', value: '3.10 nm' },
          { id: 'points', value: `${points}` },
          { id: 'precision', value: '±0.02 nm' },
        ]
      }
    }
  }

  /* ------------------------------------------------------------ stage models */

  private growthHours(s: number): number {
    return span(s, 0.5, 6.5) * 1
  }

  private aldCycles(s: number): number {
    return Math.min(24, Math.floor(Math.max(0, s - 0.5) / 0.3))
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

  private coatReadout(s: number): FabReadout[] {
    const nm = Math.round(this.resistNm(s))
    if (s < 1.6) return [{ id: 'spin', value: '0 rpm' }, { id: 'resist', value: `${nm} nm` }]
    if (s < 4.6) {
      return [{ id: 'spin', value: `${this.spinRpm(s)} rpm` }, { id: 'resist', value: `${nm} nm` }]
    }
    if (s < 6.2) return [{ id: 'bake', value: '95 °C' }, { id: 'resist', value: `${nm} nm` }]
    if (s < 8.8) return [{ id: 'wavelength', value: '193 nm' }, { id: 'dose', value: '30 mJ/cm²' }]
    return [{ id: 'cd', value: '45 nm' }, { id: 'resist', value: `${nm} nm` }]
  }

  private etchDepthNm(s: number): number {
    return span(s, 1.2, 5.6) * 122
  }

  /* --------------------------------------------------------------- primitives */

  private rect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string, stroke?: string, lw = 1.6) {
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

  private poly(ctx: CanvasRenderingContext2D, pts: Array<[number, number]>, fill: string, stroke?: string, lw = 1.6) {
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

  /** A rounded rectangle, used for the phase strip's pills. */
  private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    const rad = Math.min(r, h / 2, w / 2)
    ctx.beginPath()
    ctx.moveTo(x + rad, y)
    ctx.lineTo(x + w - rad, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + rad)
    ctx.lineTo(x + w, y + h - rad)
    ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h)
    ctx.lineTo(x + rad, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - rad)
    ctx.lineTo(x, y + rad)
    ctx.quadraticCurveTo(x, y, x + rad, y)
    ctx.closePath()
  }

  /** The strip of sub-steps along the bottom, with the one running now lit. */
  private phaseStrip(ctx: CanvasRenderingContext2D, p: Palette, steps: string[], active: number) {
    let x = X0
    const y = BASE + 26
    for (let i = 0; i < steps.length; i += 1) {
      ctx.font = `600 13px ${FONT}`
      const w = ctx.measureText(steps[i]).width + 22
      const on = i === active
      this.roundRect(ctx, x, y - 12, w, 24, 12)
      ctx.fillStyle = on ? p.good : p.panel
      ctx.fill()
      ctx.strokeStyle = on ? p.good : p.panelLine
      ctx.lineWidth = 1.2
      ctx.stroke()
      this.text(ctx, steps[i], x + w / 2, y, on ? p.panel : p.muted, 13)
      x += w + 6
    }
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
    this.phaseStrip(ctx, p, ['heat', 'linear', 'parabolic'], s < 0.5 ? 0 : nm < DG.wet.A * 1000 ? 1 : 2)
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
    const f = cycles * 0.79
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

    // The showerhead above the wafer, its nozzles brightening on each precursor pulse.
    this.rect(ctx, 236, 74, 428, 20, p.mask, p.panelLine)
    const cyc = this.motion ? (Math.max(0, s - 0.5) / 0.3) % 1 : 0
    const pulse = this.motion ? (cyc < 0.45 ? 1 : 0.3) : 0.9
    for (let x = 262; x <= 640; x += 42) this.dot(ctx, x, 100, 3.2, p.filmLine, 0.85 * pulse)

    // Precursor falling from the head onto the field and into the trench.
    if (this.motion) {
      const drops = 22
      for (let i = 0; i < drops; i += 1) {
        const phase = (((s * 0.5 + i / drops) % 1) + 1) % 1
        const px = 250 + ((i * 89) % 400)
        const inTrench = px > a && px < b
        const target = inTrench ? floor : SUF
        const y = 106 + phase * (target - 118)
        this.dot(ctx, px, y, 2.8, p.filmLine, 0.9 * (1 - Math.max(0, (phase - 0.9) / 0.1)))
      }
    }

    // The substrate, then the ALD film as a true conformal coat: the surface polyline stroked at
    // width 2f, clipped to the vacuum, so the half that would fall inside the silicon is thrown
    // away and wall, floor and top all come out the same thickness.
    this.poly(ctx, below, p.si, p.siLine)
    this.rect(ctx, X0, SUF - 14, a - X0, 14, p.oxide, p.oxideLine)
    this.rect(ctx, b, SUF - 14, X1 - b, 14, p.oxide, p.oxideLine)

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
    }

    this.text(ctx, 'ALD film', X1 - 8, SUF - f - 16, p.muted, 15, 'right')
    this.lead(ctx, X1 - 26, SUF - f - 10, X1 - 60, SUF - f / 2, p.faint)
    this.text(ctx, 'Si', a - 34, BASE - 24, p.muted, 16, 'right')
    this.text(ctx, 'SiO₂', X0 + 22, SUF - 7, p.muted, 13, 'left')

    this.dimV(ctx, b + 26, floor - f, floor, `${(cycles * 0.11).toFixed(2)} nm`, p.muted)
    this.scaleBar(ctx, p, 36, '5 nm')
    this.caption(ctx, p, `ALD · cycle ${cycles}`)
  }

  /* ------------------------------------------------------------ 3. lithography */

  private drawCoat(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const stackTop = SUF - 22 // oxide (14) + deposited film (8) already on the wafer
    const nm = this.resistNm(s)
    const shrink = s > 4.6 ? lerp(1, 0.9, span(s, 4.6, 6.0)) : 1
    const rPx = clamp(nm * 0.03 * shrink, 8, 62)

    // The stack the resist sits on.
    this.silicon(ctx, p, SUF)
    this.rect(ctx, X0, SUF - 14, VW, 14, p.oxide, p.oxideLine)
    this.rect(ctx, X0, stackTop, VW, 8, p.film, p.filmLine)

    // 1. Dispense: a drop falls from the nozzle and pools at the centre.
    if (s < 1.6) {
      this.rect(ctx, 400, 82, 100, 12, p.mask, p.panelLine)
      this.rect(ctx, 448, 94, 5, 60, p.mask)
      const dy = lerp(104, stackTop - 10, span(s, 0.1, 1.0))
      ctx.save()
      ctx.fillStyle = p.resist
      ctx.strokeStyle = p.resistLine
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.arc(450, dy, 9, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.restore()
      const pool = span(s, 0.9, 1.6)
      if (pool > 0) {
        ctx.save()
        ctx.globalAlpha = pool
        ctx.beginPath()
        ctx.ellipse(450, stackTop - 4, 62 * pool, 22 * pool, 0, 0, Math.PI * 2)
        ctx.fillStyle = p.resist
        ctx.fill()
        ctx.restore()
      }
    }

    // 2–3. The spun film, spreading and thinning, then baked dry.
    if (s >= 1.6) {
      const spread = span(s, 1.6, 4.2)
      const w = lerp(130, VW, spread)
      this.rect(ctx, 450 - w / 2, stackTop - rPx, w, rPx, p.resist, p.resistLine)
      if (s < 4.6 && this.motion) {
        for (let i = 0; i < 5; i += 1) {
          const sx = X0 + 40 + i * 140
          this.lead(ctx, sx, stackTop - 6, sx + 40, stackTop + 6, p.resistLine)
        }
        this.text(ctx, `${this.spinRpm(s)} rpm`, 450, stackTop - rPx - 22, p.good, 15)
      }
      this.text(ctx, 'photoresist', X0 + 4, stackTop - rPx - 16, p.muted, 14, 'left')
    }

    // 4. Soft bake.
    if (s > 4.6 && s < 6.4) {
      const heat = span(s, 4.6, 5.0) * (1 - span(s, 6.0, 6.4))
      this.glowBand(ctx, X0, BASE - 30, VW, 62, p, heat)
      this.rect(ctx, X0 - 34, BASE - 4, VW + 68, 8, p.heat)
      this.text(ctx, '95 °C', 450, BASE + 26, p.heat, 15)
    }

    // 5. Mask descends, and the beams print the openings.
    const maskY = lerp(96, stackTop - rPx - 34, span(s, 6.2, 7.4))
    if (s > 6.2) {
      this.rect(ctx, 232, maskY, 436, 16, p.mask)
      for (const w of WIN) ctx.clearRect(w.a, maskY, w.b - w.a, 16)
      const lit = span(s, 7.4, 7.8) * (1 - span(s, 8.8, 9.4))
      for (const w of WIN) {
        ctx.save()
        ctx.globalAlpha = lit
        const g = ctx.createLinearGradient(0, maskY + 16, 0, stackTop - rPx)
        g.addColorStop(0, 'rgba(128, 90, 213, 0.55)')
        g.addColorStop(1, 'rgba(128, 90, 213, 0.10)')
        ctx.fillStyle = g
        ctx.fillRect(w.a, maskY + 16, w.b - w.a, stackTop - rPx - (maskY + 16))
        ctx.restore()
      }
      this.text(ctx, 'mask', 232, maskY - 12, p.muted, 14, 'left')
    }

    // The exposed resist of a positive tone is the part that will dissolve.
    const expo = span(s, 7.4, 8.0) * (1 - span(s, 8.8, 9.8))
    if (expo > 0.02) {
      for (const w of WIN) {
        ctx.save()
        ctx.globalAlpha = expo
        this.rect(ctx, w.a, stackTop - rPx, w.b - w.a, rPx, p.exposed, p.resistLine, 1)
        ctx.restore()
      }
    }

    // 6. Develop: the exposed resist dissolves from the top down, leaving the openings.
    if (s >= 8.8) {
      const gone = span(s, 8.8, 9.8)
      // Clearing the band is what makes a real opening: it takes the resist away and leaves vacuum
      // over the film, so the mask the next module etches through is the complement of the windows.
      for (const w of WIN) ctx.clearRect(w.a, stackTop - rPx, w.b - w.a, rPx * gone)
      if (gone > 0.3 && this.motion) {
        for (const w of WIN) {
          for (let k = 0; k < 3; k += 1) {
            this.dot(ctx, (w.a + w.b) / 2 + (k - 1) * 14, stackTop + 8, 2.6, p.good, gone)
          }
        }
      }
    }

    this.text(ctx, 'Si', X0 + 26, BASE - 24, p.muted, 16, 'left')
    this.scaleBar(ctx, p, 60, '2 µm')
    this.phaseStrip(ctx, p, ['dispense', 'spin coat', 'soft bake', 'expose', 'develop'], s < 1.6 ? 0 : s < 4.6 ? 1 : s < 6.2 ? 2 : s < 8.8 ? 3 : 4)
  }

  /* ------------------------------------------------------------------ 4. etch */

  private drawEtch(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const depthNm = this.etchDepthNm(s)
    const depth = depthNm * 0.9
    const maskH = 26
    const maskTop = SUF - maskH

    // Plasma and the ions it accelerates at the wafer.
    const on = span(s, 0.2, 1.0)
    ctx.save()
    ctx.globalAlpha = on
    const g = ctx.createLinearGradient(0, 60, 0, maskTop)
    g.addColorStop(0, 'rgba(79, 209, 197, 0.05)')
    g.addColorStop(1, 'rgba(79, 209, 197, 0.38)')
    ctx.fillStyle = g
    ctx.fillRect(X0 - 20, 60, VW + 40, maskTop - 60)
    ctx.restore()

    if (this.motion) {
      for (let i = 0; i < 30; i += 1) {
        const phase = (((s * 1.1 + i / 30) % 1) + 1) % 1
        const x = X0 + 20 + ((i * 71) % (VW - 40))
        const y = maskTop - phase * (maskTop - 70)
        this.dot(ctx, x, y, 2.4, p.filmLine, on * 0.85)
      }
    }

    // The trenches, cut only where the mask opened.
    this.silicon(ctx, p, SUF)
    if (depth > 1) {
      for (const w of WIN) {
        ctx.clearRect(w.a, SUF, w.b - w.a, depth)
        this.line(ctx, w.a, SUF, w.a, SUF + depth, p.siLine, 1.4)
        this.line(ctx, w.b, SUF, w.b, SUF + depth, p.siLine, 1.4)
        this.line(ctx, w.a, SUF + depth, w.b, SUF + depth, p.siLine, 1.4)
      }
    }

    // The mask, worn down by the ions that miss it: at 20:1 selectivity it loses a twentieth of the
    // depth the silicon does, which is why a thin mask can cut a deep trench.
    const worn = Math.min(5, depth / 20)
    const mTop = maskTop + worn
    let cursor = X0
    for (const w of WIN) {
      this.rect(ctx, cursor, mTop, w.a - cursor, maskH - worn, p.metal, p.metalLine)
      cursor = w.b
    }
    this.rect(ctx, cursor, mTop, X1 - cursor, maskH - worn, p.metal, p.metalLine)

    // The ghost of an isotropic wet etch: it would have undercut the mask.
    const ghost = span(s, 3.4, 5.2)
    if (ghost > 0.02) {
      const w = WIN[2]
      const cxm = (w.a + w.b) / 2
      const rad = (w.b - w.a) / 2
      ctx.save()
      ctx.globalAlpha = ghost * 0.6
      ctx.strokeStyle = p.alert
      ctx.lineWidth = 1.6
      ctx.setLineDash([5, 4])
      ctx.beginPath()
      ctx.arc(cxm, SUF, rad + 16, 0, Math.PI)
      ctx.stroke()
      ctx.restore()
      this.text(ctx, 'wet etch undercuts', cxm - rad - 6, SUF + 12, p.alert, 13, 'right')
    }

    this.text(ctx, 'mask', X0 - 6, mTop + (maskH - worn) / 2, p.muted, 14, 'right')
    this.text(ctx, 'Si', X0 + 26, BASE - 24, p.muted, 16, 'left')
    if (depth > 20) this.dimV(ctx, X1 + 12, SUF, SUF + depth, `${Math.round(depthNm)} nm`, p.muted)
    this.scaleBar(ctx, p, 45, '50 nm')
    this.phaseStrip(ctx, p, ['etch', 'overetch'], s < 5.6 ? 0 : 1)
  }

  /* --------------------------------------------------------------- 5. implant */

  private drawImplant(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const win = WIN[1]
    const cxm = (win.a + win.b) / 2
    const maskH = 30
    const maskTop = SUF - maskH

    // The resisted wafer, with one window open over the junction.
    this.silicon(ctx, p, SUF)
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
    const dx = (SUF - topY) * Math.tan(tilt)
    const beamOn = 1 - span(s, 5.4, 5.9)
    ctx.save()
    ctx.globalAlpha = 0.42 * beamOn
    ctx.fillStyle = p.beam
    ctx.beginPath()
    ctx.moveTo(cxm - dx - bw, topY)
    ctx.lineTo(cxm - dx + bw, topY)
    ctx.lineTo(cxm + bw, SUF)
    ctx.lineTo(cxm - bw, SUF)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    if (this.motion && s < 5.6) {
      for (let i = 0; i < 16; i += 1) {
        const phase = (((s * 1.6 + i / 16) % 1) + 1) % 1
        const y = topY + phase * (SUF - topY)
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
    this.text(ctx, '7°', cxm - dx - bw - 12, (topY + SUF) / 2, p.beam, 16, 'right')
    this.text(ctx, 'Si', X1 - 26, BASE - 24, p.muted, 16, 'right')

    this.profileInset(ctx, p, s)
    this.scaleBar(ctx, p, 45, '50 nm')
    this.phaseStrip(ctx, p, ['implant', 'anneal'], s < 5.9 ? 0 : 1)
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
    const flat = span(s, 0.6, 6.0)
    // 180 nm of relief, drawn at the same 0.19 px/nm the scale bar uses.
    const relief = (1 - flat) * 180 * 0.19

    // A patterned surface: a wide raised feature and a dense pair of ridges.
    const raised: Array<[number, number]> = [
      [286, 404],
      [440, 472],
      [492, 524],
    ]
    const surfaceOf = (x: number) => (raised.some(([a, b]) => x >= a && x <= b) ? SUF - relief : SUF)

    this.silicon(ctx, p, SUF)
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(X0, SUF)
    for (let x = X0; x <= X1; x += 4) ctx.lineTo(x, surfaceOf(x))
    ctx.lineTo(X1, SUF)
    ctx.closePath()
    ctx.fillStyle = p.si
    ctx.fill()
    ctx.strokeStyle = p.siLine
    ctx.lineWidth = 1.6
    ctx.stroke()
    ctx.restore()

    // The pad, turning, pressing on the relief, with the slurry between it and the wafer.
    const padY = SUF - relief - 46
    this.rect(ctx, 250, padY, 400, 34, p.mask, p.panelLine)
    for (let i = 0; i < 9; i += 1) {
      const off = (s * 60 + i * 44) % 400
      this.line(ctx, 250 + off, padY + 27, 250 + off + 10, padY + 7, p.faint, 1.4)
    }
    this.text(ctx, 'pad', 450, padY - 12, p.muted, 14)
    this.arrowDown(ctx, 450, padY - 40, padY - 8, p.good, 2.4)
    this.text(ctx, 'down force', 470, padY - 24, p.good, 13, 'left')

    for (let i = 0; i < 26; i += 1) {
      if (!this.motion) break
      const phase = (i / 26 + s * 0.12) % 1
      const x = X0 + 20 + ((i * 93) % (VW - 40))
      this.dot(ctx, x, SUF - relief - 6 - phase * 42, 2.2, p.cu, 0.5 * (1 - phase))
    }

    // Once the relief is gone, dishing and erosion show up where the pattern is wide or dense.
    const late = span(s, 6.0, 7.6)
    if (late > 0.02) {
      ctx.save()
      ctx.globalAlpha = late
      ctx.beginPath()
      ctx.ellipse(345, SUF - 3, 62, 9, 0, 0, Math.PI * 2)
      ctx.fillStyle = p.panel
      ctx.fill()
      ctx.restore()
      this.lead(ctx, 345, SUF - 12, 286, 214, p.faint)
      this.text(ctx, 'dishing', 280, 210, p.muted, 13, 'right')

      ctx.save()
      ctx.globalAlpha = late
      ctx.fillStyle = p.panel
      ctx.fillRect(440, SUF - 4, 84, 9)
      ctx.restore()
      this.lead(ctx, 482, SUF - 12, 520, 214, p.faint)
      this.text(ctx, 'erosion', 526, 210, p.muted, 13, 'left')
    }

    this.text(ctx, 'Si', X0 + 26, BASE - 24, p.muted, 16, 'left')
    this.scaleBar(ctx, p, 38, '200 nm')
    this.phaseStrip(ctx, p, ['polish', 'overpolish'], s < 6.0 ? 0 : 1)
  }

  /* -------------------------------------------------------------- 7. metrology */

  private drawMeasure(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
    const film = 22
    const top = SUF - film
    this.silicon(ctx, p, SUF)
    this.rect(ctx, X0, top, VW, film, p.film, p.filmLine)

    const sweep = clamp01((s - 1) / 5.5)
    // The head stays left of the map inset, so the beam never slides behind the panel.
    const spotX = lerp(X0 + 60, 600, sweep)

    // The head, the incident beam and the two reflections an ellipsometer works from.
    const angle = (68 * Math.PI) / 180
    const len = 150
    const inX = spotX - Math.cos(angle) * len
    const inY = top - Math.sin(angle) * len
    this.rect(ctx, inX - 34, inY - 26, 44, 26, p.mask, p.panelLine)
    this.line(ctx, inX, inY, spotX, top, p.good, 2.4)
    this.line(ctx, spotX, top, spotX + Math.cos(angle) * len, top - Math.sin(angle) * len, p.good, 2.4)
    this.line(ctx, spotX, top, spotX + Math.cos(angle) * (len - 14), top - Math.sin(angle) * (len - 14), p.beam, 1.6)
    this.text(ctx, 'ellipsometer', inX - 22, inY - 32, p.muted, 13, 'right')

    // The measurement point lights up where the beam lands.
    this.dot(ctx, spotX, top + film / 2, 5, p.good, 0.9)
    this.line(ctx, spotX, top - 6, spotX, SUF + 16, p.good, 1.2, [3, 3])

    // The run-to-run loop: the measurement goes back into the process.
    const loop = span(s, 3.5, 5.5)
    if (loop > 0.02) {
      ctx.save()
      ctx.globalAlpha = loop * 0.85
      ctx.strokeStyle = p.good
      ctx.lineWidth = 2
      ctx.setLineDash([6, 5])
      ctx.beginPath()
      ctx.arc(450, 152, 122, Math.PI * 1.05, Math.PI * 1.95)
      ctx.stroke()
      ctx.restore()
      this.text(ctx, 'run-to-run', 450, 20, p.good, 14)
    }

    this.mapInset(ctx, p, s)

    this.text(ctx, 'film', X1 - 26, top + film / 2, p.muted, 16, 'right')
    this.text(ctx, 'Si', X0 + 26, BASE - 24, p.muted, 16, 'left')
    this.dimV(ctx, X1 + 12, top, SUF, '3.1 nm', p.muted)
    this.scaleBar(ctx, p, 36, '5 nm')
    this.phaseStrip(ctx, p, ['sweep', 'run-to-run'], s < 3.5 ? 0 : 1)
  }

  /** What the ellipsometer is really producing: a thickness map of the wafer, built point by point. */
  private mapInset(ctx: CanvasRenderingContext2D, p: Palette, s: number) {
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
    const shown = Math.round(clamp01((s - 1) / 5.5) * N)
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
