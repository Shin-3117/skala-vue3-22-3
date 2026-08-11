<script setup>
import { ref } from 'vue'
const text1 = ref('')
const text2 = ref('')
// from data
const comment = ref('')
const isAgreed = ref(false) // 단일 체크박스는 Boolean
const favoriteFruits = ref([]) // 다중 체크박스는 반드시 배열([])로 시작!
const gender = ref('')
const selectedCar = ref('')
</script>

<template>
  <div>
    <h2>v-model 양방향 데이터 바인딩</h2>
    <h3>1) v-model 축약 문법 (양방향)</h3>
    <input type="text" v-model="text1" placeholder="text1 입력" />
    <p>text1: {{ text1 }}</p>
    <h3>2) v-model 내부 작동 원리 (단방향+이벤트)</h3>
    <p>---</p>
    <input
      type="text"
      :value="text2"
      @input="(e) => (text2 = e.target.value)"
      placeholder="text2 입력"
    />
    <p>text2: {{ text2 }}</p>
  </div>
  <div>
    <h2>Form Data Binding</h2>
    <h3>1) 단일 체크박스 (Boolean)</h3>
    <input type="checkbox" v-model="isAgreed" /> 약관 동의
    <p>약관 동의 여부: {{ isAgreed }}</p>
    <h3>2) 다중 체크박스 (Array)</h3>
    <input type="checkbox" value="사과" v-model="favoriteFruits" /> 사과
    <input type="checkbox" value="바나나" v-model="favoriteFruits" /> 바나나
    <input type="checkbox" value="포도" v-model="favoriteFruits" /> 포도
    <p>좋아하는 과일: {{ favoriteFruits }}</p>
    <h3>3) 라디오 버튼 (String)</h3>
    <input type="radio" value="남성" v-model="gender" /> 남성
    <input type="radio" value="여성" v-model="gender" /> 여성
    <p>성별: {{ gender }}</p>
    <h3>4) select box (String)</h3>
    <select v-model="selectedCar">
      <option value="">선택</option>
      <option value="현대">현대</option>
      <option value="기아">기아</option>
      <option value="테슬라">테슬라</option>
    </select>
    <p>선택한 자동차: {{ selectedCar }}</p>
    <h3>5) textarea (String)</h3>
    <textarea v-model="comment" placeholder="댓글을 입력하세요"></textarea>
    <p style="white-space: pre-wrap">댓글: {{ comment }}</p>
  </div>
</template>
