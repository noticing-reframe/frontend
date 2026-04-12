'use client';

import { useState } from 'react';

interface InputScreenProps {
  onSubmit: (concern: string) => void;
}

export default function InputScreen({ onSubmit }: InputScreenProps) {
  const [concern, setConcern] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 2000;

  const handleSubmit = () => {
    if (concern.trim()) {
      onSubmit(concern.trim());
    }
  };

  return (
    <div className="relative w-full min-h-dvh overflow-hidden bg-black">
      {/* 배경 이미지 - 온보딩과 동일 */}
      <img
        src="/images/background/2-Splash02.svg"
        alt=""
        className="absolute top-1/2 left-0 w-full h-auto -translate-y-1/2"
      />

      {/* Status Safe Area - 44px (LoadingScreen과 동일) */}
      <div className="relative z-10 w-full" style={{ height: '44px' }} />

      {/* 메인 콘텐츠 - padding-top: 10px (LoadingScreen과 동일한 타이틀 위치) */}
      <div
        className="relative z-10 flex flex-col gap-5"
        style={{ padding: '10px 20px 0 20px' }}
      >
        {/* 타이틀 영역 */}
        <div className="flex flex-col gap-2">
          <div
            className="font-bold text-white"
            style={{
              fontSize: '32px',
              letterSpacing: '-0.8px',
              lineHeight: 1.375,
            }}
          >
            <p className="m-0">더 자세히</p>
            <p className="m-0">고민을 알려주세요</p>
          </div>
          <p
            className="text-white/60 whitespace-pre-wrap m-0"
            style={{
              fontSize: '16px',
              lineHeight: 1.625,
              letterSpacing: '0.09px',
            }}
          >
            {`고민을 말해주면 가장 잘 조언을 해줄 수 있는 \n경험을 한 '요정'이 모일 거예요`}
          </p>
        </div>

        {/* Textarea 영역 - 190px 높이 */}
        <div className="relative flex flex-col w-full" style={{ height: '190px' }}>
          {/* Background with blur */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              borderRadius: '12px',
            }}
          />

          {/* Input Container */}
          <div
            className="relative flex flex-1 flex-col overflow-hidden"
            style={{ padding: '12px', gap: '10px', borderRadius: '12px' }}
          >
            {/* Textarea */}
            <div className="flex flex-1 items-start overflow-hidden">
              <div className="flex flex-1 flex-col h-full" style={{ padding: '0 4px' }}>
                <textarea
                  value={concern}
                  onChange={(e) => setConcern(e.target.value.slice(0, maxLength))}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="요즘 어떤 고민이 있으신가요?"
                  className="w-full h-full bg-transparent resize-none text-white placeholder:text-white/30 overflow-y-auto"
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.625,
                    letterSpacing: '0.09px',
                    outline: 'none',
                    border: 'none',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                />
              </div>
            </div>

            {/* Bottom - Character Count */}
            <div className="flex items-center justify-start">
              <div
                className="flex items-center text-white/40"
                style={{
                  padding: '0 4px',
                  fontSize: '13px',
                  lineHeight: 1.385,
                  letterSpacing: '0.25px',
                  opacity: 0.74,
                }}
              >
                <span>{concern.length}</span>
                <span>/2000</span>
              </div>
            </div>
          </div>

          {/* Border - 포커스시 강조 */}
          <div
            className="absolute inset-0 pointer-events-none transition-all"
            style={{
              border: isFocused
                ? '1px solid rgba(88, 207, 4, 0.5)'
                : '1px solid rgba(112, 115, 124, 0.16)',
              boxShadow: isFocused
                ? '0px 0px 0px 2px rgba(88, 207, 4, 0.2)'
                : '0px 1px 2px -1px rgba(23, 23, 23, 0.1)',
              borderRadius: '12px',
            }}
          />
        </div>
      </div>

      {/* Action Area - 하단 고정 */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="flex flex-col w-full" style={{ padding: '20px 20px' }}>
          <button
            onClick={handleSubmit}
            disabled={!concern.trim()}
            className="w-full flex items-center justify-center transition-all"
            style={{
              backgroundColor: concern.trim() ? '#58CF04' : '#2E2F33',
              padding: '12px 28px',
              borderRadius: '12px',
            }}
          >
            <span
              className="font-semibold"
              style={{
                fontSize: '16px',
                lineHeight: 1.5,
                letterSpacing: '0.09px',
                color: concern.trim() ? '#F7F7F8' : 'rgba(255, 255, 255, 0.28)',
              }}
            >
              고민 보내기
            </span>
          </button>
        </div>
        {/* Bottom Safe Area - 34px */}
        <div className="w-full" style={{ height: '34px' }} />
      </div>
    </div>
  );
}
