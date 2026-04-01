<script setup>
import dayjs from "dayjs";
import { computed, ref } from "vue";

// 작품명, 전체 단수
const name = ref("");
const total = ref(0);

const maxRow = ref(200);

const selectedId = ref(null);
const selectedItem = computed(() =>
  crochets.value.find((c) => c.id === selectedId.value),
);

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
  <div class="container">
    <header>
      <h1>오늘의 뜨개질</h1>
      <p>好きなものを編もう！</p>
    </header>
    <main>
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

      <div v-if="crochets.length > 0">
        <!-- 선택 작품 -->
        <div v-if="selectedItem">
          <h3 class="card-title">현재 작업 중</h3>
          <div class="card-now selected">
            <div class="card-now__top">
              <div class="card__text">
                <p class="name">{{ selectedItem.name }}</p>
                <div class="count">
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
                <!-- <button>E</button> -->
                <button @click="removeRow(selectedItem.id)">삭제</button>
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
                {{ dayjs(selectedItem.createdAt).format("YYYY-MM-DD HH:mm") }}
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
        <h3 class="card-title">전체 뜨개 목록</h3>
        <ul class="card-list">
          <li
            v-for="p in crochets"
            :key="p.id"
            @click="selectRow(p.id)"
            :class="{ active: selectedId === p.id }"
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
        <div class="reset">
          <button @click="resetCrochet" class="button-resetAll">
            전체 초기화
          </button>
        </div>
      </div>
      <div v-else class="empty">
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
.card-add {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 10px;
  padding: 16px;
  background: $bg-secondary;
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

.card-title {
  padding-top: 12px;
  margin-bottom: 10px;
  font-size: 24px;
  color: #7a6a5c;
}
.card-now {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  border: 2px solid #b7d1be;
  border-radius: 16px;
  color: #5c4a3d;
  background: #f3faf697;
  &__top {
    display: flex;
    justify-content: space-between;
    .card__text {
      flex: 1;
      .name {
        font-size: 20px;
      }
      .count {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .row {
        font-size: 28px;
      }
      .percent {
        padding: 4px 12px;
        border-radius: 60px;
        background: #fff9f1;
        color: #7a6a5c;
      }
    }
  }
  &__progress {
    .progress {
      width: 100%;
      height: 8px;
      background: #fff;
      border-radius: 20px;
      overflow: hidden;
    }
    .progress-bar {
      height: 100%;
      background: #9fb8a6;
    }
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 14px;
      color: #7a6a5c;
    }
    .card__buttons {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      background: #cfe3d4;
      border-radius: 36px;
      font-size: 24px;
      cursor: pointer;
      &:hover {
        background: #b4c5b8;
      }
    }
  }
}
.card-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  li {
    padding: 12px;
    border: 2px solid #e5dace;
    border-radius: 16px;
    cursor: pointer;
    &.active {
      background: #f9f9f370;
      border: 2px solid #9fb8a6;
    }
    &:hover {
      background: #e5dace2c;
    }
    .card__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .name {
        color: #7a6a5c;
      }
      .percent {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 48px;
        height: 24px;
        padding: 12px 0;
        background: #e8cfc1;
        font-size: 14px;
        color: #7a6a5c;
        border-radius: 24px;
      }
    }
    .card__bottom {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #9fb8a6;
      .progress {
        flex: 1;
        height: 4px;
        background: #eaeaea;
        border-radius: 10px;
        overflow: hidden;
        .progress-bar {
          height: 100%;
          background: #9fb8a6;
        }
      }
    }
  }
}
.reset {
  display: flex;
  justify-content: center;
  padding: 12px 0;
  .button-resetAll {
    padding: 12px 18px;
    border: 2px solid #b7cfc3;
    border-radius: 16px;
    background: #fff6e9;
    color: #5C7A6E;
  }
}

.empty {
  padding: 36px 0;
  p {
    text-align: center;
    font-size: 18px;
    line-height: 1.3;
    color: #c2a697;
  }
}
</style>
