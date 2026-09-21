<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { getCitation } from './citations'
import { useLocalePath } from './locale'

const props = defineProps<{
  id: string
}>()

const localePath = useLocalePath()
const cite = computed(() => getCitation(props.id))
const refHref = computed(() =>
  cite.value ? withBase(localePath(`/referencias#ref-${cite.value.num}`)) : '#',
)
</script>

<template>
  <sup v-if="cite" class="cite-ref">
    <a
      :href="refHref"
      :title="`${cite.publisher ? cite.publisher + ': ' : ''}${cite.title}`"
    >
      [{{ cite.num }}]
    </a>
  </sup>
</template>
