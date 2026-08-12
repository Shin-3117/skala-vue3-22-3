import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config',()=>{
  const unit = ref('celsius')

  const isFahrenheit = computed(() => unit.value === 'fahrenheit')

  function getTemp(temp) {
    if (unit.value === 'celsius') {
      return temp
    } else {
      return Math.round((temp * 9) / 5 + 32)
    }
  }
  function unitSymbol() {
    if (unit.value === 'celsius') {
      return '℃'
    } else {
      return '℉'
    }
  }
  function toggleUnit() {
    if (unit.value === 'celsius') {
      unit.value = 'fahrenheit'
    } else {
      unit.value = 'celsius'
    }
  }

  const theme = ref('system') // 화면모드: 'light' | 'dark' | 'system'

  const isDarkMode = computed(() => {
    if (theme.value === 'dark') {
      return true
    }

    if (theme.value === 'light') {
      return false
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  function applyTheme() {
    if (isDarkMode.value) {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }

  function setTheme(nextTheme) {
    theme.value = nextTheme
    applyTheme()
  }

  function toggleTheme() {
    if (isDarkMode.value) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  watch(theme, applyTheme)

  applyTheme()

  return {
    unit,
    theme,
    isFahrenheit,
    isDarkMode,
    getTemp,
    unitSymbol,
    toggleUnit,
    setTheme,
    toggleTheme,
  }
})
