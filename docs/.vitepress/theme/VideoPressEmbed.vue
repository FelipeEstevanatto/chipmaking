<script setup lang="ts">
import { computed } from 'vue'

/**
 * VideoPress (WordPress.com) player, the video host used by pv-manufacturing.org. Mirrors
 * `YouTubeEmbed`: a lazy 16:9 frame that keeps playback on the source's own player.
 */
const props = defineProps<{
  id: string
  title?: string
}>()

const src = computed(() => {
  const params = new URLSearchParams({
    hd: '1',
    cover: '1',
    autoPlay: '0',
    muted: '0',
    loop: '0',
    controls: '1',
    playsinline: '0',
    preloadContent: 'metadata',
  })
  return `https://videopress.com/embed/${props.id}?${params.toString()}`
})
</script>

<template>
  <div class="video-embed">
    <iframe
      :src="src"
      :title="title ?? 'Video'"
      allow="clipboard-write; presentation; fullscreen"
      allowfullscreen
      loading="lazy"
    />
  </div>
</template>
