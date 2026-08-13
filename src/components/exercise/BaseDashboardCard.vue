<script setup>
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card/index.js'
import { Layers } from '@lucide/vue'

const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
})
</script>

<template>
  <Card class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-sky-100 dark:border-slate-800 shadow-xl overflow-hidden text-slate-800 dark:text-slate-100">
    <CardHeader class="pb-3 border-b border-slate-100 dark:border-slate-800 bg-sky-50/40 dark:bg-slate-800/40">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-200 dark:border-sky-800">
          <Layers class="w-4 h-4" />
        </div>
        <div>
          <CardTitle class="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{{ props.title }}</CardTitle>
          <CardDescription v-if="props.description" class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{{ props.description }}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent class="p-6">
      <slot />
    </CardContent>
  </Card>
</template>
