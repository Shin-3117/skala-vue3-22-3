<script setup>
import { computed } from 'vue'

const props = defineProps(['temp'])

const temperatureLabel = computed(() => {
  return props.temp >= 25 ? '🔥 더움 (25도 이상)' : '❄️ 선선함 (25도 미만)'
})
</script>
<template>
  <div class="weather-badge">
    <p class="label">{{ temperatureLabel }}</p>
  </div>
</template>

<style scoped>
.weather-badge {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
}

.label {
  font-weight: 700;
}
</style>
