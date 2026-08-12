<script setup>
import { computed, ref, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherList from './WeatherList.vue'
import Map from './Map.vue'

const searchQuery = ref('')
const selectedCityInfo = ref('')
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '부산', temp: 24, status: '구름많음' },
  { id: 'city_03', name: '대구', temp: 31, status: '맑음' },
  { id: 'city_04', name: '인천', temp: 27, status: '맑음' },
  { id: 'city_05', name: '광주', temp: 29, status: '비' },
  { id: 'city_06', name: '대전', temp: 28, status: '맑음' },
  { id: 'city_07', name: '울산', temp: 27, status: '구름많음' },
  { id: 'city_08', name: '세종', temp: 28, status: '맑음' },
  { id: 'city_09', name: '경기', temp: 27, status: '흐림' },
  { id: 'city_10', name: '충북', temp: 29, status: '맑음' },
  { id: 'city_11', name: '충남', temp: 28, status: '구름많음' },
  { id: 'city_12', name: '전북', temp: 29, status: '비' },
  { id: 'city_13', name: '전남', temp: 30, status: '흐림' },
  { id: 'city_14', name: '경북', temp: 30, status: '맑음' },
  { id: 'city_15', name: '경남', temp: 28, status: '구름많음' },
  { id: 'city_16', name: '제주', temp: 24, status: '소나기' },
  { id: 'city_17', name: '강원', temp: 23, status: '흐림' },
])

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return weatherList.value

  return weatherList.value.filter((item) => item.name.toLowerCase().includes(query))
})

const handleCitySelect = (cityName) => {
  selectedCityInfo.value = cityName
  searchQuery.value = cityName
}

const handleRegionSelect = (regionName) => {
  selectedCityInfo.value = regionName
  searchQuery.value = regionName
}

const handleUpdateQuery = (query) => {
  searchQuery.value = query
  if (!query.trim()) {
    selectedCityInfo.value = ''
  }
}

// watchEffect(() => {
//   console.log('watchEffect:', {
//     searchQuery: searchQuery.value,
//     selectedCityInfo: selectedCityInfo.value,
//     listCount: weatherList.value.length,
//     filteredCount: filteredWeatherList.value.length,
//   })
// })
</script>

<template>
  <article class="flex flex-col gap-8 p-8">
    <BaseDashboardCard title="날씨 검색창" description="도시명으로 검색하세요">
      <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />
      <p class="mt-3 text-sm text-gray-500">선택한 도시: {{ selectedCityInfo || '없음' }}</p>
    </BaseDashboardCard>
    <BaseDashboardCard
      title="날씨 목록"
      description="검색어에 따라 필터링된 도시 목록을 표시합니다."
    >
      <section class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Map :selected-city="selectedCityInfo" @select-region="handleRegionSelect" />
        <WeatherList
          :weather-list="weatherList"
          :search-query="searchQuery"
          @select-city="handleCitySelect"
        />
      </section>
    </BaseDashboardCard>
  </article>
</template>
