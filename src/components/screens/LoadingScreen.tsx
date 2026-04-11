'use client';

import { useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    // 3초 후 완료
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="relative flex flex-col min-h-dvh bg-black overflow-hidden">
      {/* 배경 일러스트 이미지 - 흔들리는 애니메이션 */}
      <div className="absolute inset-0">
        <div className="animate-bottle-swing w-full h-full">
          <img
            src="/images/loading-hand.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Status Safe Area - 44px */}
      <div className="relative z-10 w-full" style={{ height: '44px' }} />

      {/* 로딩 텍스트 - 좌상단 (top: 108px = 44px + 64px) */}
      <div
        className="relative z-10 animate-fade-in"
        style={{ padding: '64px 5.33% 0 5.33%' }}
      >
        <h1
          className="font-bold text-white m-0"
          style={{
            fontSize: '32px',
            lineHeight: 1.375,
            letterSpacing: '-0.8px',
          }}
        >
          <span className="block">고민을 들은</span>
          <span className="block">요정이 모이고 있어요</span>
        </h1>
      </div>
    </div>
  );
}
