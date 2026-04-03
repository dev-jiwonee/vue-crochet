# 🧶 오늘의 뜨개질
> 뜨개질 할 때 단수 관리를 좀 더 편하게 하려고 만든 개인 토이 프로젝트 입니다. 작품 이름과 목표 단수를 입력해두면, 작업할 때마다 버튼 하나로 단수를 기록할 수 있어요.

### ✨ 주요 기능
- **작품 추가** - 작품 이름과 떠야 할 단수를 입력하고 만들기를 누르면 목록에 저장돼요
- **작품 목록** - 저장된 작품 전체를 한눈에 확인할 수 있어요
- **단수 카운터** - `+` / `-`  버튼으로 현재 단수를 바로 조정할 수 있어요
- **진행률 표시** - 현재 진행률을 퍼센트와 프로그레스 바로 확인 할 수 있어요
- **로컬 저장** - localStorage에 저장도어 새로고침해도 데이터가 유지돼요

### ⚙️ 기술 스택
- **Vue 3**
- **SCSS** (variables, mixins 분리)
- **Vercel** (배포)

### 📚 프로젝트 구조
 
```
src/
├── assets/
│   ├── fonts/              # 커스텀 폰트 (Ownglyph)
│   └── styles/             # global, reset, variables, mixins
├── components/
│   ├── icons/
│   ├── AddCrochet.vue      # 작품 추가 폼
│   ├── CrochetList.vue     # 작품 목록
│   ├── CrochetItem.vue     # 작품 아이템
│   └── SelectedCrochet.vue # 진행 중인 작품
└── composables/
    └── useCrochet.js       # 상태 관리 및 localStorage 로직
```

### 로컬 실행
 
```bash
# 패키지 설치
npm install
 
# 개발 서버 실행
npm run dev
```
 
## 🔗 배포
 
[vue-crochet.vercel.app](https://vue-crochet.vercel.app)
 
---
 
> 뜨개질하다가 단수를 잃어버리는 사람을 위한 토이 프로젝트 🪡
