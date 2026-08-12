<script setup>
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge/index.js'
import { Flame, Snowflake } from '@lucide/vue'

const props = defineProps({
  temp: { type: Number, required: true },
})

const isHot = computed(() => props.temp >= 25)

const temperatureLabel = computed(() => {
  return isHot.value ? `${props.temp}°C 더움` : `${props.temp}°C 선선함`
})
</script>

<template>
  <Badge
    class="px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1 border border-white/10"
    :class="
      isHot
        ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-rose-500/20'
        : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-500/20'
    "
  >
    <Flame v-if="isHot" class="w-3.5 h-3.5 text-amber-200 animate-pulse" />
    <Snowflake v-else class="w-3.5 h-3.5 text-sky-200" />
    <span>{{ temperatureLabel }}</span>
  </Badge>
</template>
