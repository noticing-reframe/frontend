# CharacterSelectScreen (6-Select_Character)

## Figma 디자인 스펙

**Figma 파일**: `RDl4dwDwGfLHandzrfAzhR`
**Node ID**: `17:17751` (Select_Character)

### 레이아웃
- **배경**: `2-Splash02.svg` + 90% 검정 오버레이 (`bg-black/90`)
- **Status Safe Area**: 44px + `pt-[env(safe-area-inset-top)]`
- **뒤로가기 버튼**: 40px x 40px, left: 12px, 수직 중앙 정렬
- **Frame 30 패딩**: 10px 20px 20px 20px
- **콘텐츠 gap**: 40px

### 타이포그래피
| 요소 | 크기 | 굵기 | 색상 | letter-spacing |
|------|------|------|------|----------------|
| 제목 | 32px | Bold | white | -0.8px |
| 캐릭터 이름 | 15px | SemiBold | white | 0.09px |
| 짧은 설명 | 13px | Regular | rgba(255,255,255,0.6) | 0.25px |
| 태그 뱃지 | 11px | Medium | #6BE016 | 0.0311em |

### 캐릭터 카드
- **카드 gap**: 12px
- **썸네일**: 96px 너비, self-stretch 높이 (텍스트 영역에 맞춤)
- **border-radius**: 12px
- **텍스트 영역 gap**: 6px

### 태그 뱃지 (다중 태그 지원)
- **패딩**: 3px 6px
- **border-radius**: 6px
- **배경**: #1B1C1E + rgba(107,224,22,0.08) 오버레이
- **텍스트 색상**: #6BE016
- **컨테이너**: flex-wrap으로 여러 태그 표시

---

## 관련 파일
- `src/components/screens/CharacterSelectScreen.tsx`
- `src/types/index.ts` (Character.tags: string[])
- `public/images/background/2-Splash02.svg`
- `public/images/icons/chevron-left.svg`
