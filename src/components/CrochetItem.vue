<script setup>
const { crochet, active } = defineProps(["crochet", "active"]);
</script>
<template>
  <button class="card" :class="{ active }" @click="$emit('select', crochet.id)">
    <div class="card__top">
      <p class="name">{{ crochet.name }}</p>
      <p class="percent">
        {{ Math.round((crochet.current / crochet.total) * 100) + "%" }}
      </p>
    </div>
    <div class="card__bottom">
      <p class="count">{{ crochet.current }} / {{ crochet.total }}</p>
      <div class="progress">
        <div
          class="progress-bar"
          :style="{
            width: (crochet.current / crochet.total) * 100 + '%',
          }"
        ></div>
      </div>
    </div>
  </button>
</template>
<style lang="scss" scoped>
.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border-color: $border-secondary;
  background: $bg-color;
  cursor: pointer;
  .card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card__bottom {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .percent {
    padding: 4px 10px;
    border-radius: 30px;
    background: $accent-peach-light;
  }
  .count {
    color: $accent-peach;
  }
  .progress {
    flex: 1;
    height: 4px;
    .progress-bar {
      background: $accent-peach;
    }
  }
  &.active {
    background: $white;
    border-color: $accent-primary;
    .percent {
      background: $accent-secondary;
      color: $accent-dark;
    }
    .count {
      color: $accent-primary;
    }
    .progress {
      .progress-bar {
        background: $accent-primary;
      }
    }
  }
  &:not(.active):hover {
    background: #e5dace2c;
  }
}
</style>
