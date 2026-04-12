# ADR-002: clamp() 기반 반응형 디자인 채택

## 상태
승인됨 (Accepted)

## 컨텍스트
다양한 기기 크기(iPhone 12 mini 375px ~ 대형 기기)를 지원해야 합니다.

요구사항:
- 미디어 쿼리 최소화
- 유연한 크기 조절
- 디자인 일관성 유지

## 결정
CSS `clamp()` 함수를 사용한 유동적 반응형 디자인을 채택합니다.

## 구현

```css
/* 기존 방식 */
@media (max-width: 375px) {
  font-size: 24px;
}
@media (min-width: 376px) {
  font-size: 32px;
}

/* clamp() 방식 */
font-size: clamp(24px, 8vw, 32px);
```

### 적용 패턴

| 요소 | clamp 값 | 설명 |
|------|---------|------|
| Title | clamp(24px, 8vw, 32px) | 375px에서 24px, 400px에서 32px |
| Subtitle | clamp(14px, 4vw, 16px) | 최소 14px 보장 |
| Gap | clamp(16px, 6vw, 24px) | 간격 유동적 조절 |
| Height | clamp(150px, 28vh, 190px) | 높이도 유동적 |

## 결과

### 긍정적
- 미디어 쿼리 불필요
- 부드러운 크기 전환
- 코드 간결화

### 부정적
- 정확한 브레이크포인트 제어 어려움
- 디버깅 시 계산 필요

## AI 협업 노트
- Claude Code가 적절한 min/preferred/max 값 제안
- 6개 화면에 일괄 적용
- 375x667 (iPhone 12 mini) 기준 테스트

---

*작성일: 2025-04-12*
