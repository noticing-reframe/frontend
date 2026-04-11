# Frontend - Claude Code 협업 가이드

## 프로젝트 개요
- **프로젝트명**: Reframe (Fairy)
- **역할**: 실제 인물 기반 가상 캐릭터와 1인칭 대화하는 AI 챗봇 서비스의 프론트엔드
- **기술 스택**: Next.js 15, TypeScript, Tailwind CSS v4
- **아키텍처**: App Router

## 핵심 비즈니스 컨셉
- **실제 인물 기반 가상 캐릭터**: 실제 인물의 핵심 속성·철학·경험 패턴을 학습한 가상 캐릭터 ("요정")
- **1인칭 대화**: 캐릭터가 자기 이야기를 1인칭으로 대화 ("나는 그때…", "내가 제일 무서웠던 건…")

---

## Figma 연동

### Figma 파일 정보
- **File Key**: `RDl4dwDwGfLHandzrfAzhR`
- **URL**: `https://www.figma.com/design/RDl4dwDwGfLHandzrfAzhR/Fairy`

### 주요 화면 Node ID
| 화면 | Figma 이름 | Node ID |
|------|-----------|---------|
| 캐릭터 선택 | 6-Select_Character | `17:17751` |
| 캐릭터 상세 | 7-Character_Detail | `30:1906` |
| 채팅 | 8-Chat02 | `7:2502` |

### Figma MCP 활용법
```
# 디자인 컨텍스트 가져오기
피그마 [화면이름] 보고 그대로 만들어줘
https://www.figma.com/design/RDl4dwDwGfLHandzrfAzhR/Fairy?node-id=[NODE_ID]

# 에셋 다운로드
피그마에서 이미지/아이콘 다 다운받아서 public에 넣어줘

# 정확한 스펙 확인
피그마 보고 글자 크기랑 색상 확인해서 똑같이 해줘
```

---

## 디자인 시스템

### 색상
```css
/* Primary */
--color-primary: #58CF04;        /* 라임 그린 */
--color-primary-light: #6BE016;
--color-primary-border: rgba(107, 224, 22, 0.32);

/* Background */
--color-bg-dark: #000000;
--color-bg-overlay: rgba(0, 0, 0, 0.9);    /* 90% 검정 오버레이 */
--color-bg-card: rgba(255, 255, 255, 0.08); /* 카드/버블 배경 */
--color-bg-blur: rgba(33, 34, 37, 0.61);    /* backdrop-blur 배경 */

/* Text */
--color-text-primary: #f7f7f8;
--color-text-secondary: rgba(194, 196, 200, 0.88);
--color-text-muted: rgba(174, 176, 182, 0.61);

/* Divider */
--color-divider: rgba(112, 115, 124, 0.32);
```

### 타이포그래피
```css
/* 제목 */
Title: 32px Bold, letter-spacing: -0.8px, line-height: 1.375

/* 섹션 제목 */
Heading: 20px SemiBold, letter-spacing: -0.24px, line-height: 1.4

/* 본문 */
Body: 16px Regular, letter-spacing: 0.09px, line-height: 1.5
Body Reading: 16px Regular, letter-spacing: 0.09px, line-height: 1.625

/* 캡션 */
Caption: 12px Regular, letter-spacing: 0.3px, line-height: 1.334
```

### 공통 패턴

#### 배경 오버레이
```tsx
<div className="absolute inset-0">
  <img src="/images/bg-stars.png" className="absolute inset-0 w-full h-full object-cover" />
  <div className="absolute inset-0 bg-black/90" />
</div>
```

#### Backdrop Blur 카드
```tsx
style={{
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(32px)',
  WebkitBackdropFilter: 'blur(32px)',
}}
```

#### Safe Area
- **Status Bar**: 44px (상단)
- **Home Indicator**: 34px (하단, 통상 54px 패딩 사용)

---

## 폴더 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── characters/         # 캐릭터 선택/상세
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   └── chat/[characterId]/ # 채팅
│       └── page.tsx
├── components/
│   └── screens/
│       ├── CharacterSelectScreen.tsx
│       ├── CharacterDetailScreen.tsx
│       └── ChatScreen.tsx
├── data/
│   └── mockCharacters.ts   # 캐릭터 목 데이터
├── types/
│   └── index.ts
└── api/
    └── client.ts
```

---

## 에셋 구조

```
public/images/
├── bg-stars.png              # 별 배경 이미지
├── character-fairy.png       # 캐릭터 이미지 1
├── character-thumbnail.png   # 캐릭터 이미지 2
├── loading-hand.png          # 로딩 화면 손 이미지
└── icons/
    ├── chevron-left.svg      # 뒤로가기
    ├── quote.svg             # 인용 부호 (회전해서 양쪽 사용)
    ├── circle-exclamation.svg # 안내 아이콘
    ├── send.svg              # 전송 버튼
    └── user.svg              # 유저 프로필
```

---

## 주요 명령어
```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

---

## 화면 플로우
```
Splash → Input → Loading → Character Select → Character Detail → Chat
                              ↑                    ↓
                              ←←←←←←←←←←←←←←←←←←←←←
```

---

## 개발 상태
- [x] Next.js 15 + App Router 설정
- [x] Figma MCP 연동
- [x] CharacterSelectScreen (6-Select_Character)
- [x] CharacterDetailScreen (7-Character_Detail)
- [x] ChatScreen (8-Chat02)
- [x] 에셋 다운로드 (bg-stars, icons 등)
- [ ] API 연동
- [ ] 스트리밍 응답 처리

---

## 문서 구조

```
docs/
├── screens/              # 화면별 스펙 문서
│   ├── CharacterSelectScreen.md
│   ├── CharacterDetailScreen.md
│   └── ChatScreen.md
├── ai-sessions/          # AI 협업 세션 기록
├── prompts/              # 재사용 가능한 프롬프트
└── decisions/            # 기술 결정 (ADR)
```

---

## 코딩 컨벤션
- **컴포넌트**: PascalCase (`ChatScreen.tsx`)
- **스타일**: inline style 객체 사용 (Figma 스펙 정확히 반영)
- **색상**: Figma 변수명 그대로 사용 (`rgba(...)` 형식)
- **단위**: px 단위 사용 (Figma와 1:1 매칭)
