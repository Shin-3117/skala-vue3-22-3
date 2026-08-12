<script setup>
import { computed } from 'vue'
import { Search, X, Sparkles } from '@lucide/vue'

const props = defineProps({
  searchQuery: { type: String, default: '' },
})
const emit = defineEmits(['update-query'])

const searchQueryProxy = computed({
  get: () => props.searchQuery,
  set: (value) => emit('update-query', value),
})

const popularCities = ['서울', '부산', '제주', '대구', '인천', '광주', '강원']

const selectQuickCity = (city) => {
  if (searchQueryProxy.value === city) {
    searchQueryProxy.value = ''
  } else {
    searchQueryProxy.value = city
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="relative group">
      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-sky-500 transition-colors">
        <Search class="w-5 h-5" />
      </div>

      <input
        id="weather-search"
        type="text"
        v-model="searchQueryProxy"
        placeholder="도시명을 검색해보세요 (예: 서울, 부산, ㅅㅇ, ㅂㅅ 등 초성 검색 지원)"
        class="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/90 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all font-medium"
      />

      <div v-if="searchQueryProxy" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <button
          @click="searchQueryProxy = ''"
          class="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          title="검색어 지우기"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
