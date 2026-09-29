<script setup lang="ts">
import type { StageIconName } from './stage-visuals'

/**
 * The line icons of the home page: one drawing per production stage, plus the two reference cards
 * and the solar branch.
 *
 * The whole set sits on the same 24-unit grid with the same 1.5 stroke and round joins, so the
 * drawings read as a family. Colour comes from the caller through `currentColor`.
 */
defineProps<{ name: StageIconName }>()
</script>

<template>
  <svg
    class="stage-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <template v-if="name === 'crystal'">
      <path d="M10 3.5h4l3 4v8l-3 4h-4l-3-4v-8z" />
      <path d="M7 7.5l5 2.5 5-2.5" />
      <path d="M12 10v9.5" />
    </template>

    <template v-else-if="name === 'column'">
      <path d="M8.5 21V8a3.5 3.5 0 0 1 7 0v13" />
      <path d="M8.5 11.5h7M8.5 16h7" />
      <path d="M6 21h12" />
    </template>

    <template v-else-if="name === 'wafer'">
      <circle cx="12" cy="12" r="8.25" />
      <path d="M6.4 9h11.2M6.4 15h11.2M9 6.4v11.2M15 6.4v11.2" />
      <path d="M10.6 20.1 12 18.2l1.4 1.9" />
    </template>

    <template v-else-if="name === 'mask'">
      <rect x="4" y="3.5" width="16" height="6.5" rx="1.2" />
      <path d="M7 6.75h3.5M13.5 6.75H17" />
      <path d="M8 13.5v2.6M12 13.5v2.6M16 13.5v2.6" />
      <path d="M4.5 19.5h15" />
    </template>

    <template v-else-if="name === 'transistor'">
      <path d="M3.5 20h17" />
      <path d="M9.5 20v-9h5v9" />
      <path d="M7 20V9.5h10V20" />
      <path d="M12 9.5V6.5" />
    </template>

    <template v-else-if="name === 'package'">
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <path d="M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" />
      <circle cx="9.2" cy="9.2" r="0.9" fill="currentColor" stroke="none" />
    </template>

    <template v-else-if="name === 'solar'">
      <rect x="4" y="7" width="16" height="11" rx="1.2" />
      <path d="M12 7v11M4 12.5h16" />
      <path d="M7 4.5V3M12 4.5V3M17 4.5V3" />
    </template>

    <template v-else-if="name === 'book'">
      <path
        d="M12 6.6C10.4 5.4 8.2 5 5 5.6v11.8c3.2-.6 5.4-.2 7 1 1.6-1.2 3.8-1.6 7-1V5.6c-3.2-.6-5.4-.2-7 1Z"
      />
      <path d="M12 6.6v11.8" />
    </template>

    <template v-else-if="name === 'chart'">
      <path d="M4 4v16h16" />
      <path d="M8 20v-5M12 20V9M16 20v-8" />
    </template>
  </svg>
</template>

<style scoped>
.stage-icon {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
