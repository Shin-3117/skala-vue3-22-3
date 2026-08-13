<script setup>
import { ref, computed, onMounted } from 'vue'
import HeaderNav from './HeaderNav.vue'
import HeroWeatherBanner from './HeroWeatherBanner.vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherList from './WeatherList.vue'
import KoreaMap from './KoreaMap.vue'
import { useWeatherStore } from '@/stores/weatherStore'
import { Info, RefreshCw, Navigation, Compass } from '@lucide/vue'

const weatherStore = useWeatherStore()

const searchQuery = ref('')
const selectedCityInfo = ref('')
const statusFilter = ref('ALL')

onMounted(async () => {
  weatherStore.fetchWeather()

  // 앱 진입 시 사용자가 도시를 선택하지 않은 상태라면, 현재 접속 위치(GPS/IP) 자동 감지 후 해당 지역 선택
  if (!selectedCityInfo.value) {
    const nearest = await weatherStore.detectAndSelectLocation()
    if (nearest?.name) {
      selectedCityInfo.value = nearest.name
    }
  }
})

const weatherList = computed(() => weatherStore.weatherList)

const featuredCity = computed(() => {
  if (selectedCityInfo.value) {
    const found = weatherList.value.find((c) => c.name === selectedCityInfo.value)
    if (found) return found
  }
  return weatherList.value[0] || { name: '서울', temp: 25, status: '맑음' }
})

// 목록/지도 공통 선택 처리
const toggleSelection = (name) => {
  const isAlreadySelected = selectedCityInfo.value === name
  statusFilter.value = 'ALL' // 선택 시 필터 초기화
  selectedCityInfo.value = isAlreadySelected ? '' : name
  searchQuery.value = isAlreadySelected ? '' : name
}

const handleUpdateQuery = (query) => {
  searchQuery.value = query
  if (!query.trim()) {
    selectedCityInfo.value = ''
  }
}

const handleFilterStatus = (filterKey) => {
  statusFilter.value = filterKey
  selectedCityInfo.value = ''
  searchQuery.value = ''
}

const handleReDetectLocation = async () => {
  const nearest = await weatherStore.detectAndSelectLocation()
  if (nearest?.name) {
    statusFilter.value = 'ALL'
    selectedCityInfo.value = nearest.name
    searchQuery.value = nearest.name
  }
}

const refreshWeather = () => {
  weatherStore.fetchWeather(true)
}
</script>

<template>
  <div class="min-h-screen bg-sky-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-10">
    <article class="max-w-7xl mx-auto flex flex-col gap-6">
      <!-- 1. Global Header Navigation -->
      <HeaderNav />

      <!-- 2. Hero Featured Weather Banner -->
      <HeroWeatherBanner
        :featured-city="featuredCity"
        :status-filter="statusFilter"
        @filter-status="handleFilterStatus"
      />

      <!-- 3. Weather Search Section -->
      <BaseDashboardCard
        title="날씨 빠른 검색"
        description="전국 주요 도시 또는 한글 초성(ㅅㅇ, ㅂㅅ 등)을 입력하거나, 내 위치 감지 버튼으로 접속 위치 날씨를 바로 조회하세요."
      >
        <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />

        <div class="mt-4 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-medium">
          <div class="flex flex-wrap items-center gap-2 text-slate-600 dark:text-slate-300">
            <Info class="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
            <span>선택된 도시:</span>
            <span class="font-bold text-sky-700 dark:text-sky-300 px-2.5 py-0.5 rounded-lg bg-sky-100 dark:bg-sky-950 border border-sky-200 dark:border-sky-800">
              {{ selectedCityInfo || '선택 없음 (전체 보기)' }}
            </span>

            <!-- 내 위치 감지 정보 뱃지 -->
            <span
              v-if="weatherStore.userLocation && selectedCityInfo === weatherStore.userLocation.nearestRegion?.name"
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold animate-fade-in"
            >
              <Compass class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>내 위치 감지 ({{ weatherStore.userLocation.source }})</span>
            </span>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <button
              @click="handleReDetectLocation"
              :disabled="weatherStore.isDetectingLocation"
              class="text-xs text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-200 font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 transition-all cursor-pointer disabled:opacity-50"
              title="현재 내 접속 위치 재감지"
            >
              <Navigation class="w-3.5 h-3.5" :class="{ 'animate-spin': weatherStore.isDetectingLocation }" />
              <span>{{ weatherStore.isDetectingLocation ? '위치 감지 중...' : '내 위치 찾기' }}</span>
            </button>

            <button
              v-if="selectedCityInfo || searchQuery"
              @click="toggleSelection(selectedCityInfo)"
              class="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer font-bold"
            >
              선택 초기화
            </button>
          </div>
        </div>
      </BaseDashboardCard>

      <!-- 4. Regional Map & List Grid -->
      <BaseDashboardCard
        title="대한민국 인터랙티브 지역별 날씨"
        description="지도에서 지역을 직접 클릭하거나 도시 목록에서 선택 후 '상세 페이지' 버튼을 누르시면 동적 상세 페이지로 이동합니다."
      >
        <section class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <KoreaMap :selected-city="selectedCityInfo" @select-region="toggleSelection" />
          <WeatherList
            :weather-list="weatherList"
            :search-query="searchQuery"
            :selected-city="selectedCityInfo"
            :status-filter="statusFilter"
            @select-city="toggleSelection"
          />
        </section>
      </BaseDashboardCard>

      <!-- 5. Footer -->
      <footer class="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-500 font-medium flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 SkyCast Weather Intelligence.</p>
        <button
          @click="refreshWeather"
          class="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw class="w-3.5 h-3.5" :class="{ 'animate-spin': weatherStore.isLoading }" />
          <span>날씨 데이터 새로고침</span>
        </button>
      </footer>
    </article>
  </div>
</template>
