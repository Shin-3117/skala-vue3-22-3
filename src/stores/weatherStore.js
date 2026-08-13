import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  weatherDataList,
  fetchAllCitiesWeather,
  getCityByIdOrName as findCity,
} from '@/data/weatherData.js'
import { detectUserLocation } from '@/lib/location.js'

export const useWeatherStore = defineStore('weather', () => {
  const weatherList = ref(weatherDataList)
  const isLoading = ref(false)
  const isLoaded = ref(false)
  const error = ref(null)
  const lastUpdated = ref(null)

  // 사용자 위치 자동 감지 상태
  const userLocation = ref(null)
  const isDetectingLocation = ref(false)

  async function fetchWeather(force = false) {
    if (isLoading.value) return
    if (isLoaded.value && !force) return

    isLoading.value = true
    error.value = null

    try {
      const data = await fetchAllCitiesWeather()
      weatherList.value = data
      isLoaded.value = true
      lastUpdated.value = new Date()
    } catch (err) {
      error.value = 'OpenWeather 2.5 API 날씨 데이터를 가져오는데 실패했습니다.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  // 사용자 위치 자동 감지 및 17개 지역 중 가장 가까운 지역 매핑
  async function detectAndSelectLocation() {
    isDetectingLocation.value = true
    try {
      const location = await detectUserLocation()
      userLocation.value = location
      return location.nearestRegion
    } catch (err) {
      console.error('사용자 위치 감지 오류:', err)
      return null
    } finally {
      isDetectingLocation.value = false
    }
  }

  function getCityByIdOrName(query) {
    return findCity(query, weatherList.value)
  }

  return {
    weatherList,
    isLoading,
    isLoaded,
    error,
    lastUpdated,
    userLocation,
    isDetectingLocation,
    fetchWeather,
    detectAndSelectLocation,
    getCityByIdOrName,
  }
})
