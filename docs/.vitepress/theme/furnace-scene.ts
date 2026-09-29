/**
 * The animated scene behind `FurnaceChemistry.vue`.
 *
 * It is a plain canvas model with no Vue in it, so the same code can be exercised from a scratch
 * page while the choreography is being tuned. Everything is drawn in a fixed 900 × 470 space and
 * the component scales that to the width the page gives it.
 *
 * Positions and opacities ease toward their targets rather than jumping, which is what makes an
 * atom that carries over from one stage to the next look like it travels. Bonds are only drawn
 * while their two atoms are within `BOND_LENGTH`, so a bond that belongs to a later stage does not
 * stretch across the panel while its atoms are still far apart.
 */

import {
  FURNACE_STAGES,
  MOLECULE_HALF,
  type ActorSpec,
  type AtomElement,
  type FurnaceStage,
  type Point,
} from './furnace-stages'

export const SCENE_W = 900
export const SCENE_H = 470

/** Longest bond drawn between two atoms, in scene units. */
const BOND_LENGTH = 130
/** Milliseconds within which an actor gets most of the way to its target. */
const TAU = 420
const ALPHA_TAU = 280
/** How close the pointer has to be to an actor for it to answer with its name. */
const PICK_RADIUS = 30

export interface Palette {
  text: string
  muted: string
  strip: string
  stripLine: string
  charge: string
  chargeHot: string
  bath: string
  bathHot: string
  sump: string
  sumpHot: string
  bond: string
  bubble: string
  droplet: string
  hot: string
  atomText: string
}

export const LIGHT: Palette = {
  text: '#1a202c',
  muted: '#4a5568',
  strip: '#f7fafc',
  stripLine: '#cbd5e0',
  charge: '#fefcbf',
  chargeHot: '#f6e05e',
  bath: '#fed7d7',
  bathHot: '#feb2b2',
  sump: '#c6f6d5',
  sumpHot: '#9ae6b4',
  bond: '#8a94a6',
  bubble: 'rgba(113, 128, 150, 0.55)',
  droplet: 'rgba(246, 173, 85, 0.55)',
  hot: '#dd6b20',
  atomText: '#1a202c',
}

export const DARK: Palette = {
  text: '#e2e8f0',
  muted: '#a0aec0',
  strip: '#232329',
  stripLine: '#4a5568',
  charge: 'rgba(183, 121, 31, 0.26)',
  chargeHot: 'rgba(237, 137, 54, 0.55)',
  bath: 'rgba(197, 48, 48, 0.24)',
  bathHot: 'rgba(197, 48, 48, 0.55)',
  sump: 'rgba(47, 133, 90, 0.24)',
  sumpHot: 'rgba(47, 133, 90, 0.55)',
  bond: '#718096',
  bubble: 'rgba(160, 174, 192, 0.5)',
  droplet: 'rgba(246, 173, 85, 0.4)',
  hot: '#ed8936',
  atomText: '#1a202c',
}

const ATOM_COLOURS = {
  Si: { fill: '#cfd8e3', line: '#7d8b9c', r: 21 },
  O: { fill: '#fed7d7', line: '#c53030', r: 15.5 },
  C: { fill: '#4a5568', line: '#1a202c', r: 17.5 },
} as const

const MOLECULE_COLOURS = {
  CO: { first: 'O', second: 'C' },
  SiO: { first: 'O', second: 'Si' },
} as const

/** What the pointer found, so the component can name it in the reader's language. */
export interface Pick {
  id: string
  kind: 'atom' | 'molecule'
  element?: AtomElement
  molecule?: 'CO' | 'SiO'
  /** Scene coordinates of the actor, so the tooltip can point at it. */
  x: number
  y: number
}

export interface Tooltip {
  text: string
  /** Scene coordinates the tip points at. */
  x: number
  y: number
}

interface Live {
  spec: ActorSpec
  x: number
  y: number
  tx: number
  ty: number
  alpha: number
  /** Absolute time (ms) before which the actor holds its position. */
  moveAt: number
  /** Absolute time (ms) before which an introduced actor stays invisible. */
  showAt: number
  /** Absolute time (ms) at which the actor starts to fade out; null while it stays. */
  hideAt: number | null
  radius: number
  targetRadius: number
  angle: number
}

