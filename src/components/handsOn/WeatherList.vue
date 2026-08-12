<script setup>
import { computed } from 'vue'
import WeatherCard from './WeatherCard.vue'
import { ScrollArea } from '@/components/ui/scroll-area/index.js'
import { includesChoseong } from '@/lib/search.js'
import { SearchX, Building2 } from '@lucide/vue'

const props = defineProps({
  weatherList: { type: Array, required: true },
  searchQuery: { type: String, default: '' },
  selectedCity: { type: String, default: '' },
  statusFilter: { type: String, default: 'ALL' },
})

const emit = defineEmits(['select-city'])

const filteredWeatherList = computed(() => {
  let list = props.weatherList

  // Apply Status Filter if specified
  if (props.statusFilter === 'SUNNY') {
    list = list.filter((item) => item.status === '맑음')
  } else if (props.statusFilter === 'CLOUDY') {
    list = list.filter((item) => item.status === '구름많음' || item.status === '흐림')
  } else if (props.statusFilter === 'RAINY') {
    list = list.filter((item) => item.status === '비' || item.status === '소나기')
  }

  // Apply Search Query Filter
  const query = props.searchQuery.trim()
  if (!query) return list

  return list.filter((item) => includesChoseong(item.name, query))
})

const handleSelectCity = (cityName) => {
  emit('select-city', cityName)
}
</script>

<template>
  <div class="flex h-[var(--panel-height)] flex-col bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-sm">
    <div class="mb-4 shrink-0 flex items-center justify-between border-b border-slate-100 pb-3">
      <div class="flex items-center gap-2">
        <Building2 class="w-4 h-4 text-sky-600" />
        <span class="text-sm font-extrabold text-slate-800">도시별 실시간 목록</span>
      </div>

      <div class="text-xs font-bold">
        <span v-if="!searchQuery.trim()" class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          총 {{ filteredWeatherList.length }}개 도시
        </span>
        <span v-else-if="filteredWeatherList.length > 0" class="px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
          '{{ searchQuery }}' {{ filteredWeatherList.length }}건
        </span>
        <span v-else class="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
          결과 없음
        </span>
      </div>
    </div>

    <!-- Weather Cards Grid -->
    <ScrollArea v-if="filteredWeatherList.length > 0" class="min-h-0 flex-1 pr-2">
      <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 pb-2">
        <li v-for="item in filteredWeatherList" :key="item.id">
          <WeatherCard
            :id="item.id"
            :name="item.name"
            :temp="item.temp"
            :status="item.status"
            :humidity="item.humidity || 55"
            :wind="item.wind || 3.0"
            :is-selected="item.name === selectedCity"
            @select-city="handleSelectCity"
          />
        </li>
      </ul>
    </ScrollArea>

    <!-- Empty Search State -->
    <div v-else class="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div class="w-16 h-16 rounded-full bg-sky-100 text-sky-600 border border-sky-200 flex items-center justify-center mb-3 animate-bounce">
        <SearchX class="w-8 h-8" />
      </div>
      <h3 class="text-base font-bold text-slate-800">검색된 도시가 없습니다</h3>
      <p class="text-xs text-slate-500 mt-1 max-w-xs font-medium">
        도시 이름이나 초성(예: ㅅㅇ, ㅂㅅ)을 올바르게 입력했는지 확인해보세요.
      </p>
    </div>
  </div>
</template>
