'use client';

import { useEffect, useState } from 'react';

interface OnboardingScreenProps {
  step: 1 | 2 | 3;
  onNext: () => void;
}

export default function OnboardingScreen({ step, onNext }: OnboardingScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [step]);

  // Step 1: 일러스트만 (텍스트 없음)
  if (step === 1) {
    return (
      <div
        className="relative min-h-dvh w-full overflow-hidden cursor-pointer"
        onClick={onNext}
      >
        {/* 전체 화면 일러스트 배경 */}
        <div className="absolute inset-0 bg-black">
          <img
            src="/images/splash01-full.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  // Step 2: 길을 잃었나요? (chips at bottom)
  if (step === 2) {
    return (
      <div
        className="relative min-h-dvh w-full overflow-hidden cursor-pointer"
        onClick={onNext}
      >
        {/* 별 배경 */}
        <div className="absolute inset-0 bg-black">
          <img
            src="/images/bg-stars.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        </div>

        {/* 중앙 타이틀 */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1
            className="text-[24px] font-bold text-white text-center whitespace-nowrap leading-[1.5] tracking-[-0.55px]"
            style={{ fontFamily: "'Pretendard Variable', sans-serif" }}
          >
            길을 잃었나요?
          </h1>
        </div>

        {/* 칩들 - 하단에 배치 */}
        <div
          className={`absolute bottom-[100px] left-[20px] right-[20px] flex flex-wrap gap-[8px] justify-center transition-all duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          {['나만 뒤쳐지나봐.', '꿈이 없어.', '뭘하고 싶은지 모르겠어.'].map((chip, index) => (
            <div
              key={index}
              className="px-[12px] py-[8px] rounded-[8px]"
              style={{
                backgroundColor: 'rgba(112, 115, 124, 0.2)',
              }}
            >
              <span
                className="text-[14px] font-medium whitespace-nowrap leading-[1.429] tracking-[0.2px]"
                style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: "'Pretendard Variable', sans-serif",
                }}
              >
                {chip}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Step 3: 요정들이 도와줄게요
  return (
    <div
      className="relative min-h-dvh w-full overflow-hidden cursor-pointer"
      onClick={onNext}
    >
      {/* 별 배경 */}
      <div className="absolute inset-0 bg-black">
        <img
          src="/images/bg-stars.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      </div>

      {/* 중앙 타이틀 */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h1
          className="text-[24px] font-bold text-white text-center whitespace-pre-line leading-[1.5] tracking-[-0.55px]"
          style={{ fontFamily: "'Pretendard Variable', sans-serif" }}
        >
          요정들이
          <br />
          도와줄게요
        </h1>
      </div>
    </div>
  );
}
