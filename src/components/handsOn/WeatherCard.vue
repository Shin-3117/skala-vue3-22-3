<script setup>
import WeatherBadge from './WeatherBadge.vue'

const props = defineProps(['name', 'temp', 'status'])
</script>
<template>
  <div class="weather-card">
    <p>{{ props.name }}</p>
    <p>온도: {{ props.temp }}°C</p>
    <p>상태: {{ props.status }}</p>
    <WeatherBadge :temp="props.temp" />
  </div>
</template>

<style scoped>
.weather-card {
  border: 1px solid #ccc;
  padding: 2rem;
}
</style>
