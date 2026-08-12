<script setup>
import Button from '@/components/ui/button/Button.vue'
import WeatherBadge from './WeatherBadge.vue'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card/index.js'

const props = defineProps({
  name: { type: String, required: true },
  temp: { type: Number, required: true },
  status: { type: String, required: true },
  isSelected: { type: Boolean, default: false },
})
const emit = defineEmits(['select-city'])

const handleSelect = (event) => {
  if (event?.target?.closest('button')) {
    return
  }
  emit('select-city', props.name)
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>
<template>
  <Card
    class="cursor-pointer transition-all duration-200 hover:shadow-lg"
    :class="
      props.isSelected
        ? 'border-blue-500 bg-blue-50 shadow-md'
        : 'border-gray-200'
    "
    @click="handleSelect"
  >
    <CardHeader class="pb-2">
      <div class="flex justify-between items-center">
        <CardTitle class="text-lg">{{ props.name }}</CardTitle>
        <WeatherBadge :temp="props.temp" />
      </div>
    </CardHeader>
    <CardContent>
      <div class="text-sm text-gray-600 mb-4">
        <p>온도: <span class="font-bold text-gray-900">{{ props.temp }}°C</span></p>
        <p>상태: <span class="font-medium">{{ props.status }}</span></p>
      </div>
      <Button variant="outline" size="sm" class="w-full" @click.stop="showDetail(props.name, props.status)">상세보기</Button>
    </CardContent>
  </Card>
</template>
