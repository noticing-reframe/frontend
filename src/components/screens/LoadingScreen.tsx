'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [glowVisible, setGlowVisible] = useState(false);

  useEffect(() => {
    // 빛나는 애니메이션 - 1.6초 간격으로 반복
    const glowInterval = setInterval(() => {
      setGlowVisible((prev) => !prev);
    }, 1600);

    return () => {
      clearInterval(glowInterval);
    };
  }, []);

  return (
    <div className="relative flex flex-col min-h-dvh bg-black overflow-hidden">
      {/* 베이스 이미지 - 7-Loading.svg */}
      <img
        src="/images/background/7-Loading.svg"
        alt=""
        className="absolute top-1/2 left-0 w-full h-auto -translate-y-1/2"
      />

      {/* 빛나는 오버레이 - 8-Loading.svg (페이드 인/아웃) */}
      <img
        src="/images/background/8-Loading.svg"
        alt=""
        className="absolute top-1/2 left-0 w-full h-auto -translate-y-1/2 transition-opacity duration-700"
        style={{ opacity: glowVisible ? 1 : 0 }}
      />

      {/* Status Safe Area - 44px */}
      <div className="relative z-10 w-full" style={{ height: '44px' }} />

      {/* 로딩 텍스트 - 좌상단 */}
      <div
        className="relative z-10"
        style={{ padding: '10px 5.33% 0 5.33%' }}
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
