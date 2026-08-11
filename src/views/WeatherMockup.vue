<script setup>
import { computed, ref, watchEffect } from 'vue'
import WeatherCard from '@/components/handsOn/WeatherCard.vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card/index.js'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import { Input } from '@/components/ui/input/index.js'
import { Label } from '@/components/ui/label/index.js'
import Map from '@/components/handsOn/Map.vue'

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
// computed -> searchQuery 변경에 따라 날씨 목록 변경 (filteredWeatherList)
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return weatherList.value
  }

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

watchEffect(() => {
  console.log('watchEffect:', {
    searchQuery: searchQuery.value,
    selectedCityInfo: selectedCityInfo.value,
    listCount: weatherList.value.length,
    filteredCount: filteredWeatherList.value.length,
  })
})
</script>

<template>
  <article class="flex flex-col gap-8 p-8">
    <h1>과제 1: 날씨 (Mockup)</h1>

    <section>
      <Card class="p-4">
        <form>
          <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label for="city">도시 검색</Label>
            <Input
              type="text"
              v-model="searchQuery"
              id="city"
              placeholder="검색할 도시를 입력하세요"
            />
          </div>
          <p>선택한 도시: {{ selectedCityInfo }}</p>
          <p>computed : 도시 검색(searchQuery) 변경에 따라 날씨 목록(filteredWeatherList) 변경</p>
        </form>
      </Card>
    </section>
    <section>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Map :selected-city="selectedCityInfo" @select-region="handleRegionSelect" />

        <Card>
          <CardHeader>
            <CardTitle>날씨 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <p v-if="!searchQuery.trim()" class="mb-4 text-sm text-gray-500">
              검색어가 없으면 전체 도시 목록을 표시합니다.
            </p>
            <p v-else-if="filteredWeatherList.length > 0" class="mb-4 text-sm text-gray-500">
              {{ searchQuery }}에 대한 검색 결과 {{ filteredWeatherList.length }}건입니다.
            </p>
            <p v-else class="mb-4 text-sm text-gray-500">검색 결과가 일치하는 도시가 없습니다.</p>

            <ul
              v-if="filteredWeatherList.length > 0"
              class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <li v-for="item in filteredWeatherList" :key="item.id">
                <WeatherCard
                  :name="item.name"
                  :temp="item.temp"
                  :status="item.status"
                  @select-city="handleCitySelect"
                />
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  </article>
</template>
