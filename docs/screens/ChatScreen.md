# ChatScreen (8-Chat02)

## Figma 디자인 스펙

**Figma 파일**: `RDl4dwDwGfLHandzrfAzhR`
**Node ID**: `7:2502` (Chat02)

### 레이아웃
- **배경**: `2-Splash02.svg` + 90% 검정 오버레이 (`bg-black/90`)
- **Status Safe Area**: 44px + `pt-[env(safe-area-inset-top)]`
- **뒤로가기 버튼**: 40px x 40px, left: 12px, 수직 중앙 정렬
- **고정 요소**: 뒤로가기 버튼 + 안내 문구 (스크롤에 밀리면 안됨)
- **하단 Safe Area**: 54px (paddingBottom)

### 타이포그래피
| 요소 | 크기 | 굵기 | 색상 | letter-spacing | line-height |
|------|------|------|------|----------------|-------------|
| 안내 문구 | 12px | Regular | rgba(194,196,200,0.88) | 0.3px | 1.334 |
| 메시지 라벨 | 12px | Regular | rgba(194,196,200,0.88) | 0.3px | 1.334 |
| 메시지 텍스트 | 14px | Regular | #f7f7f8 | 0.2px | 1.571 |
| 입력 필드 | 16px | Regular | #f7f7f8 | 0.09px | 1.5 |

### 메시지 버블
- **AI 메시지**: `border-radius: 0 12px 12px 12px`
- **유저 메시지**: `border-radius: 12px 0 12px 12px`
- **배경**: `rgba(255, 255, 255, 0.08)` + `backdrop-filter: blur(32px)`
- **패딩**: 12px 20px

### 프로필 이미지
- **크기**: 32x32px
- **border-radius**: 96px
- **AI 프로필 테두리**: `1px solid rgba(107, 224, 22, 0.16)`
- **유저 프로필 테두리**: `0.43px solid #1B1C1E`

### 입력 영역
- **텍스트 필드**: backdrop-blur, `rgba(255,255,255,0.08)`, border-radius 12px
- **전송 버튼**: 48x48px, `#58CF04`, border-radius 12px

---

## 관련 파일
- `src/components/screens/ChatScreen.tsx`
- `public/images/background/2-Splash02.svg`
- `public/images/icons/chevron-left.svg`
- `public/images/icons/send.svg`
- `public/images/icons/user.svg`
