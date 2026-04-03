<script setup>
import { ref } from "vue";

const emit = defineEmits(["addCrochet"]);

const name = ref("");
const total = ref(0);
const maxRow = ref(200);

const addCrochet = () => {
  if (!name.value || !total.value) return;

  emit("addCrochet", {
    name: name.value,
    total: Number(total.value),
  });
  name.value = "";
  total.value = 0;
};
const validateRow = (e) => {
  let value = Number(e.target.value);

  if (!value || value <= 0) {
    value = 0;
  } else if (value >= maxRow.value) {
    value = maxRow.value;
  }

  total.value = Number(value);
};
</script>

<template>
  <div>
    <!-- 작품 추가 -->
    <div class="card card-add">
      <div class="card__input">
        <div class="input input__name">
          <label for="name">작품명</label>
          <input
            id="name"
            type="text"
            v-model="name"
            placeholder="어떤걸 만들어볼까?"
            autocomplete="off"
          />
        </div>
        <div class="input input__total">
          <label for="total">단수</label>
          <input
            id="total"
            type="number"
            v-model="total"
            placeholder="몇 단까지 떠볼까 ?"
            min="0"
            :max="maxRow"
            @focus="$event.target.select()"
            @blur="validateRow"
          />
        </div>
      </div>
      <button @click="addCrochet" class="card__button">만들기</button>
    </div>
  </div>
</template>

<style lang="scss">
.card-add {
  display: flex;
  align-items: center;
  gap: 24px;
  // margin-bottom: 10px;
  padding: 16px;
  border-color: $border-primary;
  background: $bg-secondary;
  // background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23D4C4B3FF' stroke-width='4' stroke-dasharray='10%2c 20' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  // border-radius: 16px;
  .card__input {
    flex: 1;
    .input {
      display: flex;
      align-items: center;
      column-gap: 8px;
      label {
        flex-shrink: 0;
        display: inline-block;
        width: 36px;
      }
      input {
        width: 100%;
        padding: 10px;
        border: 1px solid $border-secondary;
        border-radius: 10px;
        background: $bg-input;
        &::placeholder {
          color: $accent-peach;
        }
        &:focus {
          border-color: $border-secondary;
        }
      }
      &__name {
        margin-bottom: 10px;
      }
    }
  }
  .card__button {
    padding: 10px 14px;
    border-radius: 12px;
    background: $accent-secondary;
    color: $accent-dark;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover,
    &:focus {
      background: $accent-secondary-hover;
    }
  }
}
</style>
