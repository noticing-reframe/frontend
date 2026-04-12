'use client';

import { useEffect, useState } from 'react';

interface OnboardingScreenProps {
  step: 1 | 2 | 3 | 4;
}

const stepTexts: Record<2 | 3 | 4, string> = {
  2: '혹시\n길을 잃어버렸나요?',
  3: '걱정하지말아요',
  4: '요정들이\n도와줄게요',
};

export default function OnboardingScreen({ step }: OnboardingScreenProps) {
  const [bgTransition, setBgTransition] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // 배경 전환 시작 (2초 대기 후, 2초 동안 전환)
  useEffect(() => {
    const timer = setTimeout(() => setBgTransition(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 타이핑 효과
  useEffect(() => {
    if (step < 2) return;

    const fullText = stepTexts[step as 2 | 3 | 4];
    setDisplayedText('');
    setIsVisible(true);

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 120); // 120ms per character (천천히)

    // 타이핑 완료 후 잠시 대기 + 페이드아웃
    const typingDuration = fullText.length * 120;
    const fadeOut = setTimeout(() => setIsVisible(false), typingDuration + 300);

    return () => {
      clearInterval(typingInterval);
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
              fontSize: 'clamp(24px, 8vw, 32px)',
              lineHeight: 1.375,
              letterSpacing: '-0.8px',
              opacity: isVisible ? 1 : 0,
            }}
          >
            {displayedText}
          </h1>
        </div>
      )}
    </div>
  );
}
