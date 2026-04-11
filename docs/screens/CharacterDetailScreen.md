# CharacterDetailScreen (7-Character_Detail)

## Figma 디자인 스펙

**Figma 파일**: `RDl4dwDwGfLHandzrfAzhR`
**Node ID**: `30:1906` (7-Character_Detail)

### 레이아웃
- **배경**: `bg-stars.png` + 90% 검정 오버레이 (`bg-black/90`)
- **Status Safe Area**: 44px
- **좌우 패딩**: 5.33% (375px 기준 20px)
- **프로필 이미지**: 335x335 (1:1 정사각형), border-radius 12px

### 타이포그래피
| 요소 | 크기 | 굵기 | 색상 | letter-spacing | line-height |
|------|------|------|------|----------------|-------------|
| 이름 | 32px | Bold | white | -0.8px | 1.375 |
| 짧은 설명 | 18px | Regular | #f7f7f8 | -0.004px | 1.445 |
| 타입 뱃지 | 12px | Medium | rgba(174,176,182,0.61) | 0.34px | 1.333 |
| 섹션 제목 | 20px | SemiBold | #f7f7f8 | -0.24px | 1.4 |
| 인용 텍스트 | 16px | Regular | #f7f7f8 | 0.09px | 1.625 |
| 요정의 삶 텍스트 | 16px | Regular | rgba(194,196,200,0.88) | 0.09px | 1.5 |

### 컴포넌트 스타일
- **타입 뱃지 배경**: `rgba(112, 115, 124, 0.22)`
- **구분선**: `rgba(112, 115, 124, 0.32)`, height 1px
- **요정의 삶 카드**:
  - `backdrop-filter: blur(32px)`
  - `background: rgba(33, 34, 37, 0.61)`
  - `border-radius: 0 12px 12px 12px` (왼쪽 상단만 직각)

### 하단 CTA 버튼
- **배경**: `#58CF04`
- **텍스트**: 16px SemiBold, `#000000`
- **패딩**: 16px 28px
- **border-radius**: 12px

---

## 유용한 프롬프트

### Figma 정확히 따라하기
```
아니야 피그마 보고 그대로 해야해
7-Character_Detail 글자 색깔 이런거 다 맞춰줘
```

### 인용 부호 처리
```
따옴표는 quote.svg 하나로 통일하고, 오른쪽은 180도 회전해서 써줘
```

### 요정의 삶 카드 스타일
```
요정의 삶 카드에 backdrop-blur 32px 넣고
border-radius는 왼쪽 상단만 직각 (0 12px 12px 12px)
```

---

## 구현 패턴

### 인용 부호 (왼쪽/오른쪽)
```tsx
{/* 왼쪽 인용 부호 */}
<img
  src="/images/icons/quote.svg"
  style={{ position: 'absolute', top: 0, left: 0 }}
/>

{/* 오른쪽 인용 부호 (180도 회전) */}
<img
  src="/images/icons/quote.svg"
  style={{
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'rotate(180deg)'
  }}
/>
```

### Backdrop Blur 카드
```tsx
<div
  style={{
    padding: '20px',
    borderRadius: '0 12px 12px 12px',
    backgroundColor: 'rgba(33, 34, 37, 0.61)',
    backdropFilter: 'blur(32px)',
    WebkitBackdropFilter: 'blur(32px)', // Safari 지원
  }}
>
```

### 하단 그라데이션 CTA 영역
```tsx
<div
  style={{
    background: 'linear-gradient(to top, rgba(0,0,0,1) 70%, transparent 100%)',
    padding: '20px 5.33%',
    paddingBottom: '54px', // Safe Area
  }}
>
```

---

## 관련 파일
- `src/components/screens/CharacterDetailScreen.tsx`
- `public/images/icons/quote.svg`
- `public/images/character-fairy.png`
- `public/images/character-thumbnail.png`
