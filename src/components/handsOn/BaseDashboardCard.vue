<script setup>
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card/index.js'
import { Layers } from '@lucide/vue'

const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
})
</script>

<template>
  <Card class="bg-white/80 backdrop-blur-md rounded-3xl border border-sky-100 shadow-xl overflow-hidden">
    <CardHeader class="pb-3 border-b border-slate-100 bg-sky-50/40">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center border border-sky-200">
          <Layers class="w-4 h-4" />
        </div>
        <div>
          <CardTitle class="text-xl font-black text-slate-900 tracking-tight">{{ props.title }}</CardTitle>
          <CardDescription v-if="props.description" class="text-xs text-slate-500 font-medium mt-0.5">{{ props.description }}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent class="p-6">
      <slot />
    </CardContent>
  </Card>
</template>
