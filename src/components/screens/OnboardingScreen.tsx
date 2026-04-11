'use client';

import { useEffect, useState } from 'react';

interface OnboardingScreenProps {
  step: 1 | 2 | 3 | 4;
}

export default function OnboardingScreen({ step }: OnboardingScreenProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [bgTransition, setBgTransition] = useState(false);

  // 배경 전환 시작 (0.5초 대기 후, 2초 동안 전환)
  useEffect(() => {
    const timer = setTimeout(() => setBgTransition(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // 텍스트 페이드인/아웃 (1.8초 간격에 맞춤)
  useEffect(() => {
    setIsVisible(false);
    const fadeIn = setTimeout(() => setIsVisible(true), 50);
    const fadeOut = setTimeout(() => setIsVisible(false), 1400);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fadeOut);
    };
  }, [step]);

  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-black">
      {/* 배경 1: 1-Splash01.svg */}
      <img
        src="/images/background/1-Splash01.svg"
        alt=""
        className="absolute top-1/2 left-0 w-full h-auto -translate-y-1/2 transition-opacity duration-[2000ms]"
        style={{ opacity: bgTransition ? 0 : 1 }}
      />

      {/* 배경 2: 2-Splash02.svg */}
      <img
        src="/images/background/2-Splash02.svg"
        alt=""
        className="absolute top-1/2 left-0 w-full h-auto -translate-y-1/2 transition-opacity duration-[2000ms]"
        style={{ opacity: bgTransition ? 1 : 0 }}
      />

      {/* 텍스트 (step 2, 3, 4에서만) */}
      {step >= 2 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ top: '50%' }}
        >
          <h1
            className="text-white text-center whitespace-pre font-bold transition-opacity duration-300"
            style={{
              fontSize: '32px',
              lineHeight: 1.375,
              letterSpacing: '-0.8px',
              opacity: isVisible ? 1 : 0,
            }}
          >
            {step === 2 && '혹시\n길을 잃어버렸나요?'}
            {step === 3 && '걱정하지말아요'}
            {step === 4 && '요정들이\n도와줄게요'}
          </h1>
        </div>
      )}
    </div>
  );
}
