<!-- EventModifierExample -->

<script setup>
const handleLink = () => {
  alert('a tag 이동 방지')
}
const handleBox = () => {
  alert('부모 박스 box click')
}
const handleChild1 = () => {
  alert('자식 박스1 click')
}
const handleChild2 = () => {
  alert('자식 박스2 click')
}
</script>
<template>
  <div>
    <h1>Event Modifier Example</h1>
    <a href="https://www.naver.com" @click.prevent="handleLink">네이버 이동</a>
    <div class="box" @click="handleBox">
      부모 박스
      <div class="child1" @click="handleChild1">자식 박스1</div>
      <div class="child2" @click.stop="handleChild2">자식 박스2</div>
    </div>
  </div>
</template>
<style>
.box {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
}
.child1,
.child2 {
  border: 1px solid #aaa;
  padding: 5px;
  margin: 5px 0;
}
</style>
