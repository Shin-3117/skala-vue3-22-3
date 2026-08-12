<script setup>
const emit = defineEmits(['childEvent'])
const sendToParent = () => {
  emit('childEvent', '자식 컴포넌트에서 부모 컴포넌트로 전달')
}
</script>

<template>
  <div>
    <h2>Props & Emits</h2>
    <p>자식 컴포넌트에서 부모 컴포넌트로 이벤트 전달</p>
    <Button variant="outline" @click="sendToParent">부모 컴포넌트로 이벤트 전달</Button>
  </div>
</template>
