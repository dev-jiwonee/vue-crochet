<script setup>
import dayjs from "dayjs";
import { computed, ref } from "vue";
import IconTrash from "./components/icons/IconTrash.vue";
import IconReset from "./components/icons/IconReset.vue";
import AddCrochet from "./components/AddCrochet.vue";

// 작품 저장 배열, 초기엔 빈 배열
const crochets = ref(JSON.parse(localStorage.getItem("crochets")) || []);
const selectedId = ref(null);
const selectedItem = computed(() =>
  crochets.value.find((c) => c.id === selectedId.value),
);

// 작품 추가
const addCrochet = ({ name, total }) => {
  const newCrochet = {
    id: Date.now(),
    name,
    current: 0,
    total,
    createdAt: Date.now(),
  };
  crochets.value.push(newCrochet);

  // localStorage에 저장
  saveCrochets();
  selectRow(newCrochet.id);
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

// 항목 선택
const selectRow = (id) => {
  selectedId.value = id;
};

// 저장
const saveCrochets = () => {
  localStorage.setItem("crochets", JSON.stringify(crochets.value));
};
// 항목 삭제
const removeRow = (id) => {
  crochets.value = crochets.value.filter((c) => c.id !== id);
  saveCrochets();
};

// 전체 목록초기화
const resetCrochet = () => {
  localStorage.removeItem("crochets");
  crochets.value = [];
};
</script>

<template>
  <div class="container">
    <header>
      <h1>오늘의 뜨개질</h1>
      <p>好きなものを編もう！</p>
    </header>
    <main>
      <!-- 작품 추가 -->
      <AddCrochet @add-crochet="addCrochet" />

      <div v-if="crochets.length > 0">
        <!-- 선택 작품 -->
        <div v-if="selectedItem">
          <div class="card-title">
            <p class="title">현재 작업 중</p>
          </div>
          <div class="card card-now">
            <div class="card-now__top">
              <div class="card__text">
                <p class="name">{{ selectedItem.name }}</p>
                <div class="card__text-count">
                  <p class="row">
                    {{ selectedItem.current }} / {{ selectedItem.total }}
                  </p>
                  <div class="percent">
                    {{
                      Math.round(
                        (selectedItem.current / selectedItem.total) * 100,
                      ) + "%"
                    }}
                  </div>
                </div>
              </div>
              <div class="card__buttons">
                <button @click="removeRow(selectedItem.id)">
                  <IconTrash />
                </button>
              </div>
            </div>
            <div class="card-now__progress">
              <div class="progress">
                <div
                  class="progress-bar"
                  :style="{
                    width:
                      (selectedItem.current / selectedItem.total) * 100 + '%',
                  }"
                ></div>
              </div>
            </div>
            <div class="card-now__bottom">
              <p>
                {{ dayjs(selectedItem.createdAt).format("YYYY.MM.DD HH:mm") }}
              </p>
              <div class="card__buttons">
                <button
                  @click="decRow(selectedItem.id)"
                  :disabled="selectedItem.current == 0"
                >
                  -
                </button>
                <button
                  @click="incRow(selectedItem.id)"
                  :disabled="selectedItem.current == selectedItem.total"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- 목록 -->
        <div class="card-title">
          <p class="title">전체 뜨개 목록</p>
        </div>
        <ul class="card-list">
          <li
            v-for="p in crochets"
            :key="p.id"
            @click="selectRow(p.id)"
            :class="['card', { active: selectedId === p.id }]"
          >
            <div class="card__top">
              <p class="name">{{ p.name }}</p>
              <p class="percent">
                {{ Math.round((p.current / p.total) * 100) + "%" }}
              </p>
            </div>
            <div class="card__bottom">
              <p class="count">{{ p.current }} / {{ p.total }}</p>
              <div class="progress">
                <div
                  class="progress-bar"
                  :style="{
                    width: (p.current / p.total) * 100 + '%',
                  }"
                ></div>
              </div>
            </div>
          </li>
        </ul>
        <!-- 초기화 버튼 -->
        <div class="button-reset">
          <button @click="resetCrochet">
            <i>
              <IconReset />
            </i>
            전체 초기화
          </button>
        </div>
      </div>
      <div v-else class="text-empty">
        <p>아직 작업 중인 작품이 없어요 !<br />새 작품을 추가해보세요</p>
      </div>
    </main>
    <footer>
      <p>© 2026 Jiwon Lee. All rights reserved.</p>
      <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
    </footer>
  </div>
</template>

<style lang="scss">
.card-title {
  padding-top: 20px;
  margin-bottom: 8px;
  font-size: 24px;
}
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
.card-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  li.card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border-color: $border-secondary;
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
}
.button-reset {
  @include flex-center;
  padding: 30px 0;
  button {
    @include flex-center;
    gap: 4px;
    padding: 12px 18px;
    border: 1px solid $accent-primary;
    border-radius: 16px;
    color: $accent-primary;
    background: $bg-color;
    transition: all 0.2s ease;
    i {
      font-size: 0;
    }
    &:hover {
      background: $accent-primary;
      color: $bg-color;
    }
  }
}
.reset {
  .button-resetAll {
    padding: 12px 18px;
    border: 2px solid #b7cfc3;
    border-radius: 16px;
    background: #fff6e9;
    color: #5c7a6e;
  }
}

.text-empty {
  padding: 40px 0;
  p {
    text-align: center;
    font-size: 20px;
    line-height: 1.4;
    color: $accent-peach;
  }
}
</style>
