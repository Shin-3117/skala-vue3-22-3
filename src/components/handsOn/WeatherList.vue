<script setup>
import { computed } from 'vue'
import WeatherCard from './WeatherCard.vue'

const props = defineProps({
  weatherList: { type: Array, required: true },
  searchQuery: { type: String, default: '' },
})
const emit = defineEmits(['select-city'])

const filteredWeatherList = computed(() => {
  const query = props.searchQuery.trim().toLowerCase()
  if (!query) return props.weatherList

  return props.weatherList.filter((item) => item.name.toLowerCase().includes(query))
})

const handleSelectCity = (cityName) => {
  emit('select-city', cityName)
}
</script>

<template>
  <div>
    <p v-if="!searchQuery.trim()" class="mb-4 text-sm text-gray-500">
      검색어가 없으면 전체 도시 목록을 표시합니다.
    </p>
    <p v-else-if="filteredWeatherList.length > 0" class="mb-4 text-sm text-gray-500">
      {{ searchQuery }}에 대한 검색 결과 {{ filteredWeatherList.length }}건입니다.
    </p>
    <p v-else class="mb-4 text-sm text-gray-500">검색 결과가 일치하는 도시가 없습니다.</p>

    <ul
      v-if="filteredWeatherList.length > 0"
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <li v-for="item in filteredWeatherList" :key="item.id">
        <WeatherCard
          :name="item.name"
          :temp="item.temp"
          :status="item.status"
          @select-city="handleSelectCity"
        />
      </li>
    </ul>
  </div>
</template>
