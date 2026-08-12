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
  <div class="flex flex-col gap-2">
    <Label for="weather-search" class="text-sm font-medium text-gray-700">도시 검색</Label>
    <div class="relative">
      <Input
        id="weather-search"
        type="text"
        v-model="searchQueryProxy"
        placeholder="예: 서울, ㅅㅇ (초성 검색 가능)"
        class="w-full pl-4 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <div v-if="searchQueryProxy" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <button
          @click="searchQueryProxy = ''"
          class="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>
