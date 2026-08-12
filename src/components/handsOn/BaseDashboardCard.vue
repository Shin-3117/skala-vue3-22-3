<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ props.title }}</CardTitle>
      <CardDescription v-if="props.description">{{ props.description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
  </Card>
</template>
