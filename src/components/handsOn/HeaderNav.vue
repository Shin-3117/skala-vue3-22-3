<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Sun, Radio, Bell } from '@lucide/vue'

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
  <header class="w-full bg-white/80 backdrop-blur-md rounded-3xl p-4 md:p-6 shadow-xl border border-sky-100 relative overflow-hidden mb-6">
    <!-- Header Ambient Background Light -->
    <div class="absolute -top-12 -left-12 w-48 h-48 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative flex flex-col md:flex-row items-center justify-between gap-4">
      <!-- Brand Logo -->
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-400/30 border border-sky-200 animate-pulse-glow">
          <Sun class="w-7 h-7 text-amber-200 animate-spin-slow" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700">
              SkyCast
            </h1>
            <span class="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200">
              LIVE
            </span>
          </div>
          <p class="text-xs text-slate-500 font-medium">대한민국 실시간 전국 날씨 대시보드</p>
        </div>
      </div>

      <!-- Weather Ticker / Announcement -->
      <div class="hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-sky-50/80 border border-sky-100 text-xs text-slate-700">
        <span class="flex h-2 w-2 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
        </span>
        <Bell class="w-3.5 h-3.5 text-amber-500" />
        <span class="font-bold text-slate-900">기상 안내:</span>
        <span class="text-slate-600">전국 주요 도시는 쾌청하며 미세먼지 [좋음] 수준입니다.</span>
      </div>

      <!-- Live Clock & Date -->
      <div class="flex items-center gap-2 px-4 py-2 rounded-2xl bg-sky-100/80 border border-sky-200 text-xs md:text-sm font-mono text-sky-800 font-bold shadow-inner">
        <Radio class="w-4 h-4 text-emerald-500 animate-pulse" />
        {{ currentTime || '2026.08.12 (수)' }}
      </div>
    </div>
  </header>
</template>
