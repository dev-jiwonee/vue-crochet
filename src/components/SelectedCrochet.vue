<script setup>
import dayjs from "dayjs";
import IconTrash from "./icons/IconTrash.vue";

const { crochet } = defineProps(["crochet"]);
const emit = defineEmits(["inc", "dec", "del"]);
</script>
<template>
  <div>
    <div class="card-title">
      <p class="title">현재 작업 중</p>
    </div>
    <div class="card card-now">
      <div class="card-now__top">
        <div class="card__text">
          <p class="name">{{ crochet.name }}</p>
          <div class="card__text-count">
            <p class="row">{{ crochet.current }} / {{ crochet.total }}</p>
            <div class="percent">
              {{ Math.round((crochet.current / crochet.total) * 100) + "%" }}
            </div>
          </div>
        </div>
        <div class="card__buttons">
          <button @click="emit('del', crochet.id)">
            <IconTrash />
          </button>
        </div>
      </div>
      <div class="card-now__progress">
        <div class="progress">
          <div
            class="progress-bar"
            :style="{
              width: (crochet.current / crochet.total) * 100 + '%',
            }"
          ></div>
        </div>
      </div>
      <div class="card-now__bottom">
        <p>
          {{ dayjs(crochet.createdAt).format("YYYY.MM.DD HH:mm") }}
        </p>
        <div class="card__buttons">
          <button
            @click="emit('dec', crochet.id)"
            :disabled="crochet.current == 0"
          >
            -
          </button>
          <button
            @click="emit('inc', crochet.id)"
            :disabled="crochet.current == crochet.total"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card-now {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  border-color: $accent-primary;
  background: #f3faf699;
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 4px;
    .card__text {
      flex: 1;
      padding: 4px 0;
      .name {
        margin-bottom: 4px;
        font-size: 22px;
      }
      &-count {
        display: flex;
        align-items: center;
        gap: 12px;
        .row {
          font-size: 24px;
          letter-spacing: -0.05rem;
        }
        .percent {
          padding: 4px 10px;
          border-radius: 60px;
          background: $accent-secondary;
          color: $accent-dark;
        }
      }
    }
    .card__buttons {
      display: flex;
      align-items: center;
      gap: 10px;
      button {
        @include flex-center;
        width: 36px;
        height: 36px;
        border-radius: 36px;
        background: inherit;
        &:hover {
          background: $bg-secondary;
        }
      }
    }
  }
  &__progress {
    .progress {
      height: 8px;
    }
    .progress-bar {
      background: $accent-primary;
    }
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 14px;
      color: $text-muted;
    }
    .card__buttons {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    button {
      @include flex-center;
      width: 36px;
      height: 36px;
      border-radius: 36px;
      background: $accent-secondary;
      font-size: 24px;
      color: $accent-dark;
      &:not(:disabled):hover {
        background: $accent-secondary-hover;
      }
      &:disabled {
        opacity: 0.6;
        cursor: default;
      }
    }
  }
}
</style>
