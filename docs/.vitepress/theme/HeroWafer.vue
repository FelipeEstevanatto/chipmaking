<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useIsEnglish } from './locale'

/**
 * The hero drawing: a polished wafer with its die grid, a few dies picked out in copper.
 *
 * Same language as the favicon: one disc, one grid, one gloss sweep. The site's mark and its
 * landing page are the same object at two sizes. Inline SVG rather than a bitmap: it stays sharp
 * at any size and does not glare on the dark theme the way a white-background photo does.
 *
 * With a mouse in the hero section the drawing behaves like a physical disc: it tips in 3D towards
 * the pointer, the gloss sweep travels across the face with a little parallax, and the shadow
 * leans the other way. The pointer is read against the whole hero, not just the drawing, so the
 * disc answers the cursor over the headline, the tagline and the buttons too. Touch pointers are
 * ignored so a scroll never tips it, and `prefers-reduced-motion` leaves the drawing flat.
 *
 * One requestAnimationFrame loop drives the pose: a pointer event only records where the pointer
 * is, and the loop eases the drawing towards it by a fixed time constant. That keeps the follow
 * tight while the pointer moves, smooth across frame rates, and away from the two things that made
 * it judder before — a CSS transition restarting on every event, and a `drop-shadow` filter whose
 * offsets changed per frame. The shadow is now its own layer that only ever moves by `transform`,
 * so its blur rasterises once.
 */

const isEnglish = useIsEnglish()

const label = computed(() =>
  isEnglish.value
    ? 'Silicon wafer with its die grid, a few dies highlighted'
    : 'Wafer de silício com a grade de dies, alguns destacados',
)

/** Degrees of tilt at the edge of the hero; the highlight travels in viewBox units, the shadow in pixels. */
const MAX_TILT = 22
const SHINE_TRAVEL = 54
const SHADOW_TRAVEL = 34
const LEAN_TRAVEL = 12

/** Seconds the pose takes to close ~63% of the distance to the pointer; smaller tracks tighter. */
const FOLLOW_TAU = 0.06
/** Values closer than this snap to the target, which lets the loop stop. */
const SNAP = 0.05
/** A stalled frame (hidden tab, slow paint) must not teleport the drawing. */
const MAX_FRAME = 0.064

interface Pose {
  rotateX: number
  rotateY: number
  shineX: number
  shineY: number
  shadowX: number
  shadowY: number
  leanX: number
  leanY: number
}

const POSE_KEYS: (keyof Pose)[] = [
  'rotateX',
  'rotateY',
  'shineX',
  'shineY',
  'shadowX',
  'shadowY',
  'leanX',
  'leanY',
]

const REST: Pose = {
  rotateX: 0,
  rotateY: 0,
  shineX: 0,
  shineY: 0,
  shadowX: 0,
  shadowY: 0,
  leanX: 0,
  leanY: 0,
}

const svgRef = ref<SVGSVGElement | null>(null)
const pose = reactive<Pose>({ ...REST })
const target: Pose = { ...REST }

let frame: HTMLElement | null = null
let frameRect: DOMRect | null = null
let hovering = false
let raf = 0
let previous = 0

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function measure() {
  frameRect = frame ? frame.getBoundingClientRect() : null
}

function isSettled() {
  return POSE_KEYS.every((key) => Math.abs(target[key] - pose[key]) < SNAP)
}

function start() {
  if (raf || isSettled()) return
  previous = performance.now()
  raf = requestAnimationFrame(step)
}

function step(now: number) {
  const delta = Math.max(0, Math.min((now - previous) / 1000, MAX_FRAME))
  previous = now
  const blend = 1 - Math.exp(-delta / FOLLOW_TAU)
  let done = true

  for (const key of POSE_KEYS) {
    const gap = target[key] - pose[key]
    if (Math.abs(gap) > SNAP) done = false
    pose[key] += gap * blend
  }

  if (done) {
    Object.assign(pose, target)
    raf = 0
    return
  }

  raf = requestAnimationFrame(step)
}

