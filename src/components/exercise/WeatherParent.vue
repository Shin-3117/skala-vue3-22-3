<script setup>
import { ref, computed, onMounted } from 'vue'
import HeaderNav from './HeaderNav.vue'
import HeroWeatherBanner from './HeroWeatherBanner.vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherList from './WeatherList.vue'
import KoreaMap from './KoreaMap.vue'
import { useWeatherStore } from '@/stores/weatherStore'
import { Info, RefreshCw } from '@lucide/vue'

const weatherStore = useWeatherStore()

onMounted(() => {
  weatherStore.fetchWeather()
})

const searchQuery = ref('')
const selectedCityInfo = ref('')
const statusFilter = ref('ALL')

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
        description="전국 주요 도시 또는 한글 초성(ㅅㅇ, ㅂㅅ 등)을 입력하여 날씨를 실시간 조회하세요."
      >
        <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />

        <div class="mt-4 p-4 rounded-2xl bg-white/90 border border-slate-200 flex items-center justify-between text-xs sm:text-sm font-medium">
          <div class="flex items-center gap-2 text-slate-600">
            <Info class="w-4 h-4 text-sky-600" />
            <span>선택된 도시:</span>
            <span class="font-bold text-sky-700 px-2.5 py-0.5 rounded-lg bg-sky-100 border border-sky-200">
              {{ selectedCityInfo || '선택 없음 (전체 보기)' }}
            </span>
          </div>

          <button
            v-if="selectedCityInfo || searchQuery"
            @click="toggleSelection(selectedCityInfo)"
            class="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer font-bold"
          >
            선택 초기화
          </button>
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
        <p>© 2026 SkyCast Weather Intelligence. 모든 기상 정보는 실시간 갱신됩니다.</p>
        <div class="flex items-center gap-4">
          <span class="hover:text-slate-700 cursor-pointer">기상청 연동</span>
          <span>·</span>
          <span class="hover:text-slate-700 cursor-pointer">개인정보 처리방침</span>
          <span>·</span>
          <span class="hover:text-slate-700 cursor-pointer">도움말</span>
        </div>
      </footer>
    </article>
  </div>
</template>
