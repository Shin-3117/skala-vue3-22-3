<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Sun, Moon, Thermometer, Radio, Bell } from '@lucide/vue'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()

const currentTime = ref('')
let timer = null

const updateClock = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const date = String(now.getDate()).padStart(2, '0')
  const days = ['일', '월', '화', '수', '목', '금', '토']
  const dayName = days[now.getDay()]
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  currentTime.value = `${year}.${month}.${date} (${dayName}) ${hours}:${minutes}:${seconds}`
}

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <header class="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-4 md:p-6 shadow-xl border border-sky-100 dark:border-slate-800 relative overflow-hidden mb-6">
    <!-- Header Ambient Background Light -->
    <div class="absolute -top-12 -left-12 w-48 h-48 bg-sky-200/40 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-200/40 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative flex flex-col md:flex-row items-center justify-between gap-4">
      <!-- Brand Logo -->
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-400/30 border border-sky-200 dark:border-sky-400/30 animate-pulse-glow">
          <Sun class="w-7 h-7 text-amber-200 animate-spin-slow" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300">
              SkyCast
            </h1>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">대한민국 전국 날씨 대시보드</p>
        </div>
      </div>

      <!-- Controls & Live Clock -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Temperature Unit Toggle Button -->
        <button
          @click="configStore.toggleUnit()"
          class="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 border border-sky-200 dark:border-slate-700 text-xs font-bold text-sky-800 dark:text-sky-300 transition-all cursor-pointer shadow-xs active:scale-95"
          :title="configStore.isFahrenheit ? '섭씨(℃)로 전환' : '화씨(℉)로 전환'"
        >
          <Thermometer class="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>{{ configStore.unitSymbol() }} ({{ configStore.isFahrenheit ? '화씨 ℉' : '섭씨 ℃' }})</span>
        </button>

        <!-- Theme Toggle Button -->
        <button
          @click="configStore.toggleTheme()"
          class="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 border border-sky-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all cursor-pointer shadow-xs active:scale-95"
          :title="configStore.isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'"
        >
          <Moon v-if="configStore.isDarkMode" class="w-4 h-4 text-indigo-400" />
          <Sun v-else class="w-4 h-4 text-amber-500" />
          <span>{{ configStore.isDarkMode ? '다크' : '라이트' }}</span>
        </button>

        <!-- Live Clock & Date -->
        <div class="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-sky-100/80 dark:bg-slate-800/80 border border-sky-200 dark:border-slate-700 text-xs md:text-sm font-mono text-sky-800 dark:text-sky-300 font-bold shadow-inner">
          <Radio class="w-4 h-4 text-emerald-500 animate-pulse" />
          {{ currentTime || '2026.08.12 (수)' }}
        </div>
      </div>
    </div>
  </header>
</template>
