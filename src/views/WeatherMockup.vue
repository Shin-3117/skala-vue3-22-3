<script setup>
import { ref } from 'vue'
import WeatherCard from '@/components/handsOn/WeatherCard.vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card/index.js'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import { Input } from '@/components/ui/input/index.js'
import { Label } from '@/components/ui/label/index.js'
const search = ref('')

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '부산', temp: 26, status: '구름' },
  { id: 'city_03', name: '대구', temp: 30, status: '맑음' },
  { id: 'city_04', name: '인천', temp: 22, status: '비' },
  { id: 'city_05', name: '광주', temp: 27, status: '구름' },
  { id: 'city_06', name: '대전', temp: 24, status: '맑음' },
  { id: 'city_07', name: '울산', temp: 25, status: '구름' },
  { id: 'city_08', name: '세종', temp: 23, status: '비' },
  { id: 'city_09', name: '제주', temp: 29, status: '맑음' },
  { id: 'city_10', name: '강릉', temp: 21, status: '비' },
  { id: 'city_11', name: '춘천', temp: 20, status: '구름' },
  { id: 'city_12', name: '전주', temp: 25, status: '맑음' },
  { id: 'city_13', name: '포항', temp: 24, status: '구름' },
  { id: 'city_14', name: '김해', temp: 27, status: '맑음' },
  { id: 'city_15', name: '원주', temp: 22, status: '비' },
])
</script>

<template>
  <article class="flex flex-col gap-8 p-8">
    <h1>과제 1: 날씨 (Mockup)</h1>

    <section>
      <Card class="p-4">
        <form>
          <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label for="city">도시 검색</Label>
            <Input type="text" v-model="search" id="city" placeholder="검색할 도시를 입력하세요" />
          </div>
          <p>검색한 도시: {{ search }}</p>
        </form>
      </Card>
    </section>
    <section>
      <Card>
        <CardHeader>
          <CardTitle>날씨 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="grid grid-cols-4 gap-4">
            <li v-for="item in weatherList" :key="item.id">
              <WeatherCard :name="item.name" :temp="item.temp" :status="item.status" />
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  </article>
</template>