interface Bubble {
  x: number
  y: number
  r: number
  vy: number
  alpha: number
}

const ease = (current: number, target: number, dt: number, tau: number) =>
  current + (target - current) * (1 - Math.exp(-dt / tau))

export class FurnaceScene {
  /**
   * Off for readers who asked for reduced motion: the bubbles and the breathing glow are pure
   * decoration, and a scene that snaps between stages should not still be spawning them.
   */
  motion = true

  /** Actor the pointer is on, drawn with a ring so the name has something to point at. */
  highlighted: string | null = null

  private live = new Map<string, Live>()
  private bubbles: Bubble[] = []
  private stageIndex = -1
  /** Absolute clock of the scene, in milliseconds. */
  private now = 0
  private spawnIn = 0

  get stage(): FurnaceStage | null {
    return this.stageIndex < 0 ? null : FURNACE_STAGES[this.stageIndex]
  }

  /**
   * Moves the scene to a stage. Actors the stage does not mention fade out; actors it shares with
   * the previous stage keep their position and travel to the new one.
   */
  enter(index: number) {
    const stage = FURNACE_STAGES[index]
    if (!stage) return
    this.stageIndex = index
    this.highlighted = null

    const declared = new Set(stage.actors.map((actor) => actor.id))
    for (const [id, actor] of this.live) {
      if (!declared.has(id)) actor.hideAt = this.now
    }

    for (const spec of stage.actors) {
      const existing = this.live.get(spec.id)
      if (existing) {
        existing.spec = spec
        existing.tx = spec.at.x
        existing.ty = spec.at.y
        existing.moveAt = this.now + (spec.delay ?? 0)
        existing.hideAt = spec.vanishAt === undefined ? null : this.now + spec.vanishAt
        if (spec.kind === 'blob') existing.targetRadius = spec.radius
        continue
      }

      const from: Point = spec.from ?? spec.at
      this.live.set(spec.id, {
        spec,
        x: from.x,
        y: from.y,
        tx: spec.at.x,
        ty: spec.at.y,
        alpha: 0,
        moveAt: this.now + (spec.delay ?? 0),
        showAt: this.now + (spec.appearAt ?? 0),
        hideAt: spec.vanishAt === undefined ? null : this.now + spec.vanishAt,
        radius: spec.kind === 'blob' ? (spec.fromRadius ?? spec.radius) : 0,
        targetRadius: spec.kind === 'blob' ? spec.radius : 0,
        angle: spec.kind === 'molecule' ? (spec.angle * Math.PI) / 180 : 0,
      })
    }
  }

  update(dt: number) {
    this.now += dt

    for (const [id, actor] of this.live) {
      if (this.now >= actor.moveAt) {
        actor.x = ease(actor.x, actor.tx, dt, TAU)
        actor.y = ease(actor.y, actor.ty, dt, TAU)
        actor.radius = ease(actor.radius, actor.targetRadius, dt, TAU)
      }

      const wanted =
        this.now < actor.showAt ? 0 : actor.hideAt !== null && this.now >= actor.hideAt ? 0 : 1
      actor.alpha = ease(actor.alpha, wanted, dt, ALPHA_TAU)

      // Only an actor that was sent away can be dropped; one that is merely waiting to appear must
      // stay in the cast, or it would be deleted before its cue.
      const dismissed = actor.hideAt !== null && this.now >= actor.hideAt
      if (dismissed && actor.alpha < 0.02) this.live.delete(id)
    }

    this.updateBubbles(dt)
  }

  private updateBubbles(dt: number) {
    const step = dt / 1000

    if (this.motion && this.stage?.exhaust) {
      this.spawnIn -= dt
      if (this.spawnIn <= 0) {
        this.spawnIn = 900 + Math.random() * 500
        if (this.bubbles.length < 14) {
          this.bubbles.push({
            x: 60 + Math.random() * 520,
            y: 430 + Math.random() * 30,
            r: 2.5 + Math.random() * 3,
            vy: -(28 + Math.random() * 18),
            alpha: 0.2 + Math.random() * 0.2,
          })
        }
      }
    }

    for (const bubble of this.bubbles) {
      bubble.y += bubble.vy * step
      bubble.x += Math.sin((this.now + bubble.y * 8) / 900) * 0.3
    }
    this.bubbles = this.bubbles.filter((bubble) => bubble.y > 30)
  }

