<script setup>
import dayjs from "dayjs";
import { ref } from "vue";

// 작품명, 전체 단수
const name = ref("");
const total = ref(0);

// 작품 저장 배열, 초기엔 빈 배열
const crochets = ref(JSON.parse(localStorage.getItem("crochets")) || []);

// 작품 추가
const addCrochet = () => {
  if (!name.value || !total.value) return;

  const newCrochet = {
    id: Date.now(),
    name: name.value,
    current: 0,
    total: Number(total.value),
    createdAt: Date.now(),
  };
  crochets.value.push(newCrochet);

  // localStorage에 저장
  saveCrochets();

  // 초기화
  name.value = "";
  total.value = 0;
};

const incRow = (id) => {
  const item = crochets.value.find((c) => c.id === id);
  if (item.current == item.total) return;
  item.current++;
  saveCrochets();
};

const decRow = (id) => {
  const item = crochets.value.find((c) => c.id === id);
  if (item.current > 0) item.current--;
  saveCrochets();
};

const saveCrochets = () => {
  localStorage.setItem("crochets", JSON.stringify(crochets.value));
};

// 전체 목록초기화
const resetCrochet = () => {
  localStorage.removeItem("crochets");
  crochets.value = [];
};
</script>

<template>
  <h1>뜨개 단 수 세기</h1>
  <div>
    <input type="text" v-model="name" placeholder="작품 이름" />
    <input type="number" v-model="total" placeholder="전체 단수" />
    <button @click="addCrochet">추가</button>
  </div>
  <ul>
    <li v-for="p in crochets" :key="p.id">
      {{ p.name }} {{ p.current }} / {{ p.total }}
      <button @click="decRow(p.id)" :disabled="p.current == 0">-</button>
      <button @click="incRow(p.id)" :disabled="p.total == p.current">+</button>
      {{ dayjs(p.createdAt).format("YYYY-MM-DD HH:mm") }}
    </li>
  </ul>
  <button @click="resetCrochet">초기화</button>
</template>

<style lang="scss"></style>