function onPointerMove(event: PointerEvent) {
  // A finger or a stylus would tip the drawing while the page scrolls; only a mouse can hover.
  if (event.pointerType !== 'mouse' || prefersReducedMotion()) return

  // A move over the hero means the pointer is inside it, even if `pointerenter` was missed
  // because the cursor was already sitting there when the page loaded.
  hovering = true

  // The hero box only moves on resize or scroll, so it is measured there and reused here.
  if (!frameRect) measure()
  const rect = frameRect
  if (!rect || rect.width === 0 || rect.height === 0) return

  const clamp = (value: number) => Math.max(-1, Math.min(1, value))
  const x = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1)
  const y = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1)

  // The side under the pointer lifts: -x brings the right edge forward, -y brings the top edge forward.
  target.rotateY = -x * MAX_TILT
  target.rotateX = -y * MAX_TILT
  target.shineX = x * SHINE_TRAVEL
  target.shineY = y * SHINE_TRAVEL * 0.7
  target.shadowX = -x * SHADOW_TRAVEL
  target.shadowY = -y * SHADOW_TRAVEL * 0.6
  target.leanX = x * LEAN_TRAVEL
  target.leanY = y * LEAN_TRAVEL * 0.7

  start()
}

function onPointerEnter() {
  hovering = true
  measure()
}

function onPointerLeave() {
  hovering = false
  frameRect = null
  Object.assign(target, REST)
  start()
}

function onViewportChange() {
  if (hovering) measure()
}

/**
 * The pointer listens on the hero section rather than the svg, so the drawing answers the cursor
 * anywhere over the hero. Falls back to the drawing itself if the section is not there.
 */
onMounted(() => {
  frame =
    (svgRef.value?.closest('.VPHero') as HTMLElement | null) ?? svgRef.value?.parentElement ?? null
  frame?.addEventListener('pointerenter', onPointerEnter)
  frame?.addEventListener('pointermove', onPointerMove)
  frame?.addEventListener('pointerleave', onPointerLeave)
  frame?.addEventListener('pointercancel', onPointerLeave)
  window.addEventListener('resize', onViewportChange, { passive: true })
  window.addEventListener('scroll', onViewportChange, { passive: true, capture: true })
})

onBeforeUnmount(() => {
  frame?.removeEventListener('pointerenter', onPointerEnter)
  frame?.removeEventListener('pointermove', onPointerMove)
  frame?.removeEventListener('pointerleave', onPointerLeave)
  frame?.removeEventListener('pointercancel', onPointerLeave)
  window.removeEventListener('resize', onViewportChange)
  window.removeEventListener('scroll', onViewportChange, true)
  if (raf) cancelAnimationFrame(raf)
})

const tiltStyle = computed(() => ({
  '--hero-tilt-x': `${pose.rotateX.toFixed(2)}deg`,
  '--hero-tilt-y': `${pose.rotateY.toFixed(2)}deg`,
  '--hero-shift-x': `${pose.leanX.toFixed(1)}px`,
  '--hero-shift-y': `${pose.leanY.toFixed(1)}px`,
}))

/**
 * The cast shadow follows the disc's shift and adds its own opposite lean, on top of the 20 px
 * drop that keeps it under the disc — the same relationship the old `drop-shadow` had.
 */
const shadowStyle = computed(() => {
  const x = pose.leanX + pose.shadowX
  const y = pose.leanY + pose.shadowY
  return {
    transform: `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${(20 + y).toFixed(1)}px)`,
  }
})

/** The wide gloss drifts; the tight streak runs further, and the gap between them reads as depth. */
const glossTransform = computed(
  () => `translate(${(pose.shineX * 0.6).toFixed(1)} ${(pose.shineY * 0.6).toFixed(1)})`,
)
const streakTransform = computed(
  () => `translate(${(pose.shineX * 1.8).toFixed(1)} ${(pose.shineY * 1.8).toFixed(1)})`,
)
</script>

