import { computed, ref } from "vue";

export function useCrochet() {
  // 작품 저장 배열, 초기엔 빈 배열
  const crochets = ref(JSON.parse(localStorage.getItem("crochets")) || []);
  const selectedId = ref(null);
  const selectedItem = computed(() =>
    crochets.value.find((c) => c.id === selectedId.value),
  );

  // crochet 저장 (localStorage)
  const saveCrochets = () => {
    localStorage.setItem("crochets", JSON.stringify(crochets.value));
  };
  // crochet 선택
  const selectRow = (id) => {
    selectedId.value = id;
  };
  // crochet 추가
  const addCrochet = ({ name, total }) => {
    const newCrochet = {
      id: Date.now(),
      name,
      current: 0,
      total,
      createdAt: Date.now(),
    };
    crochets.value.push(newCrochet);
    saveCrochets();
    selectRow(newCrochet.id);
  };

  // crochet 삭제
  const deleteCrochet = (id) => {
    crochets.value = crochets.value.filter((c) => c.id !== id);
    saveCrochets();
  };

  // row 줄이기
  const incRow = (id) => {
    const item = crochets.value.find((c) => c.id === id);
    if (item.current == item.total) return;
    item.current++;
    saveCrochets();
  };
  // row 늘리기
  const decRow = (id) => {
    const item = crochets.value.find((c) => c.id === id);
    if (item.current > 0) item.current--;
    saveCrochets();
  };

  // 전체 목록 초기화 (localStorage 비우기))
  const resetCrochet = () => {
    localStorage.removeItem("crochets");
    crochets.value = [];
  };

  return {
    crochets,
    selectedId,
    selectedItem,
    addCrochet,
    incRow,
    decRow,
    deleteCrochet,
    selectRow,
    resetCrochet,
  };
}
