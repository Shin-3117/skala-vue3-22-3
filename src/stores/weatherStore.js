import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  weatherDataList,
  fetchAllCitiesWeather,
  getCityByIdOrName as findCity,
} from '@/data/weatherData.js'

export const useWeatherStore = defineStore('weather', () => {
  const weatherList = ref(weatherDataList)
  const isLoading = ref(false)
  const isLoaded = ref(false)
  const error = ref(null)
  const lastUpdated = ref(null)

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

  function getCityByIdOrName(query) {
    return findCity(query, weatherList.value)
  }

  return {
    weatherList,
    isLoading,
    isLoaded,
    error,
    lastUpdated,
    fetchWeather,
    getCityByIdOrName,
  }
})
