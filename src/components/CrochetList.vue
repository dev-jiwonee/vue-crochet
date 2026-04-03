<script setup>
import CrochetItem from "./CrochetItem.vue";

const { crochets, selectedId } = defineProps(["crochets", "selectedId"]);
const emit = defineEmits(["select"]);
</script>
<template>
  <div>
    <div class="card-title">
      <p class="title">전체 뜨개 목록</p>
    </div>
    <ul class="card-list">
      <li v-for="c in crochets" :key="c.id">
        <CrochetItem
          :crochet="c"
          :active="selectedId === c.id"
          @select="emit('select', $event)"
        />
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.card-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
</style>
