<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCityByIdOrName } from '@/data/weatherData.js'
import { useConfigStore } from '@/stores/configStore'
import {
  ArrowLeft,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  ShieldCheck,
  Thermometer,
  Calendar,
  Clock,
  Shirt,
  Umbrella,
  AlertTriangle
} from '@lucide/vue'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const cityIdParam = computed(() => route.params.cityId)
const cityData = computed(() => getCityByIdOrName(cityIdParam.value))

const weatherIconMap = {
  맑음: '/assets/sunny.jpg',
  구름많음: '/assets/cloudy.jpg',
  흐림: '/assets/cloudy.jpg',
  비: '/assets/rainy.jpg',
  소나기: '/assets/rainy.jpg',
}

const imageSrc = computed(() => {
  if (!cityData.value) return '/assets/sunny.jpg'
  return weatherIconMap[cityData.value.status] || '/assets/sunny.jpg'
})

const mockHourly = computed(() => {
  if (!cityData.value) return []
  const base = cityData.value.temp
  return [
    { time: '09:00', temp: base - 2, icon: 'sun', pop: '0%' },
    { time: '12:00', temp: base + 2, icon: 'sun', pop: '10%' },
    { time: '15:00', temp: base + 3, icon: 'cloud', pop: '20%' },
    { time: '18:00', temp: base + 1, icon: 'cloud', pop: '30%' },
    { time: '21:00', temp: base - 1, icon: 'rain', pop: '60%' },
    { time: '00:00', temp: base - 3, icon: 'sun', pop: '10%' },
  ]
})

