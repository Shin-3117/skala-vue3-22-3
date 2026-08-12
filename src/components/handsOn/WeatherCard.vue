<script setup>
import Button from '@/components/ui/button/Button.vue'
import WeatherBadge from './WeatherBadge.vue'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card/index.js'

const props = defineProps(['name', 'temp', 'status'])
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
  <Card class="cursor-pointer" @click="handleSelect">
    <CardHeader>
      <CardTitle>{{ props.name }}</CardTitle>
      <CardDescription><WeatherBadge :temp="props.temp" /></CardDescription>
    </CardHeader>
    <CardContent>
      <p>온도: {{ props.temp }}°C</p>
      <p>날씨: {{ props.status }}</p>
      <Button @click.stop="showDetail(props.name, props.status)">상세보기</Button>
    </CardContent>
  </Card>
</template>
