<script setup lang="ts">
defineProps<{
  id: string
  title?: string
}>()
</script>

<template>
  <div class="video-embed">
    <iframe
      :src="`https://www.youtube-nocookie.com/embed/${id}`"
      :title="title ?? 'YouTube video'"
      allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture;
        web-share;
      "
      allowfullscreen
      loading="lazy"
    />
  </div>
</template>
