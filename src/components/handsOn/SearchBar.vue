<script setup>
import { computed } from 'vue'
import { Input } from '@/components/ui/input/index.js'
import { Label } from '@/components/ui/label/index.js'

const props = defineProps({
  searchQuery: { type: String, default: '' },
})
const emit = defineEmits(['update-query'])

const searchQueryProxy = computed({
  get: () => props.searchQuery,
  set: (value) => emit('update-query', value),
})
</script>

<template>
  <div class="grid w-full max-w-md gap-2">
    <Label for="weather-search">도시 검색</Label>
    <Input
      id="weather-search"
      type="text"
      v-model="searchQueryProxy"
      placeholder="검색할 도시를 입력하세요"
      class="w-full"
    />
  </div>
</template>
