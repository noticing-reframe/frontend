'use client';

import { useState } from 'react';
import type { Character, CharacterType } from '@/types';

interface CharacterSelectScreenProps {
  characters: Character[];
  onSelect: (character: Character) => void;
  onBack: () => void;
}

const filterChips: { label: string; value: CharacterType }[] = [
  { label: '역사적 인물', value: '역사적 인물' },
  { label: '비슷한 경험자', value: '비슷한 경험자' },
  { label: '유명인', value: '유명인' },
  { label: '정치인', value: '정치인' },
];

export default function CharacterSelectScreen({
  characters,
  onSelect,
  onBack,
}: CharacterSelectScreenProps) {
  const [activeFilter, setActiveFilter] = useState<CharacterType>('비슷한 경험자');

  const filteredCharacters = characters.filter((c) => c.type === activeFilter);

  return (
    <div className="relative flex flex-col min-h-dvh w-full overflow-hidden bg-black">
      {/* 배경 이미지 + 90% 검정 오버레이 (InputScreen과 동일) */}
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
            <span className="block">대화를 진행할</span>
            <span className="block">요정을 선택해주세요</span>
          </h1>

          {/* 필터 칩 */}
          <div
            className="flex overflow-x-auto scrollbar-hide"
            style={{
              gap: '8px',
              paddingBottom: '24px',
              marginLeft: '-5.33%',
              marginRight: '-5.33%',
              paddingLeft: '5.33%',
              paddingRight: '5.33%',
            }}
          >
            {filterChips.map((chip) => {
              const isActive = activeFilter === chip.value;
              return (
                <button
                  key={chip.value}
                  onClick={() => setActiveFilter(chip.value)}
                  className="flex-shrink-0 transition-all duration-200"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: 600,
                    lineHeight: 1.467,
                    letterSpacing: '0.09px',
                    backgroundColor: isActive ? '#58CF04' : 'transparent',
                    color: isActive ? '#000000' : 'rgba(255, 255, 255, 0.8)',
                    border: isActive ? 'none' : '1px solid rgba(107, 224, 22, 0.32)',
                  }}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 캐릭터 리스트 */}
        <div
          className="flex-1 overflow-y-auto scrollbar-hide"
          style={{ padding: '0 5.33% 34px 5.33%' }}
        >
          <div className="flex flex-col" style={{ gap: '20px' }}>
            {filteredCharacters.map((character, index) => (
              <button
                key={character.id}
                onClick={() => onSelect(character)}
                className="flex text-left transition-all duration-300 hover:opacity-90 active:scale-[0.99] animate-fade-in-up"
                style={{
                  gap: '16px',
                  padding: 0,
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {/* 프로필 이미지 - 140x186 (약 3:4 비율) */}
                <div
                  className="flex-shrink-0 overflow-hidden"
                  style={{
                    width: '140px',
                    height: '186px',
                    borderRadius: '8px',
                  }}
                >
                  {character.profileImage ? (
                    <img
                      src={character.profileImage}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(88, 207, 4, 0.3), rgba(88, 207, 4, 0.1))',
                      }}
                    >
                      <span style={{ fontSize: '48px' }}>🧚</span>
                    </div>
                  )}
                </div>

                {/* 정보 */}
                <div
                  className="flex-1 flex flex-col justify-start min-w-0"
                  style={{ paddingTop: '4px' }}
                >
                  {/* 이름 */}
                  <h3
                    className="font-semibold text-white"
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.467,
                      letterSpacing: '0.09px',
                      marginBottom: '4px',
                    }}
                  >
                    {character.name}
                  </h3>

                  {/* 짧은 설명 */}
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.385,
                      letterSpacing: '0.25px',
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '8px',
                    }}
                  >
                    {character.shortDescription}
                  </p>

                  {/* 인용문 */}
                  <p
                    className="line-clamp-2"
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.385,
                      letterSpacing: '0.25px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      marginBottom: '12px',
                    }}
                  >
                    &ldquo;{character.wantToTalk}&rdquo;
                  </p>

                  {/* 타입 뱃지 */}
                  <span
                    className="inline-flex self-start"
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: 1.333,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {character.type}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* 빈 상태 */}
          {filteredCharacters.length === 0 && (
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
                해당하는 요정이 없습니다
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
