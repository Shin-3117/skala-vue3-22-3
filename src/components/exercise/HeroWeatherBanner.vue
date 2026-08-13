<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import {
  MapPin,
  Wind,
  Droplets,
  Sun,
  Sparkles,
  ArrowUpRight
} from '@lucide/vue'

const props = defineProps({
  featuredCity: { type: Object, required: true },
  statusFilter: { type: String, default: 'ALL' },
})

const emit = defineEmits(['filter-status'])
const router = useRouter()
const configStore = useConfigStore()

const weatherIconMap = {
  맑음: '/assets/sunny.jpg',
  구름많음: '/assets/cloudy.jpg',
  흐림: '/assets/cloudy.jpg',
  비: '/assets/rainy.jpg',
  소나기: '/assets/rainy.jpg',
}

const statusImage = computed(() => {
  if (!props.featuredCity) return '/assets/sunny.jpg'
  return weatherIconMap[props.featuredCity.status] || '/assets/sunny.jpg'
})

const filterCategories = [
  { key: 'ALL', label: '전체 보기', icon: Sparkles },
  { key: 'SUNNY', label: '☀️ 맑음', icon: Sun },
  { key: 'CLOUDY', label: '☁️ 구름 / 흐림' },
  { key: 'RAINY', label: '🌧️ 비 / 소나기' },
]

const goToDetailPage = () => {
  if (props.featuredCity?.id) {
    router.push(`/weather/${props.featuredCity.id}`)
  }
}
</script>

<template>
  <div class="relative w-full rounded-3xl overflow-hidden shadow-xl border border-sky-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md mb-8 group">
    <!-- Hero Wallpaper Background Image -->
    <div class="absolute inset-0 z-0">
      <img
        src="/assets/hero.jpg"
        alt="Weather Sky Backdrop"
        class="w-full h-full object-cover opacity-25 dark:opacity-15 transform group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-sky-50/70 dark:from-slate-950/95 dark:via-slate-900/85 dark:to-slate-900/70"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent"></div>
    </div>

    <!-- Content Overlay -->
    <div class="relative z-10 p-6 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
      <!-- Left: Featured City Highlight -->
      <div class="flex-1">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-xs font-bold border border-sky-200 dark:border-sky-800 mb-3">
          <MapPin class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>현재 대표 실시간 기상 현황</span>
        </div>

        <div class="flex items-baseline gap-3">
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {{ featuredCity.name }}
          </h2>
          <span class="text-lg md:text-xl font-bold text-sky-600 dark:text-sky-400">{{ featuredCity.status }}</span>
        </div>

        <p class="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
          최저 <span class="text-blue-600 dark:text-blue-400 font-bold">{{ configStore.getTemp(featuredCity.tempMin || (featuredCity.temp - 4)) }}{{ configStore.unitSymbol() }}</span> /
          최고 <span class="text-amber-600 dark:text-amber-400 font-bold">{{ configStore.getTemp(featuredCity.tempMax || (featuredCity.temp + 3)) }}{{ configStore.unitSymbol() }}</span> ·
          체감 <span class="text-slate-800 dark:text-slate-200 font-bold">{{ configStore.getTemp(featuredCity.feelsLike || (featuredCity.temp + 1)) }}{{ configStore.unitSymbol() }}</span>
        </p>

        <!-- Dynamic Micro Stats Bar -->
        <div class="mt-6 flex flex-wrap items-center gap-3">
          <div class="px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center gap-2 text-xs">
            <Droplets class="w-4 h-4 text-sky-500" />
            <span class="text-slate-500 dark:text-slate-400 font-medium">습도</span>
            <span class="font-bold text-slate-800 dark:text-slate-100">{{ featuredCity.humidity || 55 }}%</span>
          </div>

          <div class="px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center gap-2 text-xs">
            <Wind class="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span class="text-slate-500 dark:text-slate-400 font-medium">풍속</span>
            <span class="font-bold text-slate-800 dark:text-slate-100">{{ featuredCity.wind || 3.2 }}m/s</span>
          </div>

          <button
            @click="goToDetailPage"
            class="px-4 py-2 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-sky-500/20 group/btn cursor-pointer"
          >
            <span>상세 날씨 분석 페이지</span>
            <ArrowUpRight class="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <!-- Right: Weather Illustration Thumbnail & Temp -->
      <div class="flex items-center gap-6 self-start lg:self-center">
        <div class="relative w-32 h-32 md:w-36 md:h-36 rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-700 bg-slate-100 dark:bg-slate-800 animate-float-slow shrink-0">
          <img :src="statusImage" :alt="featuredCity.status" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
          <span class="absolute bottom-2 left-2 right-2 text-center text-xs font-bold text-white bg-slate-900/60 backdrop-blur-sm py-0.5 rounded-lg border border-white/20">
            {{ featuredCity.status }}
          </span>
        </div>

        <div class="flex flex-col">
          <span class="text-6xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300 drop-shadow-sm">
            {{ configStore.getTemp(featuredCity.temp) }}{{ configStore.unitSymbol() }}
          </span>
          <span class="text-xs font-bold uppercase text-slate-400 tracking-wider">
            {{ configStore.isFahrenheit ? '화씨 (FAHRENHEIT)' : '섭씨 (CELSIUS)' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Bottom Filter Tabs Bar -->
    <div class="relative z-10 px-6 py-3 bg-sky-50/80 dark:bg-slate-900/80 border-t border-sky-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
      <span class="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-2">상태별 필터:</span>
      <button
        v-for="cat in filterCategories"
        :key="cat.key"
        @click="emit('filter-status', cat.key)"
        class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border"
        :class="
          statusFilter === cat.key
            ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20'
            : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
        "
      >
        {{ cat.label }}
      </button>
    </div>
  </div>
</template>
