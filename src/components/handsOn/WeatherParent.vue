<script setup>
import { ref } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherList from './WeatherList.vue'
import KoreaMap from './KoreaMap.vue'

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
  <article class="max-w-6xl mx-auto flex flex-col gap-8 p-6 md:p-10">
    <header class="mb-4">
      <h1 class="text-3xl font-bold text-gray-900">날씨 대시보드</h1>
      <p class="text-gray-600 mt-2">전국 주요 도시의 날씨 정보를 확인하세요.</p>
    </header>

    <BaseDashboardCard title="날씨 검색" description="조회하고 싶은 도시를 입력하세요.">
      <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />
      <div class="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
        선택한 도시: <span class="font-semibold text-blue-600">{{ selectedCityInfo || '없음' }}</span>
      </div>
    </BaseDashboardCard>

    <BaseDashboardCard
      title="지역별 날씨"
      description="지도에서 선택하거나 목록에서 도시를 선택하세요."
    >
      <!-- --panel-height: 지도와 날씨 목록이 공유하는 높이 기준값 -->
      <section class="grid grid-cols-1 gap-6 lg:grid-cols-2 [--panel-height:34rem]">
        <KoreaMap :selected-city="selectedCityInfo" @select-region="handleRegionSelect" />
        <WeatherList
          :weather-list="weatherList"
          :search-query="searchQuery"
          @select-city="handleCitySelect"
        />
      </section>
    </BaseDashboardCard>
  </article>
</template>