const mockWeekly = computed(() => {
  if (!cityData.value) return []
  const base = cityData.value.temp
  return [
    { day: '오늘', status: cityData.value.status, high: base + 2, low: base - 4 },
    { day: '내일', status: '맑음', high: base + 3, low: base - 3 },
    { day: '글피', status: '구름많음', high: base + 1, low: base - 2 },
    { day: '금요일', status: '비', high: base, low: base - 5 },
    { day: '토요일', status: '맑음', high: base + 4, low: base - 2 },
  ]
})

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50/50 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-10">
    <div class="max-w-5xl mx-auto flex flex-col gap-6">

      <!-- Navigation Header Bar -->
      <nav class="flex items-center justify-between p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-sky-100 dark:border-slate-800 shadow-md">
        <button
          @click="goBack"
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-500/20 transition-all cursor-pointer"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>목록으로 돌아가기</span>
        </button>

        <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <!-- Unit Toggle Button -->
          <button
            @click="configStore.toggleUnit()"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 border border-sky-200 dark:border-slate-700 text-xs font-bold text-sky-800 dark:text-sky-300 transition-all cursor-pointer shadow-xs"
            :title="configStore.isFahrenheit ? '섭씨(℃)로 전환' : '화씨(℉)로 전환'"
          >
            <Thermometer class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{{ configStore.unitSymbol() }}</span>
          </button>

          <!-- Theme Toggle Button -->
          <button
            @click="configStore.toggleTheme()"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 border border-sky-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-xs"
            :title="configStore.isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'"
          >
            <Moon v-if="configStore.isDarkMode" class="w-3.5 h-3.5 text-indigo-400" />
            <Sun v-else class="w-3.5 h-3.5 text-amber-500" />
          </button>

          <span class="px-3 py-1 rounded-lg bg-sky-100/80 dark:bg-slate-800 text-sky-700 dark:text-sky-300 font-mono">
            ID: {{ cityIdParam }}
          </span>
        </div>
      </nav>

      <!-- City Not Found State -->
      <div v-if="!cityData" class="p-12 text-center bg-white/90 dark:bg-slate-900/90 rounded-3xl border border-sky-100 dark:border-slate-800 shadow-xl my-10">
        <div class="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle class="w-8 h-8" />
        </div>
        <h2 class="text-2xl font-black text-slate-900 dark:text-slate-100">도시 정보를 찾을 수 없습니다</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6 font-medium">
          요청하신 도시 ID ('{{ cityIdParam }}') 에 해당하는 날씨 데이터를 찾을 수 없습니다.
        </p>
        <button
          @click="goBack"
          class="px-6 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-sm hover:bg-sky-600 shadow-lg shadow-sky-500/30 transition-all"
        >
          메인 대시보드로 이동
        </button>
      </div>

      <!-- City Weather Detailed View -->
      <template v-else>
        <!-- Top Hero Visual Card -->
        <div class="relative rounded-3xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/80 dark:border-slate-800 shadow-2xl p-6 sm:p-10">
          <div class="absolute -top-24 -right-24 w-80 h-80 bg-sky-300/30 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-200/30 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <!-- City & Temp Highlight -->
            <div class="text-center md:text-left flex-1">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-xs font-bold border border-sky-200 dark:border-sky-800 mb-3">
                <Thermometer class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>실시간 기상 기상관측소 데이터</span>
              </div>

              <h1 class="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center justify-center md:justify-start gap-3">
                {{ cityData.name }}
                <span class="text-sm font-bold text-slate-400 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                  대한민국
                </span>
              </h1>

              <p class="text-sm text-slate-600 dark:text-slate-300 font-medium mt-2 leading-relaxed max-w-xl">
                {{ cityData.description }}
              </p>

              <div class="mt-6 flex items-baseline justify-center md:justify-start gap-4">
                <span class="text-6xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300">
                  {{ configStore.getTemp(cityData.temp) }}{{ configStore.unitSymbol() }}
                </span>

                <div class="text-left font-medium">
                  <div class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ cityData.status }}</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">
                    체감 <span class="font-bold text-slate-700 dark:text-slate-200">{{ configStore.getTemp(cityData.feelsLike) }}{{ configStore.unitSymbol() }}</span> ·
                    최저 <span class="font-bold text-blue-600 dark:text-blue-400">{{ configStore.getTemp(cityData.tempMin) }}{{ configStore.unitSymbol() }}</span> /
                    최고 <span class="font-bold text-amber-600 dark:text-amber-400">{{ configStore.getTemp(cityData.tempMax) }}{{ configStore.unitSymbol() }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 3D Artwork Badge -->
            <div class="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0">
              <img :src="imageSrc" :alt="cityData.status" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              <span class="absolute bottom-3 left-3 right-3 text-center text-xs font-bold text-white bg-slate-900/70 backdrop-blur-sm py-1 rounded-xl border border-white/20">
                {{ cityData.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Metric Gauges 4-Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-sky-100 dark:border-slate-800 shadow-lg flex flex-col items-center text-center">
            <div class="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-2">
              <Droplets class="w-5 h-5" />
            </div>
            <span class="text-xs text-slate-400 font-semibold">습도</span>
            <span class="text-lg font-bold text-slate-800 dark:text-slate-100 mt-0.5">{{ cityData.humidity }}%</span>
          </div>

          <div class="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-sky-100 dark:border-slate-800 shadow-lg flex flex-col items-center text-center">
            <div class="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
              <Wind class="w-5 h-5" />
            </div>
            <span class="text-xs text-slate-400 font-semibold">풍속</span>
            <span class="text-lg font-bold text-slate-800 dark:text-slate-100 mt-0.5">{{ cityData.wind }} m/s</span>
          </div>

          <div class="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-sky-100 dark:border-slate-800 shadow-lg flex flex-col items-center text-center">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
              <ShieldCheck class="w-5 h-5" />
            </div>
            <span class="text-xs text-slate-400 font-semibold">미세먼지</span>
            <span class="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{{ cityData.dust }}</span>
          </div>

          <div class="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-sky-100 dark:border-slate-800 shadow-lg flex flex-col items-center text-center">
            <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
              <Sun class="w-5 h-5" />
            </div>
            <span class="text-xs text-slate-400 font-semibold">자외선 지수</span>
            <span class="text-lg font-bold text-amber-600 dark:text-amber-400 mt-0.5">{{ cityData.uv }}</span>
          </div>
        </div>

        <!-- Hourly Timeline Chart Section -->
        <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-sky-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock class="w-5 h-5 text-sky-600 dark:text-sky-400" />
              오늘의 시간대별 기온 예보
            </h2>
            <span class="text-xs text-slate-400">3시간 간격 업데이트</span>
          </div>

          <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
            <div
              v-for="item in mockHourly"
              :key="item.time"
              class="flex flex-col items-center p-3 rounded-2xl bg-sky-50/60 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 hover:bg-sky-100/60 dark:hover:bg-slate-700/60 transition-colors"
            >
              <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">{{ item.time }}</span>
              <Sun v-if="item.icon === 'sun'" class="w-6 h-6 text-amber-500 my-2" />
              <CloudRain v-else-if="item.icon === 'rain'" class="w-6 h-6 text-blue-500 my-2" />
              <Cloud v-else class="w-6 h-6 text-slate-400 my-2" />
              <span class="text-base font-bold text-slate-800 dark:text-slate-100">{{ configStore.getTemp(item.temp) }}{{ configStore.unitSymbol() }}</span>
              <span class="text-[10px] text-blue-500 dark:text-blue-400 font-medium mt-1">강수 {{ item.pop }}</span>
            </div>
          </div>
        </div>

        <!-- Weekly & Living Tips Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 5-Day Weekly Forecast -->
          <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-sky-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl">
            <h2 class="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Calendar class="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              주간 기상 예보
            </h2>
            <div class="space-y-3">
              <div
                v-for="item in mockWeekly"
                :key="item.day"
                class="flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 text-sm"
              >
                <span class="font-bold text-slate-700 dark:text-slate-200 w-16">{{ item.day }}</span>
                <span class="text-slate-600 dark:text-slate-300 flex items-center gap-1.5 w-24">
                  <Sun v-if="item.status === '맑음'" class="w-4 h-4 text-amber-500" />
                  <CloudRain v-else-if="item.status === '비' || item.status === '소나기'" class="w-4 h-4 text-blue-500" />
                  <Cloud v-else class="w-4 h-4 text-slate-400" />
                  {{ item.status }}
                </span>
                <div class="flex items-center gap-2">
                  <span class="text-slate-400 text-xs font-mono">{{ configStore.getTemp(item.low) }}{{ configStore.unitSymbol() }}</span>
                  <div class="w-20 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-sky-400 to-amber-500 rounded-full" style="width: 75%"></div>
                  </div>
                  <span class="text-slate-900 dark:text-slate-100 font-bold font-mono">{{ configStore.getTemp(item.high) }}{{ configStore.unitSymbol() }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Living & Clothing Tips -->
          <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-sky-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h2 class="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Shirt class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                생활 및 복장 추천 지수
              </h2>

              <div class="space-y-3">
                <div class="p-3.5 rounded-2xl bg-sky-50/80 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0">
                    <Shirt class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="text-xs font-bold text-sky-800 dark:text-sky-300">추천 복장</span>
                    <p class="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {{ cityData.temp >= 25 ? '가벼운 반팔, 얇은 셔츠 및 햇빛 차단 모자' : '긴팔 겉옷 및 얇은 가디건' }}
                    </p>
                  </div>
                </div>

                <div class="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
                    <Umbrella class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="text-xs font-bold text-blue-800 dark:text-blue-300">우산 지수</span>
                    <p class="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {{ cityData.status.includes('비') || cityData.status.includes('소나기') ? '비 소식이 있습니다. 접이식 우산을 지참하세요!' : '우산 없이 쾌적하게 다닐 수 있습니다.' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <button
                @click="goBack"
                class="w-full py-3 rounded-2xl bg-slate-900 dark:bg-sky-500 hover:bg-slate-800 dark:hover:bg-sky-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                전국 지도 대시보드로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>
