<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import Button from '@/components/ui/button/Button.vue'
import WeatherBadge from './WeatherBadge.vue'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card/index.js'
import { ChevronRight, Droplets, Wind, MapPin } from '@lucide/vue'

const props = defineProps({
  id: { type: String, default: '' },
  name: { type: String, required: true },
  temp: { type: Number, required: true },
  status: { type: String, required: true },
  isSelected: { type: Boolean, default: false },
  humidity: { type: Number, default: 55 },
  wind: { type: Number, default: 3.0 },
})

const emit = defineEmits(['select-city'])
const router = useRouter()
const configStore = useConfigStore()

const weatherIconMap = {
  맑음: '/assets/sunny.jpg',
  구름많음: '/assets/cloudy.jpg',
  흐림: '/assets/cloudy.jpg',
  비: '/assets/rainy.jpg',
  소나기: '/assets/rainy.jpg',
}

const imageSrc = computed(() => {
  return weatherIconMap[props.status] || '/assets/sunny.jpg'
})

const handleSelect = (event) => {
  if (event?.target?.closest('button')) {
    return
  }
  emit('select-city', props.name)
}

const goToDetailPage = () => {
  const targetId = props.id || props.name
  router.push(`/weather/${targetId}`)
}
</script>

<template>
  <Card
    class="cursor-pointer transition-all duration-300 relative overflow-hidden group border rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm hover:shadow-lg"
    :class="
      props.isSelected
        ? 'border-sky-500 bg-sky-50/80 dark:bg-slate-800/80 shadow-md shadow-sky-500/10'
        : 'border-slate-200/90 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-500'
    "
    @click="handleSelect"
  >
    <!-- Background subtle image accent -->
    <div class="absolute right-0 top-0 bottom-0 w-24 opacity-10 overflow-hidden pointer-events-none">
      <img :src="imageSrc" alt="" class="w-full h-full object-cover filter blur-sm transform scale-125" />
    </div>

    <CardHeader class="pb-2 pt-4 px-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-1.5">
          <MapPin class="w-4 h-4 text-sky-500 shrink-0" />
          <CardTitle class="text-lg font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">{{ props.name }}</CardTitle>
        </div>
        <WeatherBadge :temp="props.temp" />
      </div>
    </CardHeader>

    <CardContent class="px-4 pb-4 pt-2">
      <div class="flex items-center justify-between my-2">
        <div>
          <span class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-sky-700 dark:from-slate-100 dark:to-sky-400">
            {{ configStore.getTemp(props.temp) }}{{ configStore.unitSymbol() }}
          </span>
          <p class="text-xs font-bold text-sky-600 dark:text-sky-400 mt-0.5">{{ props.status }}</p>
        </div>

        <div class="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 shrink-0 group-hover:scale-105 transition-transform bg-slate-50 dark:bg-slate-800">
          <img :src="imageSrc" :alt="props.status" class="w-full h-full object-cover" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2 my-3 p-2 rounded-xl bg-sky-50/60 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 font-medium">
        <div class="flex items-center gap-1">
          <Droplets class="w-3.5 h-3.5 text-sky-500" />
          <span>습도 {{ props.humidity }}%</span>
        </div>
        <div class="flex items-center gap-1">
          <Wind class="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
          <span>풍속 {{ props.wind }}m/s</span>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        class="w-full rounded-xl bg-white dark:bg-slate-800 hover:bg-sky-500 dark:hover:bg-sky-500 hover:text-white dark:hover:text-white border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1 transition-all group/btn cursor-pointer shadow-xs"
        @click.stop="goToDetailPage"
      >
        <span>상세 페이지</span>
        <ChevronRight class="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
      </Button>
    </CardContent>
  </Card>
</template>
