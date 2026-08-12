<script setup>
import { computed } from 'vue'
import WeatherCard from './WeatherCard.vue'
import { ScrollArea } from '@/components/ui/scroll-area/index.js'
import { includesChoseong } from '@/lib/search.js'

const props = defineProps({
  weatherList: { type: Array, required: true },
  searchQuery: { type: String, default: '' },
})
const emit = defineEmits(['select-city'])

const filteredWeatherList = computed(() => {
  const query = props.searchQuery.trim()
  if (!query) return props.weatherList

  return props.weatherList.filter((item) => includesChoseong(item.name, query))
})

const handleSelectCity = (cityName) => {
  emit('select-city', cityName)
}
</script>

<template>
  <div class="flex h-[var(--panel-height)] flex-col">
    <div class="mb-4 shrink-0">
      <p v-if="!searchQuery.trim()" class="text-sm text-gray-500">
        전체 도시 목록을 보여줍니다.
      </p>
      <p v-else-if="filteredWeatherList.length > 0" class="text-sm font-medium text-blue-600">
        '{{ searchQuery }}'에 대한 검색 결과: {{ filteredWeatherList.length }}건
      </p>
      <p v-else class="text-sm text-red-500">일치하는 도시가 없습니다.</p>
    </div>

    <ScrollArea v-if="filteredWeatherList.length > 0" class="min-h-0 flex-1 pr-3">
      <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
        <li v-for="item in filteredWeatherList" :key="item.id">
          <WeatherCard
            :name="item.name"
            :temp="item.temp"
            :status="item.status"
            @select-city="handleSelectCity"
          />
        </li>
      </ul>
    </ScrollArea>
  </div>
</template>
