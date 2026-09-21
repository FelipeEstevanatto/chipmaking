<script setup lang="ts">
import { allCitations } from './citations'
</script>

<template>
  <ol class="ref-list">
    <li v-for="c in allCitations" :id="`ref-${c.num}`" :key="c.key" class="ref-list-item">
      <span class="ref-list-num">[{{ c.num }}]</span>
      <span class="ref-list-body">
        <a
          v-if="c.url"
          class="ref-list-link"
          :href="c.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ c.title }}
        </a>
        <span v-else>{{ c.title }}</span>
        <span v-if="c.publisher" class="ref-list-publisher"> - {{ c.publisher }}</span>
      </span>
    </li>
  </ol>
</template>
