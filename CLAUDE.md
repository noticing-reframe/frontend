# Frontend - Claude Code 협업 가이드

## 프로젝트 개요
- **프로젝트명**: Reframe
- **역할**: 실제 인물 기반 가상 캐릭터와 1인칭 대화하는 AI 챗봇 서비스의 프론트엔드
- **기술 스택**: Next.js, TypeScript, Tailwind CSS
- **아키텍처**: App Router (Next.js 15)

## 핵심 비즈니스 컨셉
- **실제 인물 기반 가상 캐릭터**: 실제 인물의 핵심 속성·철학·경험 패턴을 학습한 가상 캐릭터
- **1인칭 대화**: 캐릭터가 자기 이야기를 1인칭으로 대화 ("나는 그때…", "내가 제일 무서웠던 건…")

## 폴더 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   └── page.tsx
├── components/             # 재사용 컴포넌트
├── hooks/                  # 커스텀 훅
├── lib/                    # 유틸리티, API 클라이언트
└── types/                  # TypeScript 타입 정의
```

## 주요 명령어
```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint 실행
```

## 현재 개발 상태
- [x] Next.js 초기 설정
- [ ] 폴더 구조 구성
- [ ] UI/UX 설계
- [ ] 컴포넌트 구조
- [ ] 핵심 화면 구현

## 코딩 컨벤션
- **클래스 기반**: 필요한 경우 클래스 사용
- **파일 네이밍**: kebab-case (예: `chat-input.tsx`)
- **컴포넌트 네이밍**: PascalCase (예: `ChatInput`)

## AI 협업 문서화

```
docs/
├── ai-sessions/   # AI와의 세션별 대화 기록
├── prompts/       # 재사용 가능한 프롬프트 모음
└── decisions/     # AI 협업으로 내린 기술 결정 (ADR)
```

**커밋할 때마다 docs 업데이트 필수**
