# Reframe Frontend - AI 협업 개발 가이드

## 프로젝트 개요

- **프로젝트명**: Reframe (리프레임)
- **핵심 컨셉**: 실제 인물 기반 가상 캐릭터("요정")와 1인칭 대화를 통해 사용자의 관점을 확장하는 AI 챗봇 서비스
- **기술 스택**: Next.js 15, TypeScript, Tailwind CSS v4
- **아키텍처**: App Router

---

## AI 활용 전략

### 사용 도구

| 용도 | 도구 | 설명 |
|------|------|------|
| 개발 보조 | Claude Code (CLI) | 컴포넌트 생성, 스타일링, 디버깅 |
| 에디터 | Cursor | AI 기반 코드 편집 |
| 디자인 연동 | Figma MCP | Figma → React 코드 변환 |

### AI 협업으로 구현된 기능

1. **Figma → 코드 변환**
   - Figma MCP를 통해 디자인 스펙 자동 추출
   - 색상, 타이포그래피, 간격 등 정확한 수치 반영

2. **반응형 디자인 최적화**
   - `clamp()` 함수 기반 유동적 크기 조절
   - iPhone 12 mini (375x667) ~ 대형 기기 대응

3. **컴포넌트 모듈화**
   - 화면별 컴포넌트 분리 (screens/)
   - 재사용 가능한 UI 패턴 추출

---

## Figma 연동

### Figma 파일 정보
- **File Key**: `RDl4dwDwGfLHandzrfAzhR`
- **URL**: `https://www.figma.com/design/RDl4dwDwGfLHandzrfAzhR/Fairy`

### 주요 화면 Node ID

| 화면 | Figma 이름 | Node ID |
|------|-----------|---------|
| 온보딩 | Splash | `1:100` |
| 고민 입력 | Input | `5:1234` |
| 로딩 | Loading | `7:Loading` |
| 캐릭터 선택 | 6-Select_Character | `17:17751` |
| 캐릭터 상세 | 7-Character_Detail | `30:1906` |
| 채팅 | 8-Chat02 | `7:2502` |

### Figma MCP 활용법

```bash
# 디자인 컨텍스트 가져오기
"피그마 [화면이름] 보고 그대로 만들어줘"

# 에셋 다운로드
"피그마에서 이미지/아이콘 다 다운받아서 public에 넣어줘"

# 정확한 스펙 확인
"피그마 보고 글자 크기랑 색상 확인해서 똑같이 해줘"
```

---

## 디자인 시스템

### 색상 팔레트

```css
/* Primary */
--color-primary: #58CF04;        /* 라임 그린 */
--color-primary-light: #6BE016;
--color-primary-border: rgba(107, 224, 22, 0.32);

/* Background */
--color-bg-dark: #000000;
--color-bg-overlay: rgba(0, 0, 0, 0.9);
--color-bg-card: rgba(255, 255, 255, 0.08);
--color-bg-blur: rgba(33, 34, 37, 0.61);

/* Text */
--color-text-primary: #f7f7f8;
--color-text-secondary: rgba(194, 196, 200, 0.88);
--color-text-muted: rgba(174, 176, 182, 0.61);
```

### 타이포그래피 (반응형)

```css
/* 제목 - 반응형 */
Title: clamp(24px, 8vw, 32px) Bold

/* 부제목 */
Subtitle: clamp(14px, 4vw, 16px) Regular

/* 본문 */
Body: 16px Regular, line-height: 1.625
```

### 반응형 전략

```tsx
// clamp() 기반 유동적 크기
fontSize: 'clamp(24px, 8vw, 32px)'  // min, preferred, max
gap: 'clamp(12px, 3vw, 20px)'
height: 'clamp(150px, 28vh, 190px)'
```

---

## 폴더 구조

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx              # 메인 앱 (상태 관리)
│   ├── onboarding/           # 온보딩 페이지
│   └── globals.css
├── components/
│   └── screens/              # 화면별 컴포넌트
│       ├── OnboardingScreen.tsx
│       ├── InputScreen.tsx
│       ├── LoadingScreen.tsx
│       ├── CharacterSelectScreen.tsx
│       ├── CharacterDetailScreen.tsx
│       └── ChatScreen.tsx
├── types/
│   └── index.ts
└── api/
    └── client.ts             # 백엔드 API 클라이언트
```

---

## 화면 플로우

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Onboarding │ ──▶ │   Input     │ ──▶ │   Loading   │
│   (타이핑)   │     │  (고민 입력) │     │  (매칭 중)   │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
       ┌──────────────────────────────────────┘
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Character  │ ──▶ │  Character  │ ──▶ │    Chat     │
│   Select    │     │   Detail    │     │  (SSE 스트림) │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                       │
       └──────────── ◀ 뒤로가기 ◀ ─────────────┘
```

---

## 주요 기능 구현

### 1. 타이핑 애니메이션 (온보딩)

```tsx
useEffect(() => {
  const typingInterval = setInterval(() => {
    if (currentIndex < fullText.length) {
      setDisplayedText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
    }
  }, 120); // 120ms per character
}, [step]);
```

### 2. SSE 스트리밍 채팅

```tsx
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message }),
});

const reader = response.body.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  // 청크 단위 메시지 업데이트
  setMessages(prev => [...prev, parseChunk(value)]);
}
```

### 3. 반응형 디자인

```tsx
// iPhone 12 mini ~ 대형 기기 대응
style={{
  fontSize: 'clamp(24px, 8vw, 32px)',
  gap: 'clamp(16px, 6vw, 24px)',
  padding: 'clamp(12px, 5vw, 20px)',
}}
```

---

## 개발 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

---

## 배포

- **플랫폼**: Vercel
- **배포 방식**: Git Push → 자동 배포
- **브랜치**: main

---

## AI 협업 문서 구조

```
docs/
├── ai-sessions/      # AI와의 세션별 대화 기록
├── api/              # API 연동 문서
├── decisions/        # 기술 결정 기록 (ADR)
├── features/         # 기능 명세서
├── flow/             # 화면 플로우 문서
├── prompts/          # AI 프롬프트 기록
└── screens/          # 화면별 스펙 문서
```

**모든 주요 UI/UX 결정은 Figma MCP와 Claude Code를 통해 이루어졌습니다.**
