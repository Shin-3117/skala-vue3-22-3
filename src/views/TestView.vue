<script setup>
import { ref } from 'vue'

const showComponent = ref(false)
</script>
<template>
  <h1>실습</h1>
  <ComputedEx />
  <br />
  <Button variant="outline" @click="showComponent = !showComponent">
    {{ showComponent ? '컴포넌트 제거' : '컴포넌트 추가' }}
  </Button>
  <ComponentLifecycleHookExample v-if="showComponent" />
  <br />
  <PE1P />
  <br />
  <PropsEmitsParent />
</template>