<template>
  <div class="hero-wafer-stage">
    <div class="hero-wafer-shadow" :style="shadowStyle" aria-hidden="true"></div>
    <svg
      ref="svgRef"
      class="hero-wafer"
      viewBox="0 0 360 360"
      role="img"
      :aria-label="label"
      :style="tiltStyle"
    >
      <defs>
        <radialGradient id="hero-wafer-glow" cx="50%" cy="44%" r="55%">
          <stop offset="0%" stop-color="#4299e1" stop-opacity="0.24" />
          <stop offset="100%" stop-color="#4299e1" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="hero-wafer-disc" x1="8%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%" stop-color="#e8faff" />
          <stop offset="34%" stop-color="#a6e6ff" />
          <stop offset="68%" stop-color="#5cc0f0" />
          <stop offset="100%" stop-color="#2f8fd6" />
        </linearGradient>
        <radialGradient id="hero-wafer-shine" cx="42%" cy="34%" r="62%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55" />
          <stop offset="55%" stop-color="#ffffff" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="hero-wafer-streak" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </radialGradient>
        <clipPath id="hero-wafer-clip">
          <circle cx="180" cy="180" r="126" />
        </clipPath>
      </defs>

      <circle cx="180" cy="180" r="176" fill="url(#hero-wafer-glow)" />

      <g transform="rotate(-8 180 180)">
        <circle cx="180" cy="180" r="126" fill="url(#hero-wafer-disc)" stroke="#0b2540" stroke-width="3" />

        <!-- die grid, cut at the rim -->
        <g clip-path="url(#hero-wafer-clip)" stroke="#0b3557" stroke-width="1" opacity="0.3">
          <path
            d="M54 54V306M72 54V306M90 54V306M108 54V306M126 54V306M144 54V306M162 54V306M180 54V306M198 54V306M216 54V306M234 54V306M252 54V306M270 54V306M288 54V306M306 54V306"
          />
          <path
            d="M54 54H306M54 72H306M54 90H306M54 108H306M54 126H306M54 144H306M54 162H306M54 180H306M54 198H306M54 216H306M54 234H306M54 252H306M54 270H306M54 288H306M54 306H306"
          />
        </g>

        <!-- dies picked for the next step -->
        <g clip-path="url(#hero-wafer-clip)" fill="#ed8936" opacity="0.92">
          <rect x="146" y="128" width="14" height="14" rx="3" />
          <rect x="164" y="128" width="14" height="14" rx="3" />
          <rect x="146" y="146" width="14" height="14" rx="3" />
          <rect x="164" y="146" width="14" height="14" rx="3" />
          <rect x="182" y="164" width="14" height="14" rx="3" />
        </g>

        <!-- gloss: a broad sweep and a tight streak, both travelling with the pointer -->
        <g clip-path="url(#hero-wafer-clip)">
          <g :transform="glossTransform">
            <ellipse
              cx="132"
              cy="118"
              rx="170"
              ry="120"
              transform="rotate(-26 132 118)"
              fill="url(#hero-wafer-shine)"
            />
          </g>
          <g :transform="streakTransform" opacity="0.7">
            <ellipse cx="118" cy="96" rx="58" ry="26" transform="rotate(-26 118 96)" fill="url(#hero-wafer-streak)" />
          </g>
        </g>

        <!-- crisp rim -->
        <path
          d="M70.9 117A126 126 0 0 1 180 54"
          fill="none"
          stroke="#ffffff"
          stroke-opacity="0.55"
          stroke-width="2.5"
          stroke-linecap="round"
        />

        <!-- orientation notch -->
        <path d="M167 306.4 180 290.5 193 306.4Z" fill="#0b2540" opacity="0.92" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.hero-wafer-stage {
  position: relative;
  width: 100%;
  max-width: 360px;
  margin-inline: auto;
}

/* The shadow is its own layer: only `transform` changes, so the blur is never re-rasterised. */
.hero-wafer-shadow {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 72%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: rgba(11, 37, 64, 0.22);
  filter: blur(13px);
  pointer-events: none;
  will-change: transform;
}

.hero-wafer {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  transform: perspective(650px) translate3d(var(--hero-shift-x, 0px), var(--hero-shift-y, 0px), 0)
    rotateX(var(--hero-tilt-x, 0deg)) rotateY(var(--hero-tilt-y, 0deg));
  will-change: transform;
}

@media (min-width: 960px) {
  .hero-wafer-stage {
    max-width: 440px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-wafer {
    transform: none;
  }
}
</style>
