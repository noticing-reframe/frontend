# CharacterSelectScreen (6-Select_Character)

## Figma 디자인 스펙

**Figma 파일**: `RDl4dwDwGfLHandzrfAzhR`
**Node ID**: `17:17751` (Select_Character)

### 레이아웃
- **배경**: `bg-stars.png` + 90% 검정 오버레이 (`bg-black/90`)
- **Status Safe Area**: 44px
- **좌우 패딩**: 5.33% (375px 기준 20px)

### 타이포그래피
| 요소 | 크기 | 굵기 | 색상 | letter-spacing |
|------|------|------|------|----------------|
| 제목 | 32px | Bold | white | -0.8px |
| 캐릭터 이름 | 15px | SemiBold | white | 0.09px |
| 짧은 설명 | 13px | Regular | rgba(255,255,255,0.6) | 0.25px |
| 인용문 | 13px | Regular | rgba(255,255,255,0.5) | 0.25px |
| 타입 뱃지 | 12px | Medium | rgba(255,255,255,0.7) | - |

### 필터 칩
- **활성**: `bg-#58CF04`, `color-#000000`
- **비활성**: `border-rgba(107,224,22,0.32)`, `color-rgba(255,255,255,0.8)`
- **패딩**: 10px 20px
- **border-radius**: 10px

### 캐릭터 카드
- **썸네일 크기**: 140x186px (약 3:4 비율)
- **border-radius**: 8px
- **간격 (gap)**: 16px

---

## 유용한 프롬프트

### Figma 디자인 가져오기
```
피그마 6-Select_Character 보고 그대로 만들어줘
https://www.figma.com/design/RDl4dwDwGfLHandzrfAzhR/Fairy?node-id=17-17751
```

### 배경 패턴 적용
```
배경 이미지를 피그마에서 가져와서 온보딩처럼 전체 화면에 채워줘
```

### 필터 칩 스타일링
```
필터 칩 활성/비활성 스타일 피그마 보고 똑같이 해줘
- 활성: 초록색 배경, 검정 글자
- 비활성: 투명 배경, 초록색 테두리
```

---

## 구현 패턴

### 배경 오버레이 패턴
```tsx
<div className="absolute inset-0">
  <img
    src="/images/bg-stars.png"
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/90" />
</div>
```

### 필터 칩 컴포넌트
```tsx
const isActive = activeFilter === chip.value;
<button
  style={{
    padding: '10px 20px',
    borderRadius: '10px',
    backgroundColor: isActive ? '#58CF04' : 'transparent',
    color: isActive ? '#000000' : 'rgba(255, 255, 255, 0.8)',
    border: isActive ? 'none' : '1px solid rgba(107, 224, 22, 0.32)',
  }}
>
  {chip.label}
</button>
```

### 스크롤바 숨김
```css
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

---

## 관련 파일
- `src/components/screens/CharacterSelectScreen.tsx`
- `src/data/mockCharacters.ts`
- `public/images/bg-stars.png`
- `public/images/icons/chevron-left.svg`
