<!-- ComponentLifecycleHookExample -->
<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const count = ref(0)
let timerId = null

console.log('1. setup 컴포넌트 메모리 생성')
onMounted(() => {
  console.log('2. onMounted: 컴포넌트 화면에 마운트 완료')
  timerId = setInterval(() => {
    count.value++
  }, 3000)
})
onUpdated(() => {
  console.log(`3. onUpdated: 컴포넌트 화면이 업데이트 완료 count: ${count.value}`)
})
onUnmounted(() => {
  clearInterval(timerId)
  console.log('4. onUnmounted: 컴포넌트 화면에서 제거됨. 타이머 정리')
})
</script>
<template>
  <div>
    <h2>컴포넌트 라이프사이클 훅 예제</h2>
    <p>count: {{ count }}</p>
  </div>
</template>
