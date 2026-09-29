<script setup lang="ts">
import { computed } from 'vue'
import { useIsEnglish } from './locale'

/**
 * The hero drawing: a polished wafer with its die grid, a few dies picked out in copper.
 *
 * Same language as the favicon: one disc, one grid, one gloss sweep. The site's mark and its
 * landing page are the same object at two sizes. Inline SVG rather than a bitmap: it stays sharp
 * at any size and does not glare on the dark theme the way a white-background photo does.
 *
 * The disc is shaded with a linear gradient on purpose. A radial one with an off-centre hotspot
 * reads as a sphere at this size; a wafer is flat, and the die grid is what identifies it.
 */

const isEnglish = useIsEnglish()

const label = computed(() =>
  isEnglish.value
    ? 'Silicon wafer with its die grid, a few dies highlighted'
    : 'Wafer de silício com a grade de dies, alguns destacados',
)
</script>

<template>
  <svg class="hero-wafer" viewBox="0 0 360 360" role="img" :aria-label="label">
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

      <!-- gloss sweep; radial so its own edge never shows on the disc -->
      <g clip-path="url(#hero-wafer-clip)">
        <ellipse
          cx="132"
          cy="118"
          rx="170"
          ry="120"
          transform="rotate(-26 132 118)"
          fill="url(#hero-wafer-shine)"
        />
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
</template>

<style scoped>
.hero-wafer {
  display: block;
  width: 100%;
  height: auto;
  max-width: 360px;
  margin-inline: auto;
}
</style>
