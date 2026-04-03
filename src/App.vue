<script setup>
import { computed, onMounted, ref } from "vue";
import IconReset from "./components/icons/IconReset.vue";
import AddCrochet from "./components/AddCrochet.vue";
import SelectedCrochet from "./components/SelectedCrochet.vue";
import CrochetList from "./components/CrochetList.vue";

// 작품 저장 배열, 초기엔 빈 배열
const crochets = ref(JSON.parse(localStorage.getItem("crochets")) || []);
const selectedId = ref(null);
const selectedItem = computed(() =>
  crochets.value.find((c) => c.id === selectedId.value),
);

const loaded = ref(false);
onMounted(() => {
  document.fonts.ready.then(() => {
    loaded.value = true;
  });
});

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
// 단 줄이기
const incRow = (id) => {
  const item = crochets.value.find((c) => c.id === id);
  if (item.current == item.total) return;
  item.current++;
  saveCrochets();
};
// 단 늘리기
const decRow = (id) => {
  const item = crochets.value.find((c) => c.id === id);
  if (item.current > 0) item.current--;
  saveCrochets();
};
// 항목 삭제
const deleteCrochet = (id) => {
  crochets.value = crochets.value.filter((c) => c.id !== id);
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

// 전체 목록초기화
const resetCrochet = () => {
  localStorage.removeItem("crochets");
  crochets.value = [];
};
</script>

<template>
  <div class="container" :class="{ loaded }">
    <header>
      <h1>오늘의 뜨개질</h1>
      <p>好きなものを編もう！</p>
    </header>
    <main>
      <!-- 작품 추가 -->
      <AddCrochet @add-crochet="addCrochet" />
      <div v-if="crochets.length > 0">
        <!-- 선택 작품 -->
        <SelectedCrochet
          v-if="selectedItem"
          :crochet="selectedItem"
          @dec="decRow"
          @inc="incRow"
          @del="deleteCrochet"
        />
        <!-- 목록 -->
        <CrochetList
          :crochets="crochets"
          :selectedId="selectedId"
          @select="selectRow"
        />
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
