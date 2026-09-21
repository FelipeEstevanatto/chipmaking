<script setup lang="ts">
import { USGS_MCS_YEARS, usgsMcsUrl } from './citations'
</script>

<template>
  <ul class="ref-usgs-years">
    <li v-for="year in USGS_MCS_YEARS" :key="year">
      <a :href="usgsMcsUrl(year)" target="_blank" rel="noopener noreferrer">
        Mineral Commodity Summaries {{ year }} — Silicon (PDF)
      </a>
    </li>
  </ul>
</template>
