# 화면별 스펙 문서

## 개요

Reframe 앱의 모든 화면 스펙을 정리한 문서입니다. 각 화면은 Figma 디자인을 기반으로 구현되었습니다.

---

## 1. OnboardingScreen (온보딩)

### 기능
- 앱 첫 진입 시 표시되는 스플래시 화면
- 4단계 타이핑 애니메이션으로 서비스 소개

### 구현 스펙

| 요소 | 값 |
|------|-----|
| 배경 | 1-Splash01.svg → 2-Splash02.svg 크로스페이드 |
| 타이핑 속도 | 120ms per character |
| 배경 전환 시작 | 2000ms 후 |
| 전환 시간 | 2000ms (duration) |
| 페이드아웃 대기 | 타이핑 완료 후 300ms |

### 단계별 텍스트
```
Step 2: "혹시\n길을 잃어버렸나요?"
Step 3: "걱정하지말아요"
Step 4: "요정들이\n도와줄게요"
```

---

## 2. InputScreen (고민 입력)

### 기능
- 사용자 고민 텍스트 입력
- 퀵 선택 버튼으로 빠른 입력 지원

### 구현 스펙

| 요소 | 값 |
|------|-----|
| 제목 폰트 | clamp(24px, 8vw, 32px) Bold |
| 부제목 폰트 | clamp(14px, 4vw, 16px) |
| 텍스트에어리어 높이 | clamp(150px, 28vh, 190px) |
| 최대 글자 수 | 2000자 |
| 퀵 버튼 개수 | 5개 |

### 퀵 선택 옵션
```
- "요즘 너무 무기력하고 의욕이 없어요"
- "진로가 고민돼요"
- "인간관계가 힘들어요"
- "자존감이 낮아서 힘들어요"
- "번아웃이 온 것 같아요"
```

### 포커스 스타일
```css
/* 포커스 시 */
border: 1px solid rgba(88, 207, 4, 0.5);
box-shadow: 0px 0px 0px 2px rgba(88, 207, 4, 0.2);
```

---

## 3. LoadingScreen (로딩)

### 기능
- 캐릭터 매칭 중 표시되는 로딩 화면
- 빛나는 애니메이션 효과

### 구현 스펙

| 요소 | 값 |
|------|-----|
| 배경 | 7-Loading.svg |
| 빛나는 오버레이 | 8-Loading.svg |
| 애니메이션 주기 | 1600ms |
| 페이드 시간 | 700ms |
| 제목 | "고민을 들은\n요정이 모이고 있어요" |

---

## 4. CharacterSelectScreen (캐릭터 선택)

### 기능
- 매칭된 4-5명의 캐릭터 목록 표시
- 캐릭터 카드 클릭 시 상세 화면으로 이동

### 구현 스펙

| 요소 | 값 |
|------|-----|
| 제목 폰트 | clamp(24px, 8vw, 32px) Bold |
| 카드 간격 | 20px |
| 썸네일 크기 | clamp(72px, 25vw, 96px) |
| 제목~리스트 간격 | clamp(24px, 10vw, 40px) |

### 카드 구성
```
┌─────────────────────────────────────┐
│ [Thumbnail] │ 캐릭터명              │
│  96x96     │ 태그라인              │
│            │ "매칭 이유"            │
│            │ [태그1] [태그2]        │
└─────────────────────────────────────┘
```

---

## 5. CharacterDetailScreen (캐릭터 상세)

### 기능
- 선택한 캐릭터의 상세 정보 표시
- 대화 시작 버튼

### 구현 스펙

| 요소 | 값 |
|------|-----|
| 프로필 이미지 | 1:1 비율, border-radius: 12px |
| 이름 폰트 | clamp(24px, 8vw, 32px) Bold |
| 태그라인 폰트 | clamp(15px, 4.5vw, 18px) |
| 섹션 제목 폰트 | clamp(17px, 5vw, 20px) SemiBold |
| 콘텐츠 간격 | clamp(16px, 6vw, 24px) |

### 섹션 구성
```
1. 프로필 이미지
2. 기본 정보 (이름, 태그라인, 태그)
3. ─── Divider ───
4. 당신과 하고 싶은 대화 (conversation_hint)
5. ─── Divider ───
6. 요정의 삶 (character_background)
7. [더 깊게 대화 시작하기] 버튼
```

---

## 6. ChatScreen (채팅)

### 기능
- 캐릭터와 실시간 1인칭 대화
- SSE 스트리밍으로 응답 표시

### 구현 스펙

| 요소 | 값 |
|------|-----|
| 메시지 폰트 | 14px, line-height: 1.571 |
| 프로필 크기 | 32px |
| 버블 배경 | rgba(33, 34, 37, 0.61) |
| 입력 영역 패딩 | clamp(12px, 5vw, 20px) |

### 메시지 버블 스타일
```css
/* AI 메시지 */
border-radius: 0 12px 12px 12px;

/* 사용자 메시지 */
border-radius: 12px 0 12px 12px;
```

### 로딩 인디케이터
```
● ● ●  (3개 점, 0.2s 간격 애니메이션)
```

---

## 공통 스펙

### Safe Area
```css
/* Status Bar */
height: 44px;
padding-top: env(safe-area-inset-top);

/* Home Indicator */
padding-bottom: calc(20px + env(safe-area-inset-bottom, 14px));
```

### 배경
```css
/* 공통 배경 오버레이 */
background: url('/images/background/2-Splash02.svg');
overlay: rgba(0, 0, 0, 0.9);
```

### Backdrop Blur
```css
backdrop-filter: blur(32px);
-webkit-backdrop-filter: blur(32px);
```

---

*이 문서는 Figma MCP와 Claude Code 협업으로 작성되었습니다.*
