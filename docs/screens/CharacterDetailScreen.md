# CharacterDetailScreen (7-Character_Detail)

## Figma 디자인 스펙

**Figma 파일**: `RDl4dwDwGfLHandzrfAzhR`
**Node ID**: `30:1906` (7-Character_Detail)

### 레이아웃
- **배경**: `2-Splash02.svg` + 90% 검정 오버레이 (`bg-black/90`)
- **Status Safe Area**: 44px + `pt-[env(safe-area-inset-top)]`
- **뒤로가기 버튼**: 40px x 40px, left: 12px, 수직 중앙 정렬
- **스크롤 영역 패딩**: 20px, gap: 24px
- **프로필 이미지**: 1:1 정사각형 (aspect-square), border-radius 12px

### 타이포그래피
| 요소 | 크기 | 굵기 | 색상 | letter-spacing | line-height |
|------|------|------|------|----------------|-------------|
| 이름 | 28px | Bold | #f7f7f8 | -0.56px | 1.357 |
| 짧은 설명 | 16px | Regular | rgba(194,196,200,0.88) | 0.09px | 1.5 |
| 태그 뱃지 | 12px | Medium | #6BE016 | 0.0252em | 1.334 |
| 섹션 제목 | 20px | SemiBold | #f7f7f8 | -0.24px | 1.4 |
| 인용 텍스트 | 16px | Regular | #f7f7f8 | 0.09px | 1.625 |
| 요정의 삶 텍스트 | 14px | Regular | rgba(194,196,200,0.88) | 0.2px | 1.571 |

### 태그 뱃지 (다중 태그 지원)
- **패딩**: 4px 6px
- **border-radius**: 6px
- **배경**: #1B1C1E + rgba(107,224,22,0.08) 오버레이
- **텍스트 색상**: #6BE016
- **컨테이너**: flex-wrap gap-2로 여러 태그 표시

### 하단 CTA 버튼 (스티키)
- **position**: fixed, bottom: 0
- **maxWidth**: 430px (app-container와 동일)
- **margin**: 0 auto (중앙 정렬)
- **패딩**: 20px, paddingBottom: calc(20px + env(safe-area-inset-bottom))
- **버튼 높이**: 48px
- **배경**: #6BE016
- **텍스트**: 16px SemiBold, #171719
- **border-radius**: 12px

### 요정의 삶 카드
- **padding**: 20px
- **border-radius**: 0 12px 12px 12px
- **배경**: rgba(33, 34, 37, 0.61)
- **backdrop-filter**: blur(32px)

---

## 관련 파일
- `src/components/screens/CharacterDetailScreen.tsx`
- `src/types/index.ts` (Character.tags: string[])
- `public/images/background/2-Splash02.svg`
- `public/images/icons/chevron-left.svg`
- `public/images/icons/quote.svg`
