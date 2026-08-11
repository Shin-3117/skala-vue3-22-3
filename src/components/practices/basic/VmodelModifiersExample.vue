<script setup>
import { ref } from 'vue'

const lazyInput = ref('')
const age = ref('')
const userEmail = ref('')
const price = ref('')
</script>

<template>
  <input v-model.lazy="lazyInput" />
  <p>lazyInput: {{ lazyInput }}</p>
  <br />
  <input v-model.number="age" />
  <p>age: {{ age }}</p>
  <p>data type: {{ typeof age }}</p>
  <br />
  <input v-model.trim="userEmail" />
  <p>userEmail: {{ userEmail }}</p>
  <p>length: {{ userEmail.length }}</p>
  <br />
  <input v-model.lazy.number="price" />
  <p>price: {{ price }}</p>
  <p>data type: {{ typeof price }}</p>
</template>