  /** The actor under a scene-space point, if there is one. Formula tags do not answer. */
  pick(x: number, y: number): Pick | null {
    let best: { actor: Live; distance: number } | null = null

    for (const actor of this.live.values()) {
      const spec = actor.spec
      if (spec.kind !== 'atom' && spec.kind !== 'molecule') continue
      if (actor.alpha < 0.4) continue
      const reach = spec.kind === 'atom' ? ATOM_COLOURS[spec.element].r + PICK_RADIUS : 36
      const distance = Math.hypot(actor.x - x, actor.y - y)
      if (distance > reach) continue
      if (!best || distance < best.distance) best = { actor, distance }
    }

    const actor = best?.actor
    if (!actor) return null
    if (actor.spec.kind === 'atom') {
      return { id: actor.spec.id, kind: 'atom', element: actor.spec.element, x: actor.x, y: actor.y }
    }
    if (actor.spec.kind === 'molecule') {
      return {
        id: actor.spec.id,
        kind: 'molecule',
        molecule: actor.spec.molecule,
        x: actor.x,
        y: actor.y,
      }
    }
    return null
  }

  draw(ctx: CanvasRenderingContext2D, palette: Palette, tooltip: Tooltip | null = null) {
    this.drawMelt(ctx, palette)
    this.drawBlobs(ctx, palette)
    this.drawBubbles(ctx, palette)
    this.drawBonds(ctx, palette)
    this.drawAtoms(ctx, palette)
    this.drawLabels(ctx, palette)
    this.drawColumn(ctx, palette)
    if (tooltip) this.drawTooltip(ctx, palette, tooltip)
  }

  /* ------------------------------------------------------------- layers */

  private drawMelt(ctx: CanvasRenderingContext2D, palette: Palette) {
    if (!this.stage?.melt) return
    const top = 404

    const gradient = ctx.createLinearGradient(0, top, 0, SCENE_H)
    gradient.addColorStop(0, palette.droplet)
    gradient.addColorStop(1, 'rgba(246, 173, 85, 0)')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.moveTo(20, top)
    ctx.lineTo(600, top)
    ctx.lineTo(600, SCENE_H)
    ctx.lineTo(20, SCENE_H)
    ctx.closePath()
    ctx.fill()

    ctx.strokeStyle = palette.hot
    ctx.globalAlpha = 0.55
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(20, top)
    ctx.bezierCurveTo(160, top - 6, 300, top + 6, 460, top - 2)
    ctx.bezierCurveTo(520, top - 5, 570, top + 2, 600, top)
    ctx.stroke()
    ctx.globalAlpha = 1
  }

