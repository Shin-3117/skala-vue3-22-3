<script setup>
import { onMounted, ref, watch } from 'vue'
import { Card } from '@/components/ui/card/index.js'
import mapSvg from './map.svg?raw'

const emit = defineEmits(['select-region'])
const props = defineProps({ selectedCity: { type: String, default: '' } })
const svgWrapper = ref(null)
const selectedRegion = ref('')

const regionLabels = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
  '강원',
]

let paths = []

const updateActiveRegion = (regionName) => {
  if (!paths.length) return

  paths.forEach((path) => {
    const pathRegion = path.getAttribute('data-region')
    const isActive = pathRegion === regionName
    path.classList.toggle('is-active', isActive)
  })
}
// 선택한 도시 변경시 watch로 지도 선택 변경
watch(
  () => props.selectedCity,
  (newValue) => {
    if (!newValue) {
      paths.forEach((path) => path.classList.remove('is-active'))
      selectedRegion.value = ''
      return
    }

    selectedRegion.value = newValue
    updateActiveRegion(newValue)
  },
  { immediate: true },
)

onMounted(() => {
  const wrapper = svgWrapper.value
  if (!wrapper) return

  paths = wrapper.querySelectorAll('path')

  paths.forEach((path, index) => {
    const label = regionLabels[index] || `지역 ${index + 1}`
    path.setAttribute('data-region', label)
    path.classList.add('map-path')

    path.addEventListener('mouseenter', () => {
      path.classList.add('is-hovered')
    })

    path.addEventListener('mouseleave', () => {
      path.classList.remove('is-hovered')
    })

    path.addEventListener('click', () => {
      paths.forEach((item) => item.classList.remove('is-active'))
      path.classList.add('is-active')
      selectedRegion.value = label
      emit('select-region', label)
    })
  })
})
</script>

<template>
  <Card class="map-card">
    <p>선택한 도시(selectedCityInfo) 변경시 watch로 지도 선택 변경</p>
    <div class="selection-panel">
      <p v-if="selectedRegion">선택한 지역: {{ selectedRegion }}</p>
      <p v-else>지도 위의 지역을 클릭해보세요.</p>
    </div>
    <div ref="svgWrapper" class="map-wrapper" v-html="mapSvg" />
  </Card>
</template>

<style scoped>
.map-card {
  width: 100%;
  max-width: 700px;
  /* 지도 높이 기준값. WeatherList 스크롤 영역이 이 높이를 넘지 않습니다. */
  height: var(--panel-height, 34rem);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 남은 공간만큼만 지도를 그려서 카드 높이가 늘어나지 않게 합니다. */
.map-wrapper {
  flex: 1;
  min-height: 0;
}

.map-wrapper :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.map-wrapper :deep(.map-path) {
  cursor: pointer;
  fill: #e5e7eb;
  stroke: #64748b;
  stroke-width: 1.2;
  transition:
    fill 0.2s ease,
    stroke 0.2s ease,
    stroke-width 0.2s ease;
}

.map-wrapper :deep(.map-path:hover),
.map-wrapper :deep(.map-path.is-hovered) {
  fill: #fbbf24;
  stroke: #92400e;
  stroke-width: 1.8;
}

.map-wrapper :deep(.map-path.is-active) {
  fill: #fb923c;
  stroke: #9a2c2c;
  stroke-width: 2.2;
}

.selection-panel {
  padding: 10px 12px;
  border-radius: 10px;
  background: #f8fafc;
  color: #334155;
  font-weight: 600;
}
</style>
