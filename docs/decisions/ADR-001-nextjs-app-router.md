# ADR-001: Next.js 15 App Router 채택

## 상태
승인됨 (Accepted)

## 컨텍스트
Reframe 프론트엔드의 프레임워크를 결정해야 합니다.

요구사항:
- React 기반
- 빠른 초기 로딩
- SSE 스트리밍 지원
- Vercel 배포 최적화

## 결정
**Next.js 15 App Router**를 채택합니다.

## 대안 검토

### 1. Create React App
- 장점: 단순함
- 단점: SSR 없음, 최적화 제한적

### 2. Vite + React
- 장점: 빠른 개발 서버
- 단점: SSR 직접 구성 필요

### 3. Next.js Pages Router
- 장점: 안정적
- 단점: 레거시 패턴

### 4. Next.js 15 App Router (선택)
- 장점: 최신 React 기능, 서버 컴포넌트, Vercel 최적화
- 단점: 새로운 패러다임 학습 필요

## 결과

### 긍정적
- `standalone` 빌드로 Docker 이미지 최적화
- Vercel 자동 배포
- React 18 기능 (Suspense, Streaming) 활용 가능

### 부정적
- App Router 학습 곡선
- 일부 라이브러리 호환성 이슈

## AI 협업 노트
- Claude Code가 App Router 구조 설계
- `'use client'` 디렉티브 적용 위치 결정
- Vercel 배포 설정 자동 생성

---

*작성일: 2025-04-01*
