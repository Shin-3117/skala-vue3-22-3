<script setup>
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge/index.js'
const props = defineProps(['temp'])

const temperatureLabel = computed(() => {
  return props.temp >= 25 ? '🔥 더움 (25도 이상)' : '❄️ 선선함 (25도 미만)'
})
</script>
<template>
  <Badge :class="props.temp >= 25 ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'">
    {{ temperatureLabel }}
  </Badge>
</template>
