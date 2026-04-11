'use client';

import type { Character } from '@/types';

interface CharacterDetailScreenProps {
  character: Character;
  onStartChat: () => void;
  onBack: () => void;
}

export default function CharacterDetailScreen({
  character,
  onStartChat,
  onBack,
}: CharacterDetailScreenProps) {
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
        {/* 뒤로가기 버튼 */}
        <div style={{ padding: '0 5.33%', marginBottom: '16px' }}>
          <button
            onClick={onBack}
            className="flex items-center justify-center"
            style={{ width: '32px', height: '32px' }}
          >
            <img
              src="/images/icons/chevron-left.svg"
              alt="뒤로가기"
              style={{ width: '32px', height: '32px' }}
            />
          </button>
        </div>

        {/* 스크롤 영역 */}
        <div
          className="flex-1 overflow-y-auto scrollbar-hide"
          style={{ padding: '0 5.33% 160px 5.33%' }}
        >
          {/* 프로필 이미지 - 정사각형 */}
          <div className="animate-fade-in" style={{ marginBottom: '24px' }}>
            <div
              className="w-full overflow-hidden"
              style={{
                aspectRatio: '1 / 1',
                borderRadius: '12px',
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
                  <span style={{ fontSize: '80px' }}>🧚</span>
                </div>
              )}
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="animate-fade-in" style={{ marginBottom: '24px' }}>
            {/* 이름 - 32px Bold */}
            <h1
              className="font-bold text-white"
              style={{
                fontSize: '32px',
                lineHeight: 1.375,
                letterSpacing: '-0.8px',
                marginBottom: '8px',
              }}
            >
              {character.name}
            </h1>

            {/* 짧은 설명 - 18px Regular, #f7f7f8 */}
            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.445,
                letterSpacing: '-0.004px',
                color: '#f7f7f8',
                marginBottom: '8px',
              }}
            >
              {character.shortDescription}
            </p>

            {/* 타입 뱃지 */}
            <span
              className="inline-block"
              style={{
                padding: '3px 6px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: 1.333,
                letterSpacing: '0.34px',
                backgroundColor: 'rgba(112, 115, 124, 0.22)',
                color: 'rgba(174, 176, 182, 0.61)',
              }}
            >
              {character.type}
            </span>
          </div>

          {/* 구분선 */}
          <div
            style={{
              height: '1px',
              backgroundColor: 'rgba(112, 115, 124, 0.32)',
              marginBottom: '24px',
            }}
          />

          {/* 당신과 하고 싶은 대화 */}
          <div className="animate-fade-in-up" style={{ marginBottom: '24px' }}>
            <h3
              className="font-semibold"
              style={{
                fontSize: '20px',
                lineHeight: 1.4,
                letterSpacing: '-0.24px',
                color: '#f7f7f8',
                marginBottom: '8px',
              }}
            >
              당신과 하고 싶은 대화
            </h3>

            <div className="relative">
              {/* 인용 부호 - 왼쪽 상단 */}
              <img
                src="/images/icons/quote.svg"
                alt=""
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '25px',
                  height: '18px',
                }}
              />

              {/* 인용 부호 - 오른쪽 상단 (180도 회전) */}
              <img
                src="/images/icons/quote.svg"
                alt=""
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: '25px',
                  height: '18px',
                  transform: 'rotate(180deg)',
                }}
              />

              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.625,
                  letterSpacing: '0.09px',
                  color: '#f7f7f8',
                  padding: '24px 0 0 0',
                }}
              >
                {character.wantToTalk}
              </p>
            </div>
          </div>

          {/* 구분선 */}
          <div
            style={{
              height: '1px',
              backgroundColor: 'rgba(112, 115, 124, 0.32)',
              marginBottom: '24px',
            }}
          />

          {/* 요정의 삶 */}
          <div className="animate-fade-in-up">
            <h3
              className="font-semibold"
              style={{
                fontSize: '20px',
                lineHeight: 1.4,
                letterSpacing: '-0.24px',
                color: '#f7f7f8',
                marginBottom: '14px',
              }}
            >
              요정의 삶
            </h3>

            {/* 카드 - backdrop-blur with specific border-radius */}
            <div
              style={{
                padding: '20px',
                borderRadius: '0 12px 12px 12px',
                backgroundColor: 'rgba(33, 34, 37, 0.61)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
              }}
            >
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.5,
                  letterSpacing: '0.09px',
                  color: 'rgba(194, 196, 200, 0.88)',
                }}
              >
                {character.lifeStory}
              </p>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            padding: '20px 5.33%',
            paddingBottom: '54px',
            background: 'linear-gradient(to top, rgba(0,0,0,1) 70%, transparent 100%)',
          }}
        >
          <button
            onClick={onStartChat}
            className="w-full flex items-center justify-center transition-all duration-300"
            style={{
              padding: '16px 28px',
              borderRadius: '12px',
              backgroundColor: '#58CF04',
            }}
          >
            <span
              className="font-semibold"
              style={{
                fontSize: '16px',
                lineHeight: 1.5,
                letterSpacing: '0.09px',
                color: '#000000',
              }}
            >
              더 깊게 대화 시작하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
