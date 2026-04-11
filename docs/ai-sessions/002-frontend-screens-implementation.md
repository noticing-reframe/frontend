# AI 세션 002: 프론트엔드 화면 구현

## 날짜
2026-04-11

## 참여 AI
Claude Opus 4.5

## 목표
프로토타입 분석 후 Next.js + TypeScript로 전체 화면 구현

## 작업 내용

### 1. 프로토타입 분석
프로토타입 위치: `/Users/yungchannelforyou/Desktop/reframe/reframe`

분석한 파일들:
- `App.jsx` - 메인 앱, 화면 라우팅
- `HomeScreen.jsx` - 홈 화면 (고민 입력, 기록, 인물 목록)
- `LoadingScreen.jsx` - 로딩 화면 (인물 매칭 중)
- `ResultListScreen.jsx` - 결과 리스트 (매칭된 인물들)
- `ChatScreen.jsx` - 채팅 화면 (스트리밍)
- `api/client.js` - API 클라이언트

### 2. 화면 플로우
```
HOME → LOADING → RESULT_LIST → CHAT
         ↑___________↓
```

### 3. 구현한 파일들

#### 타입 정의
- `src/types/index.ts` - Person, Session, Message, Insight 등 타입

#### API 클라이언트
- `src/api/client.ts` - REST API + SSE 스트리밍

#### 컴포넌트
- `src/components/TypeBadge.tsx` - 인물 타입 뱃지
- `src/components/App.tsx` - 메인 앱 컴포넌트

#### 화면
- `src/components/screens/HomeScreen.tsx` - 홈 (고민 입력)
- `src/components/screens/LoadingScreen.tsx` - 로딩 애니메이션
- `src/components/screens/ResultListScreen.tsx` - 매칭 결과 + 바텀시트
- `src/components/screens/ChatScreen.tsx` - 스트리밍 채팅

### 4. 주요 기술 결정

1. **클라이언트 컴포넌트**: 모든 화면이 상태 관리 필요하므로 `'use client'` 사용
2. **인라인 스타일**: 프로토타입과 동일하게 유지 (추후 Tailwind 전환 가능)
3. **SSE 스트리밍**: fetch API + ReadableStream으로 구현
4. **로컬 유저 ID**: localStorage 기반 임시 ID 생성

### 5. API 엔드포인트 (프론트엔드 기준)

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | /api/sessions | 세션 생성 |
| POST | /api/match | 인물 매칭 |
| GET | /api/persons | 전체 인물 조회 |
| GET | /api/persons/:id | 인물 상세 |
| POST | /api/chat | 스트리밍 채팅 |
| POST | /api/insights | 인사이트 저장 |
| GET | /api/insights/user/:userId | 유저 인사이트 조회 |

## 결과
- TypeScript 빌드 성공
- Next.js 15 App Router 기반 구현 완료
