<script setup>
import { computed } from 'vue'
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  ShieldCheck,
  X,
  Calendar,
  Clock
} from '@lucide/vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  cityData: { type: Object, default: null },
})

const emit = defineEmits(['close'])

const weatherIconMap = {
  맑음: '/assets/sunny.jpg',
  구름많음: '/assets/cloudy.jpg',
  흐림: '/assets/cloudy.jpg',
  비: '/assets/rainy.jpg',
  소나기: '/assets/rainy.jpg',
}

const getImageSrc = computed(() => {
  if (!props.cityData) return '/assets/sunny.jpg'
  return weatherIconMap[props.cityData.status] || '/assets/sunny.jpg'
})

const mockHourly = computed(() => {
  if (!props.cityData) return []
  const baseTemp = props.cityData.temp
  return [
    { time: '09:00', temp: baseTemp - 2, icon: 'sun' },
    { time: '12:00', temp: baseTemp + 2, icon: 'sun' },
    { time: '15:00', temp: baseTemp + 3, icon: 'cloud' },
    { time: '18:00', temp: baseTemp + 1, icon: 'cloud' },
    { time: '21:00', temp: baseTemp - 1, icon: 'rain' },
    { time: '00:00', temp: baseTemp - 3, icon: 'sun' },
  ]
})

const mockWeekly = computed(() => {
  if (!props.cityData) return []
  const base = props.cityData.temp
  return [
    { day: '오늘', status: props.cityData.status, high: base + 2, low: base - 4 },
    { day: '내일', status: '맑음', high: base + 3, low: base - 3 },
    { day: '글피', status: '구름많음', high: base + 1, low: base - 2 },
    { day: '금요일', status: '비', high: base, low: base - 5 },
    { day: '토요일', status: '맑음', high: base + 4, low: base - 2 },
  ]
})

const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen && cityData"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        @click="handleBackdropClick"
      >
        <div
          class="relative w-full max-w-2xl bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden text-slate-100 glass-panel"
          @click.stop
        >
          <!-- Background Ambient Glow -->
          <div class="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <!-- Close Button -->
          <button
            @click="emit('close')"
            class="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700"
            aria-label="닫기"
          >
            <X class="w-5 h-5" />
          </button>

          <!-- Modal Header -->
          <div class="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div class="relative w-28 h-28 rounded-2xl overflow-hidden shadow-lg border border-slate-700 shrink-0">
              <img :src="getImageSrc" :alt="cityData.status" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
            </div>

            <div class="text-center md:text-left flex-1">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-500/30 mb-2">
                <Thermometer class="w-3.5 h-3.5" /> 실시간 상세 날씨
              </div>
              <h2 class="text-3xl font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
                {{ cityData.name }}
                <span class="text-lg font-medium text-slate-400">대한민국</span>
              </h2>
              <div class="mt-2 flex items-baseline justify-center md:justify-start gap-3">
                <span class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-200">
                  {{ cityData.temp }}°
                </span>
                <div class="text-sm text-slate-300 font-medium">
                  <div>{{ cityData.status }}</div>
                  <div class="text-slate-400 text-xs">체감 {{ cityData.feelsLike || (cityData.temp + 1) }}°C</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Key Metrics Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div class="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center text-center">
              <Droplets class="w-5 h-5 text-sky-400 mb-1" />
              <span class="text-xs text-slate-400">습도</span>
              <span class="text-sm font-bold text-slate-100">{{ cityData.humidity || 60 }}%</span>
            </div>
            <div class="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center text-center">
              <Wind class="w-5 h-5 text-indigo-400 mb-1" />
              <span class="text-xs text-slate-400">풍속</span>
              <span class="text-sm font-bold text-slate-100">{{ cityData.wind || 2.8 }} m/s</span>
            </div>
            <div class="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center text-center">
              <ShieldCheck class="w-5 h-5 text-emerald-400 mb-1" />
              <span class="text-xs text-slate-400">미세먼지</span>
              <span class="text-sm font-bold text-emerald-400">{{ cityData.dust || '좋음' }}</span>
            </div>
            <div class="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col items-center text-center">
              <Sun class="w-5 h-5 text-amber-400 mb-1" />
              <span class="text-xs text-slate-400">자외선</span>
              <span class="text-sm font-bold text-amber-400">{{ cityData.uv || '보통' }}</span>
            </div>
          </div>

          <!-- Hourly Timeline -->
          <div class="mb-8 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4">
            <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock class="w-4 h-4 text-sky-400" /> 오늘 시간대별 예보
            </h3>
            <div class="flex items-center justify-between gap-2 overflow-x-auto pb-1">
              <div
                v-for="item in mockHourly"
                :key="item.time"
                class="flex flex-col items-center p-2 rounded-xl bg-slate-800/80 border border-slate-700/50 min-w-[64px]"
              >
                <span class="text-xs text-slate-400">{{ item.time }}</span>
                <Sun v-if="item.icon === 'sun'" class="w-5 h-5 text-amber-400 my-1" />
                <CloudRain v-else-if="item.icon === 'rain'" class="w-5 h-5 text-blue-400 my-1" />
                <Cloud v-else class="w-5 h-5 text-slate-400 my-1" />
                <span class="text-sm font-bold text-slate-200">{{ item.temp }}°</span>
              </div>
            </div>
          </div>

          <!-- Weekly Forecast -->
          <div class="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4">
            <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Calendar class="w-4 h-4 text-indigo-400" /> 주간 예보
            </h3>
            <div class="space-y-2">
              <div
                v-for="item in mockWeekly"
                :key="item.day"
                class="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors text-sm"
              >
                <span class="font-medium text-slate-300 w-16">{{ item.day }}</span>
                <span class="text-slate-400 flex items-center gap-1 w-24">
                  <Sun v-if="item.status === '맑음'" class="w-4 h-4 text-amber-400" />
                  <CloudRain v-else-if="item.status === '비' || item.status === '소나기'" class="w-4 h-4 text-blue-400" />
                  <Cloud v-else class="w-4 h-4 text-slate-400" />
                  {{ item.status }}
                </span>
                <div class="flex items-center gap-2">
                  <span class="text-slate-400 text-xs font-mono">{{ item.low }}°</span>
                  <div class="w-16 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-sky-400 to-amber-400 rounded-full" style="width: 70%"></div>
                  </div>
                  <span class="text-slate-100 font-bold font-mono">{{ item.high }}°</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
