<script setup>
import { onMounted, ref, watch } from 'vue'
import { Card } from '@/components/ui/card/index.js'
import mapSvg from './map.svg?raw'
import { Map, MapPin, Navigation } from '@lucide/vue'

const emit = defineEmits(['select-region'])
const props = defineProps({ selectedCity: { type: String, default: '' } })
const svgWrapper = ref(null)

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

// 빈 문자열이 들어오면 일치하는 지역이 없으므로 모든 선택이 해제됩니다.
const updateActiveRegion = (regionName) => {
  if (!paths.length) return

  paths.forEach((path) => {
    const pathRegion = path.getAttribute('data-region')
    const isActive = pathRegion === regionName
    path.classList.toggle('is-active', isActive)
  })
}

// 선택한 도시 변경시 watch로 지도 선택 변경
watch(() => props.selectedCity, updateActiveRegion)

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

    // 선택 여부는 부모가 결정합니다. (이미 선택된 지역이면 부모가 선택을 해제)
    path.addEventListener('click', () => {
      emit('select-region', label)
    })
  })

  // paths가 준비된 뒤 현재 선택 상태를 한 번 반영합니다.
  updateActiveRegion(props.selectedCity)
})
</script>

<template>
  <Card class="map-card glass-card border border-slate-200 rounded-2xl bg-white/80">
    <div class="selection-panel flex items-center justify-between">
      <div class="flex items-center gap-2 text-sm font-bold text-slate-800">
        <Map class="w-4 h-4 text-sky-600" />
        <span v-if="props.selectedCity" class="text-sky-700 flex items-center gap-1">
          <MapPin class="w-4 h-4 text-amber-500 " />
          <span class="font-extrabold text-slate-900">{{ props.selectedCity }}</span> 선택됨
        </span>
        <span v-else class="text-slate-500 flex items-center gap-1.5 font-medium">
          <Navigation class="w-4 h-4 text-sky-500 " />
          지도의 지역을 클릭해보세요.
        </span>
      </div>

      <div v-if="props.selectedCity" class="text-xs font-semibold text-slate-500 bg-sky-50 px-2.5 rounded-lg border border-sky-100">
        다시 클릭 시 해제
      </div>
    </div>

    <div ref="svgWrapper" class="map-wrapper" v-html="mapSvg" />
  </Card>
</template>

<style scoped>
.map-card {
  width: 100%;
  max-width: 700px;
  height: var(--panel-height);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
}

/* 남은 공간만큼만 지도를 그려서 카드 높이가 늘어나지 않게 합니다. */
.map-wrapper {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-wrapper :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  filter: drop-shadow(0 4px 12px rgba(14, 165, 233, 0.08));
}

.map-wrapper :deep(.map-path) {
  cursor: pointer;
  fill: #e2e8f0;
  stroke: #94a3b8;
  stroke-width: 1.2;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.map-wrapper :deep(.map-path:hover),
.map-wrapper :deep(.map-path.is-hovered) {
  fill: #38bdf8;
  stroke: #0284c7;
  stroke-width: 2;
  filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.5));
}

.map-wrapper :deep(.map-path.is-active) {
  fill: #f59e0b;
  stroke: #d97706;
  stroke-width: 2.5;
  filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.7));
}

.selection-panel {
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(241, 245, 249, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.9);
}
</style>
