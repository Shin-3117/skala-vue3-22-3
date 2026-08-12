<script setup>
import PE1C from './PE1C.vue'

const handleChildEvent = (message) => {
  console.log('자식으로부터 받은 메시지:', message)
}
</script>
<template>
  <PE1C @childEvent="handleChildEvent" />
</template>
