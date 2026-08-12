import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config',()=>{
  const unit = ref('celsius')
  function unitSymbol() {
    if (unit.value === 'celsius') {
      return '℃'
    } else {
      return '℉'
    }
  }
  function toggleUnit(){
    if (unit.value === 'celsius') {
      unit.value = 'fahrenheit'
    } else {
      unit.value = 'celsius'
    }
  }

  const theme = ref('system') //화면 모드


  return { unitSymbol, toggleUnit }
})
