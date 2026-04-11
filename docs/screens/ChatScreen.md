# ChatScreen (8-Chat02)

## Figma 디자인 스펙

**Figma 파일**: `RDl4dwDwGfLHandzrfAzhR`
**Node ID**: `7:2502` (Chat02)

### 레이아웃
- **배경**: `bg-stars.png` + 90% 검정 오버레이 (`bg-black/90`)
- **Status Safe Area**: 44px
- **고정 요소**: 뒤로가기 버튼 + 안내 문구 (스크롤에 밀리면 안됨)
- **하단 Safe Area**: 54px (paddingBottom)

### 타이포그래피
| 요소 | 크기 | 굵기 | 색상 | letter-spacing | line-height |
|------|------|------|------|----------------|-------------|
| 안내 문구 | 12px | Regular | rgba(194,196,200,0.88) | 0.3px | 1.334 |
| 메시지 라벨 | 12px | Regular | rgba(194,196,200,0.88) | 0.3px | 1.334 |
| 메시지 텍스트 | 14px | Regular | #f7f7f8 | 0.2px | 1.571 |
| 입력 필드 | 16px | Regular | #f7f7f8 | 0.09px | 1.5 |
| Placeholder | 16px | Regular | rgba(194,196,200,0.61) | 0.09px | 1.5 |

### 메시지 버블
- **AI 메시지**: `border-radius: 0 12px 12px 12px` (왼쪽 상단 직각)
- **유저 메시지**: `border-radius: 12px 0 12px 12px` (오른쪽 상단 직각)
- **배경**: `rgba(255, 255, 255, 0.08)` + `backdrop-filter: blur(32px)`
- **패딩**: 12px 20px

### 프로필 이미지
- **크기**: 32x32px
- **border-radius**: 96px (원형)
- **AI 프로필 테두리**: `1px solid rgba(107, 224, 22, 0.16)`
- **유저 프로필 테두리**: `0.43px solid #1B1C1E`

### 입력 영역
- **텍스트 필드**: backdrop-blur, `rgba(255,255,255,0.08)`, border-radius 12px
- **전송 버튼**: 48x48px, `#58CF04`, border-radius 12px, `send.svg` 아이콘

---

## 유용한 프롬프트

### 고정 헤더 처리
```
뒤로가기랑 안내 문구는 스크롤에 밀리면 안될거 같아
```

### 아이콘 지정
```
유저 프로필은 '/images/icons/user.svg' 쓰고
샌드 버튼도 '/images/icons/send.svg' 써줘
```

### Figma 디자인 적용
```
chat 화면도 피그마 8-Chat02 맞춰서 개발해줘
```

---

## 구현 패턴

### 고정 헤더 + 스크롤 영역 분리
```tsx
<div className="relative flex flex-col h-dvh">
  {/* 고정 헤더 */}
  <div className="relative z-20 flex-shrink-0">
    {/* Status Safe Area */}
    {/* 뒤로가기 버튼 */}
    {/* 안내 문구 */}
  </div>

  {/* 스크롤 가능한 메시지 영역 */}
  <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide">
    {/* 메시지 리스트 */}
  </div>

  {/* 고정 입력 영역 */}
  <div className="relative z-20 flex-shrink-0">
    {/* 입력 필드 + 전송 버튼 */}
  </div>
</div>
```

### AI 메시지 버블
```tsx
<div className="flex gap-[4px] items-start">
  {/* 프로필 이미지 */}
  <div style={{
    width: '32px',
    height: '32px',
    borderRadius: '96px',
    border: '1px solid rgba(107, 224, 22, 0.16)',
  }}>
    <img src={character.profileImage} />
  </div>

  {/* 메시지 콘텐츠 */}
  <div className="flex-1 flex flex-col gap-[4px]">
    <p>{character.shortDescription}</p>
    <div style={{
      padding: '12px 20px',
      borderRadius: '0 12px 12px 12px',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(32px)',
    }}>
      <p>{message.content}</p>
    </div>
  </div>
</div>
```

### 유저 메시지 버블
```tsx
<div className="flex gap-[4px] items-start">
  {/* 메시지 콘텐츠 (오른쪽 정렬) */}
  <div className="flex-1 flex flex-col gap-[4px] items-end">
    <p>나</p>
    <div style={{
      borderRadius: '12px 0 12px 12px', // 오른쪽 상단 직각
    }}>
      <p>{message.content}</p>
    </div>
  </div>

  {/* 유저 프로필 */}
  <img src="/images/icons/user.svg" />
</div>
```

### 전송 버튼
```tsx
<button
  onClick={handleSend}
  disabled={!inputValue.trim() || isLoading}
  style={{
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: '#58CF04',
  }}
>
  <img src="/images/icons/send.svg" style={{ width: '24px', height: '24px' }} />
</button>
```

---

## 관련 파일
- `src/components/screens/ChatScreen.tsx`
- `public/images/icons/user.svg`
- `public/images/icons/send.svg`
- `public/images/icons/circle-exclamation.svg`
- `public/images/icons/chevron-left.svg`
