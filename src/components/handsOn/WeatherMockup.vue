<script setup>
import { ref } from 'vue'
import WeatherCard from './WeatherCard.vue'
const search = ref('')
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])
</script>

<template>
  <h1>과제 1: 날씨 (Mockup)</h1>
  <section class="weather-search">
    <form>
      <label for="city">도시 검색</label>
      <input type="text" v-model="search" id="city" placeholder="검색할 도시를 입력하세요" />
      <p>검색한 도시: {{ search }}</p>
    </form>
  </section>
  <section class="weather-list">
    <h2>날씨 목록</h2>
    <ul>
      <li v-for="item in weatherList" :key="item.id">
        <WeatherCard :name="item.name" :temp="item.temp" :status="item.status" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}

li {
  list-style: none;
  margin-bottom: 1rem;
}
</style>
