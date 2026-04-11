'use client';

import { useState, useRef, useEffect } from 'react';
import type { Character, ChatMessage } from '@/types';

interface ChatScreenProps {
  character: Character;
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export default function ChatScreen({
  character,
  messages,
  onSendMessage,
  onBack,
  isLoading = false,
}: ChatScreenProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 새 메시지 시 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 한글 IME 조합 중에는 무시
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex flex-col h-dvh w-full overflow-hidden bg-black">
      {/* 배경 이미지 + 90% 검정 오버레이 */}
      <div className="absolute inset-0">
        <img
          src="/images/background/2-Splash02.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      {/* 고정 헤더 영역 */}
      <div className="relative z-20 flex-shrink-0">
        {/* Status Safe Area - 44px (CharacterSelectScreen과 동일) */}
        <div
          className="relative w-full pt-[env(safe-area-inset-top)]"
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

        {/* 안내 문구 */}
        <div
          className="flex items-center justify-center gap-[4px]"
          style={{ padding: '10px 20px' }}
        >
          <img
            src="/images/icons/circle-exclamation.svg"
            alt=""
            style={{ width: '16px', height: '16px' }}
          />
          <span
            style={{
              fontSize: '12px',
              lineHeight: 1.334,
              letterSpacing: '0.3px',
              color: 'rgba(194, 196, 200, 0.88)',
            }}
          >
            실제 인물의 철학·인터뷰를 학습한 AI가 생성한 내용이에요
          </span>
        </div>
      </div>

      {/* 메시지 영역 - 스크롤 가능 */}
      <div
        className="relative z-10 flex-1 overflow-y-auto scrollbar-hide"
        style={{ padding: '20px 0' }}
      >
        {/* 메시지 리스트 */}
        <div style={{ padding: '0 20px' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{ marginBottom: '20px' }}
            >
              {/* AI 메시지 */}
              {message.role === 'assistant' && (
                <div className="flex gap-[4px] items-start">
                  {/* 프로필 이미지 */}
                  <div
                    className="flex-shrink-0 overflow-hidden"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '96px',
                      border: '1px solid rgba(107, 224, 22, 0.16)',
                      backgroundColor: 'white',
                    }}
                  >
                      <img
                      src={`/images/character/${character.profile_image}.jpg`}
                      alt={character.character_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 메시지 콘텐츠 */}
                  <div className="flex-1 flex flex-col gap-[4px]">
                    {/* 이름 라벨 */}
                    <p
                      style={{
                        fontSize: '12px',
                        lineHeight: 1.334,
                        letterSpacing: '0.3px',
                        color: 'rgba(194, 196, 200, 0.88)',
                      }}
                    >
                      {character.character_tagline}
                    </p>

                    {/* 메시지 버블 */}
                    <div
                      style={{
                        padding: '12px 20px',
                        borderRadius: '0 12px 12px 12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(32px)',
                        WebkitBackdropFilter: 'blur(32px)',
                      }}
                    >
                      {/* 로딩 중이고 content가 비어있으면 로딩 dots 표시 */}
                      {isLoading && !message.content ? (
                        <div className="flex gap-[4px]">
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-[6px] h-[6px] rounded-full animate-pulse"
                              style={{
                                backgroundColor: '#58CF04',
                                animationDelay: `${i * 0.2}s`,
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <p
                          style={{
                            fontSize: '14px',
                            lineHeight: 1.571,
                            letterSpacing: '0.2px',
                            color: '#f7f7f8',
                          }}
                        >
                          {message.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 유저 메시지 */}
              {message.role === 'user' && (
                <div className="flex gap-[4px] items-start">
                  {/* 메시지 콘텐츠 */}
                  <div className="flex-1 flex flex-col gap-[4px] items-end">
                    {/* 나 라벨 */}
                    <p
                      style={{
                        fontSize: '12px',
                        lineHeight: 1.334,
                        letterSpacing: '0.3px',
                        color: 'rgba(194, 196, 200, 0.88)',
                      }}
                    >
                      나
                    </p>

                    {/* 메시지 버블 */}
                    <div
                      style={{
                        padding: '12px 20px',
                        borderRadius: '12px 0 12px 12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(32px)',
                        WebkitBackdropFilter: 'blur(32px)',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '14px',
                          lineHeight: 1.571,
                          letterSpacing: '0.2px',
                          color: '#f7f7f8',
                        }}
                      >
                        {message.content}
                      </p>
                    </div>
                  </div>

                  {/* 유저 프로필 이미지 */}
                  <div
                    className="flex-shrink-0 overflow-hidden"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '96px',
                      border: '0.43px solid #1B1C1E',
                      backgroundColor: 'white',
                    }}
                  >
                    <img
                      src="/images/icons/user.svg"
                      alt="나"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 입력 영역 - 하단 고정 */}
      <div
        className="relative z-20 flex-shrink-0"
        style={{ padding: '20px', paddingBottom: '54px' }}
      >
        <div className="flex gap-[8px] items-center">
          {/* 텍스트 입력 필드 */}
          <div
            className="flex-1"
            style={{
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(112, 115, 124, 0.16)',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="고민을 입력해 주세요."
              className="w-full bg-transparent outline-none"
              style={{
                fontSize: '16px',
                lineHeight: 1.5,
                letterSpacing: '0.09px',
                color: '#f7f7f8',
              }}
            />
          </div>

          {/* 전송 버튼 */}
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="flex items-center justify-center flex-shrink-0 transition-opacity duration-200 disabled:opacity-50"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#58CF04',
            }}
          >
            <img
              src="/images/icons/send.svg"
              alt="전송"
              style={{ width: '24px', height: '24px' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
