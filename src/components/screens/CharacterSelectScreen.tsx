'use client';

import type { Character } from '@/types';

interface CharacterSelectScreenProps {
  characters: Character[];
  onSelect: (character: Character) => void;
  onBack: () => void;
}

export default function CharacterSelectScreen({
  characters,
  onSelect,
  onBack,
}: CharacterSelectScreenProps) {
  return (
    <div className="relative flex flex-col min-h-dvh w-full overflow-hidden bg-black">
      {/* 배경 이미지 + 90% 검정 오버레이 */}
      <div className="absolute inset-0">
        <img
          src="/images/background/2-Splash02.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      {/* Status Safe Area - 44px (LoadingScreen과 동일) */}
      <div
        className="relative z-10 w-full pt-[env(safe-area-inset-top)]"
        style={{ height: '44px' }}
      >
        {/* Back Button - 우측 상단 배치 */}
        <button
          onClick={onBack}
          className="absolute flex items-center justify-center"
          style={{
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
          }}
        >
          <img
            src="/images/icons/chevron-left.svg"
            alt="뒤로가기"
            style={{
              width: '40px',
              height: '40px',
            }}
          />
        </button>
      </div>

      {/* Frame 30 - padding: 10px 20px 20px 20px (LoadingScreen과 동일한 타이틀 위치) */}
      <div
        className="relative z-10 flex flex-col items-start flex-1 w-full overflow-hidden"
        style={{ padding: '10px 20px 20px 20px', gap: 'clamp(24px, 10vw, 40px)' }}
      >
        {/* 타이틀 - Title 1/Bold: 32px, line-height: 137.5%, letter-spacing: -0.0253em */}
        <h1
          className="w-full animate-fade-in"
          style={{
            fontFamily: "'Pretendard JP', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(24px, 8vw, 32px)',
            lineHeight: 1.375,
            letterSpacing: '-0.0253em',
            color: '#FFFFFF',
          }}
        >
          대화를 진행할
          <br />
          요정을 선택해주세요
        </h1>

        {/* Frame 29 - 캐릭터 리스트: gap: 20px */}
        <div
          className="flex flex-col items-start w-full flex-1 overflow-y-auto scrollbar-hide"
          style={{ gap: '20px', paddingBottom: 'env(safe-area-inset-bottom, 34px)' }}
        >
          {characters.map((character, index) => (
            <button
              key={character.character_id}
              onClick={() => onSelect(character)}
              className="flex items-stretch w-full text-left transition-all duration-300 hover:opacity-90 active:scale-[0.99] animate-fade-in-up"
              style={{
                gap: '12px',
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {/* Thumbnail - 너비 고정, 높이는 텍스트 영역에 맞춤 */}
              <div
                className="relative flex-shrink-0 overflow-hidden self-stretch"
                style={{
                  width: 'clamp(72px, 25vw, 96px)',
                  borderRadius: '12px',
                }}
              >
                <img
                  src={`/images/character/${character.profile_image}.jpg`}
                  alt={character.character_name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Border - 1px solid rgba(112, 115, 124, 0.22) */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    border: '1px solid rgba(112, 115, 124, 0.22)',
                    borderRadius: '12px',
                  }}
                />
              </div>

              {/* Wrapper - gap: 8px, 텍스트가 높이 결정 */}
              <div
                className="flex-1 flex flex-col min-w-0"
                style={{ gap: '8px' }}
              >
                {/* Content - gap: 4px */}
                <div
                  className="flex flex-col items-start w-full"
                  style={{ gap: '4px' }}
                >
                  {/* 제목 - Body 2/Normal Bold: 15px, line-height: 146.7%, letter-spacing: 0.0096em */}
                  <p
                    className="w-full truncate"
                    style={{
                      fontFamily: "'Pretendard JP', sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(14px, 4vw, 15px)',
                      lineHeight: 1.467,
                      letterSpacing: '0.0096em',
                      color: '#F7F7F8',
                    }}
                  >
                    {character.character_name}
                  </p>

                  {/* 캡션 - Label 2/Medium: 13px, line-height: 138.5%, letter-spacing: 0.0194em */}
                  <p
                    className="w-full line-clamp-2"
                    style={{
                      fontFamily: "'Pretendard JP', sans-serif",
                      fontWeight: 500,
                      fontSize: 'clamp(12px, 3.5vw, 13px)',
                      lineHeight: 1.385,
                      letterSpacing: '0.0194em',
                      color: 'rgba(194, 196, 200, 0.88)',
                    }}
                  >
                    {character.character_tagline}
                  </p>

                  {/* 추가 캡션 (매칭 이유) - Label 2/Medium: 13px */}
                  {character.reason && (
                    <p
                      className="w-full line-clamp-2"
                      style={{
                        fontFamily: "'Pretendard JP', sans-serif",
                        fontWeight: 500,
                        fontSize: 'clamp(12px, 3.5vw, 13px)',
                        lineHeight: 1.385,
                        letterSpacing: '0.0194em',
                        color: 'rgba(174, 176, 182, 0.61)',
                      }}
                    >
                      &ldquo;{character.reason}&rdquo;
                    </p>
                  )}
                </div>

                {/* Bottom Content - gap: 6px */}
                <div
                  className="flex flex-wrap items-start w-full"
                  style={{ gap: '6px' }}
                >
                  {/* Badges */}
                  {character.tags.map((tag, tagIndex) => (
                    <div
                      key={tagIndex}
                      className="relative flex items-center justify-center"
                      style={{
                        padding: '3px 6px',
                        backgroundColor: '#1B1C1E',
                        borderRadius: '6px',
                      }}
                    >
                      {/* Opacity - 라임 그린 오버레이 */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundColor: '#6BE016',
                          opacity: 0.08,
                          borderRadius: '6px',
                        }}
                      />
                      {/* 텍스트 - Caption 2/Medium: 11px */}
                      <span
                        className="relative"
                        style={{
                          fontFamily: "'Pretendard JP', sans-serif",
                          fontWeight: 500,
                          fontSize: 'clamp(10px, 3vw, 11px)',
                          lineHeight: 1.273,
                          letterSpacing: '0.0311em',
                          color: '#6BE016',
                        }}
                      >
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </button>
          ))}

          {/* 빈 상태 */}
          {characters.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full py-20">
              <p
                style={{
                  fontFamily: "'Pretendard JP', sans-serif",
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: 1.625,
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                매칭된 요정이 없습니다
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