  private drawBlobs(ctx: CanvasRenderingContext2D, palette: Palette) {
    for (const actor of this.live.values()) {
      if (actor.spec.kind !== 'blob' || actor.alpha <= 0.03) continue
      const gradient = ctx.createRadialGradient(
        actor.x,
        actor.y,
        Math.max(actor.radius * 0.15, 1),
        actor.x,
        actor.y + actor.radius * 0.2,
        Math.max(actor.radius, 2),
      )
      gradient.addColorStop(0, palette.droplet)
      gradient.addColorStop(1, 'rgba(246, 173, 85, 0)')
      ctx.globalAlpha = actor.alpha
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(actor.x, actor.y, Math.max(actor.radius, 1), 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }

  private drawBonds(ctx: CanvasRenderingContext2D, palette: Palette) {
    const stage = this.stage
    if (!stage) return

    ctx.lineCap = 'round'
    for (const bond of stage.bonds) {
      const a = this.live.get(bond.a)
      const b = this.live.get(bond.b)
      if (!a || !b || a.alpha <= 0.03 || b.alpha <= 0.03) continue
      if (Math.hypot(a.x - b.x, a.y - b.y) > BOND_LENGTH) continue

      ctx.globalAlpha = Math.min(a.alpha, b.alpha) * 0.95
      ctx.strokeStyle = palette.bond
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }
    ctx.globalAlpha = 1
  }

  private drawAtoms(ctx: CanvasRenderingContext2D, palette: Palette) {
    for (const actor of this.live.values()) {
      if (actor.alpha <= 0.03) continue
      const spec = actor.spec
      ctx.globalAlpha = actor.alpha
      if (spec.kind === 'atom') {
        this.drawAtom(ctx, actor.x, actor.y, spec.element, palette)
      } else if (spec.kind === 'molecule') {
        this.drawMolecule(ctx, actor.x, actor.y, spec.molecule, actor.angle, palette)
      }
      if (this.highlighted === spec.id) {
        ctx.strokeStyle = palette.hot
        ctx.lineWidth = 2.5
        ctx.setLineDash([5, 4])
        ctx.beginPath()
        ctx.arc(actor.x, actor.y, (spec.kind === 'atom' ? ATOM_COLOURS[spec.element].r : 30) + 9, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])
      }
    }
    ctx.globalAlpha = 1
  }

  private drawAtom(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    element: AtomElement,
    palette: Palette,
  ) {
    const colours = ATOM_COLOURS[element]
    ctx.beginPath()
    ctx.arc(x, y, colours.r, 0, Math.PI * 2)
    ctx.fillStyle = colours.fill
    ctx.fill()
    ctx.lineWidth = 2.5
    ctx.strokeStyle = colours.line
    ctx.stroke()

    ctx.fillStyle = element === 'C' ? '#ffffff' : palette.atomText
    ctx.font = '600 15px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(element, x, y + 0.5)
  }

  private drawMolecule(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    molecule: 'CO' | 'SiO',
    angle: number,
    palette: Palette,
  ) {
    const ux = Math.cos(angle)
    const uy = Math.sin(angle)
    const first = { x: x + ux * MOLECULE_HALF, y: y + uy * MOLECULE_HALF }
    const second = { x: x - ux * MOLECULE_HALF, y: y - uy * MOLECULE_HALF }

    // A double line, offset perpendicular to the axis.
    const px = -uy * 3.2
    const py = ux * 3.2
    ctx.strokeStyle = palette.bond
    ctx.lineWidth = 2.2
    for (const sign of [-1, 1]) {
      ctx.beginPath()
      ctx.moveTo(first.x + px * sign, first.y + py * sign)
      ctx.lineTo(second.x + px * sign, second.y + py * sign)
      ctx.stroke()
    }

    const definition = MOLECULE_COLOURS[molecule]
    this.drawAtom(ctx, first.x, first.y, definition.first, palette)
    this.drawAtom(ctx, second.x, second.y, definition.second, palette)

    // The formula, so the two circles are never just two circles.
    ctx.font = '600 16px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
    ctx.fillStyle = palette.muted
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(molecule, x, y + 56)
  }

  private drawLabels(ctx: CanvasRenderingContext2D, palette: Palette) {
    for (const actor of this.live.values()) {
      if (actor.spec.kind !== 'label' || actor.alpha <= 0.03) continue
      ctx.globalAlpha = actor.alpha
      ctx.font = '600 17px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
      ctx.fillStyle = palette.muted
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(actor.spec.text, actor.x, actor.y)
    }
    ctx.globalAlpha = 1
  }

  private drawBubbles(ctx: CanvasRenderingContext2D, palette: Palette) {
    ctx.strokeStyle = palette.bubble
    ctx.lineWidth = 1.5
    for (const bubble of this.bubbles) {
      ctx.globalAlpha = Math.max(0, Math.min(1, (bubble.alpha * (bubble.y - 20)) / 380))
      ctx.beginPath()
      ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.globalAlpha = 1
  }

  /* ------------------------------------------------------- column strip */

  private drawColumn(ctx: CanvasRenderingContext2D, palette: Palette) {
    const stage = this.stage
    const zone = stage?.zone ?? 'charge'

    const x0 = 664
    const x1 = 878
    const chargeTop = 74
    const chargeBottom = 212
    const bathBottom = 350
    const sumpBottom = 420

    ctx.fillStyle = palette.strip
    ctx.strokeStyle = palette.stripLine
    ctx.lineWidth = 1.6
    this.roundRect(ctx, x0, chargeTop, x1 - x0, sumpBottom - chargeTop, 10)
    ctx.fill()
    ctx.stroke()

    const band = (
      top: number,
      bottom: number,
      fill: string,
      hot: string,
      active: boolean,
    ) => {
      ctx.fillStyle = active ? hot : fill
      this.roundRect(ctx, x0 + 8, top, x1 - x0 - 16, bottom - top, 7)
      ctx.fill()
      if (active) {
        // A ring in the accent colour, so which zone the beat happens in is never a guess.
        ctx.strokeStyle = palette.hot
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    // Charge at the top, the reaction bath below it, the metal pool at the bottom.
    band(chargeTop + 8, chargeBottom, palette.charge, palette.chargeHot, zone === 'charge' || zone === 'return' || zone === 'rise')
    band(chargeBottom + 4, bathBottom, palette.bath, palette.bathHot, zone === 'bath' || zone === 'rise')
    band(bathBottom + 4, sumpBottom - 8, palette.sump, palette.sumpHot, false)

    ctx.textBaseline = 'alphabetic'
    ctx.textAlign = 'left'
    ctx.font = '600 17px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
    ctx.fillStyle = zone === 'charge' || zone === 'return' ? palette.hot : palette.muted
    ctx.fillText('~1600 \u00b0C', x0 + 20, chargeTop + 34)

    ctx.fillStyle = zone === 'bath' || zone === 'rise' ? palette.hot : palette.muted
    ctx.fillText('> 1780 \u00b0C', x0 + 20, chargeBottom + 32)

    ctx.textAlign = 'center'
    ctx.fillStyle = palette.text
    ctx.fillText('Si (l)', (x0 + x1) / 2, sumpBottom - 22)

    // Off-gas leaving through the top of the vessel.
    ctx.fillStyle = palette.strip
    ctx.strokeStyle = palette.stripLine
    ctx.lineWidth = 1.6
    ctx.beginPath()
    ctx.rect((x0 + x1) / 2 - 26, 46, 52, chargeTop - 42)
    ctx.fill()
    ctx.stroke()

    this.arrow(ctx, (x0 + x1) / 2, 44, (x0 + x1) / 2, 18, palette.bond, 2)

    ctx.fillStyle = palette.muted
    ctx.font = '600 15px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText('CO + SiO', x1 - 4, 26)

    // Which way the material moves in this beat.
    const axisX = x1 - 24
    if (zone === 'rise') {
      this.arrow(ctx, axisX, bathBottom - 26, axisX, chargeTop + 30, palette.hot, 2.6)
    } else if (zone === 'return') {
      this.arrow(ctx, axisX, chargeTop + 26, axisX, chargeBottom - 14, palette.hot, 2.6)
    }
  }

  private drawTooltip(ctx: CanvasRenderingContext2D, palette: Palette, tooltip: Tooltip) {
    ctx.font = '600 16px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
    const width = ctx.measureText(tooltip.text).width + 22
    const height = 32
    const x = Math.min(Math.max(tooltip.x - width / 2, 8), SCENE_W - width - 8)
    const y = Math.max(tooltip.y - 74, 8)

    ctx.fillStyle = palette.strip
    ctx.strokeStyle = palette.stripLine
    ctx.lineWidth = 1.4
    this.roundRect(ctx, x, y, width, height, 8)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = palette.text
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(tooltip.text, x + width / 2, y + height / 2 + 0.5)
  }

  private arrow(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    colour: string,
    width: number,
  ) {
    const head = 6
    const direction = Math.sign(y2 - y1) || 1
    ctx.strokeStyle = colour
    ctx.fillStyle = colour
    ctx.lineWidth = width
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2 - direction * head)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x2 - head, y2 - direction * head * 1.9)
    ctx.lineTo(x2, y2)
    ctx.lineTo(x2 + head, y2 - direction * head * 1.9)
    ctx.closePath()
    ctx.fill()
  }

  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ) {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
  }
}
