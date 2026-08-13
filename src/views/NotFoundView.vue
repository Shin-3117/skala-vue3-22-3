<script setup>
import { useRouter } from 'vue-router'
import { CloudOff, Home, ArrowLeft } from '@lucide/vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50/60 to-indigo-50/40 text-slate-800 flex items-center justify-center p-6">
    <div class="relative w-full max-w-lg bg-white/80 backdrop-blur-md border border-white/80 rounded-3xl p-8 sm:p-12 shadow-2xl text-center overflow-hidden">
      <!-- Background Ambient Glow -->
      <div class="absolute -top-20 -right-20 w-60 h-60 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Icon Artwork -->
      <div class="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-sky-400 to-indigo-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-sky-500/20 animate-bounce">
        <CloudOff class="w-12 h-12 text-white" />
      </div>

      <span class="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200 uppercase tracking-widest">
        404 NOT FOUND
      </span>

      <h1 class="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
        길을 잃으셨나요?
      </h1>

      <p class="text-sm text-slate-500 font-medium mt-2 leading-relaxed max-w-xs mx-auto">
        요청하신 날씨 페이지 경로가 존재하지 않거나 주소가 잘못 입력되었습니다.
      </p>

      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          @click="goHome"
          class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm shadow-lg shadow-sky-700/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home class="w-4 h-4" />
          <span>메인 날씨 대시보드로 이동</span>
        </button>

        <button
          @click="goHome"
          class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>이전으로</span>
        </button>
      </div>
    </div>
  </div>
</template>
