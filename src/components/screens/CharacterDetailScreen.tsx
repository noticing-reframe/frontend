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
          src="/images/background/2-Splash02.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      {/* Status Safe Area - 44px (CharacterSelectScreen과 동일) */}
      <div
        className="relative z-10 w-full pt-[env(safe-area-inset-top)]"
        style={{ height: '44px' }}
      >
        {/* Back Button */}
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

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* 스크롤 영역 - Frame 22: padding: 20px, gap: 24px */}
        <div
          className="flex-1 overflow-y-auto scrollbar-hide flex flex-col"
          style={{ padding: '20px', gap: 'clamp(16px, 6vw, 24px)', paddingBottom: '130px' }}
        >
          {/* 프로필 이미지 - 335px x 335px */}
          <div className="animate-fade-in">
            <div
              className="w-full overflow-hidden relative"
              style={{
                aspectRatio: '1 / 1',
                borderRadius: '12px',
              }}
            >
              <img
                src={`/images/character/${character.profile_image}.jpg`}
                alt={character.character_name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Frame 20 - 기본 정보: gap: 8px */}
          <div
            className="animate-fade-in flex flex-col"
            style={{ gap: '8px' }}
          >
            {/* 이름 - Title 1/Bold: 반응형 */}
            <h1
              style={{
                fontFamily: "'Pretendard JP', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(24px, 8vw, 32px)',
                lineHeight: 1.375,
                letterSpacing: '-0.0253em',
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              {character.character_name}
            </h1>

            {/* 짧은 설명 - Headline 1/Regular: 반응형 */}
            <p
              style={{
                fontFamily: "'Pretendard JP', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(15px, 4.5vw, 18px)',
                lineHeight: 1.445,
                letterSpacing: '-0.0002em',
                color: '#F7F7F8',
                margin: 0,
              }}
            >
              {character.character_tagline} 요정
            </p>

            {/* Badges - flex wrap for multiple tags */}
            <div className="flex flex-wrap gap-2 self-start">
              {character.tags.map((tag, index) => (
                <div
                  key={index}
                  className="relative inline-flex items-center justify-center"
                  style={{
                    padding: '4px 6px',
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
                  {/* 텍스트 - Caption 1/Medium: 12px */}
                  <span
                    className="relative"
                    style={{
                      fontFamily: "'Pretendard JP', sans-serif",
                      fontWeight: 500,
                      fontSize: '12px',
                      lineHeight: 1.334,
                      letterSpacing: '0.0252em',
                      color: '#6BE016',
                    }}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              backgroundColor: 'rgba(112, 115, 124, 0.32)',
            }}
          />

          {/* Frame 26 - 당신과 하고 싶은 대화: gap: 8px */}
          <div
            className="animate-fade-in-up flex flex-col"
            style={{ gap: '8px' }}
          >
            {/* Heading 2/Bold: 20px */}
            <h3
              style={{
                fontFamily: "'Pretendard JP', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(17px, 5vw, 20px)',
                lineHeight: 1.4,
                letterSpacing: '-0.012em',
                color: '#F7F7F8',
                margin: 0,
              }}
            >
              당신과 하고 싶은 대화
            </h3>

            {/* Frame 32 - 인용 부호 */}
            <div
              className="flex justify-between items-start"
              style={{ gap: '8px' }}
            >
              {/* " 왼쪽 */}
              <img
                src="/images/icons/quote.svg"
                alt=""
                style={{
                  width: '25px',
                  height: '18px',
                }}
              />
              {/* " 오른쪽 (180도 회전) */}
              <img
                src="/images/icons/quote.svg"
                alt=""
                style={{
                  width: '25px',
                  height: '18px',
                  transform: 'rotate(180deg)',
                }}
              />
            </div>

            {/* 대화 힌트 - Body 1/Reading Regular: 16px */}
            <p
              style={{
                fontFamily: "'Pretendard JP', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: 1.625,
                letterSpacing: '0.0057em',
                color: '#F7F7F8',
                margin: 0,
              }}
            >
              {(Array.isArray(character.conversation_hint)
                ? character.conversation_hint
                : [character.conversation_hint]
              ).map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              backgroundColor: 'rgba(112, 115, 124, 0.32)',
            }}
          />

          {/* Frame 25 - 요정의 삶: gap: 14px */}
          <div
            className="animate-fade-in-up flex flex-col"
            style={{ gap: '14px' }}
          >
            {/* Heading 2/Bold: 20px */}
            <h3
              style={{
                fontFamily: "'Pretendard JP', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(17px, 5vw, 20px)',
                lineHeight: 1.4,
                letterSpacing: '-0.012em',
                color: '#F7F7F8',
                margin: 0,
              }}
            >
              요정의 삶
            </h3>

            {/* Frame 24 - 카드 */}
            <div
              style={{
                padding: '20px',
                borderRadius: '0px 12px 12px 12px',
                backgroundColor: 'rgba(33, 34, 37, 0.61)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
              }}
            >
              {/* Body 1/Normal Regular: 16px */}
              <p
                style={{
                  fontFamily: "'Pretendard JP', sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: 1.5,
                  letterSpacing: '0.0057em',
                  color: 'rgba(194, 196, 200, 0.88)',
                  margin: 0,
                }}
              >
                {character.character_background.split('\n').map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Action Area - 스티키 하단 버튼 */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20"
        style={{
          padding: '20px',
          paddingBottom: 'calc(34px + env(safe-area-inset-bottom, 14px))',
          maxWidth: '430px',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#000000',
        }}
      >
        {/* Main Action Button */}
        <button
          onClick={onStartChat}
          className="w-full flex items-center justify-center transition-all duration-300"
          style={{
            padding: '12px 28px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#6BE016',
          }}
        >
          <span
            style={{
              fontFamily: "'Pretendard JP', sans-serif",
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: 1.5,
              letterSpacing: '0.0057em',
              color: '#171719',
            }}
          >
            더 깊게 대화 시작하기
          </span>
        </button>
      </div>
    </div>
  );
}
