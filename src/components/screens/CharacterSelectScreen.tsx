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
          src="/images/bg-stars.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      {/* Status Safe Area - 44px */}
      <div className="relative z-10 w-full" style={{ height: '44px' }} />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* 헤더 영역 */}
        <div style={{ padding: '0 5.33%' }}>
          {/* 뒤로가기 버튼 */}
          <button
            onClick={onBack}
            className="flex items-center justify-center"
            style={{ width: '32px', height: '32px', marginBottom: '24px' }}
          >
            <img
              src="/images/icons/chevron-left.svg"
              alt="뒤로가기"
              style={{ width: '32px', height: '32px' }}
            />
          </button>

          {/* 타이틀 */}
          <h1
            className="font-bold text-white animate-fade-in"
            style={{
              fontSize: '32px',
              lineHeight: 1.375,
              letterSpacing: '-0.8px',
              marginBottom: '24px',
            }}
          >
            <span className="block">당신의 고민에</span>
            <span className="block">어울리는 요정이에요</span>
          </h1>
        </div>

        {/* 캐릭터 리스트 */}
        <div
          className="flex-1 overflow-y-auto scrollbar-hide"
          style={{ padding: '0 5.33% 34px 5.33%' }}
        >
          <div className="flex flex-col" style={{ gap: '20px' }}>
            {characters.map((character, index) => (
              <button
                key={character.character_id}
                onClick={() => onSelect(character)}
                className="flex text-left transition-all duration-300 hover:opacity-90 active:scale-[0.99] animate-fade-in-up"
                style={{
                  gap: '16px',
                  padding: 0,
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {/* 프로필 이미지 */}
                <div
                  className="flex-shrink-0 overflow-hidden"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '16px',
                  }}
                >
                  <img
                    src={`/images/character/${character.profile_image}.png`}
                    alt={character.character_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 정보 */}
                <div
                  className="flex-1 flex flex-col justify-center min-w-0"
                >
                  {/* 이름 */}
                  <h3
                    className="font-semibold text-white"
                    style={{
                      fontSize: '18px',
                      lineHeight: 1.4,
                      letterSpacing: '-0.2px',
                      marginBottom: '4px',
                    }}
                  >
                    {character.character_name}
                  </h3>

                  {/* tagline */}
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.5,
                      letterSpacing: '0.1px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginBottom: '8px',
                    }}
                  >
                    {character.character_tagline}
                  </p>

                  {/* 매칭 이유 */}
                  {character.reason && (
                    <p
                      className="line-clamp-2"
                      style={{
                        fontSize: '13px',
                        lineHeight: 1.4,
                        letterSpacing: '0.1px',
                        color: 'rgba(88, 207, 4, 0.9)',
                      }}
                    >
                      {character.reason}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* 빈 상태 */}
          {characters.length === 0 && (
            <div
              className="flex flex-col items-center justify-center"
              style={{ paddingTop: '80px', paddingBottom: '80px' }}
            >
              <p
                style={{
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
