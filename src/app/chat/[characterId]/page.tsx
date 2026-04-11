'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ChatScreen from '@/components/screens/ChatScreen';
import { streamChat, type ChatMessage as ApiChatMessage } from '@/api/api';
import type { ChatMessage, Character } from '@/types';

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  const [character, setCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userWorry, setUserWorry] = useState('');
  const streamingRef = useRef<string>('');
  const initialMessageSentRef = useRef(false);

  // 캐릭터 및 유저 걱정 로드
  useEffect(() => {
    const matched = localStorage.getItem('matchedCharacters');
    const concern = localStorage.getItem('userConcern') || '';
    setUserWorry(concern);

    if (matched) {
      try {
        const characters = JSON.parse(matched) as Character[];
        const found = characters.find((c) => c.character_id === characterId);
        if (found) {
          setCharacter(found);
        } else {
          router.push('/characters');
        }
      } catch {
        router.push('/characters');
      }
    } else {
      router.push('/input');
    }
  }, [characterId, router]);

  // 메시지를 API 형식으로 변환
  const toApiMessages = useCallback((msgs: ChatMessage[]): ApiChatMessage[] => {
    return msgs.map((m) => ({
      role: m.role === 'user' ? 'user' : 'person',
      text: m.content,
    }));
  }, []);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!character || isLoading) return;

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
      };

      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setIsLoading(true);
      streamingRef.current = '';

      // AI 응답 메시지 추가 (스트리밍용)
      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: ChatMessage = {
        id: aiMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };
      setMessages([...newMessages, aiMessage]);

      await streamChat(
        characterId,
        userWorry,
        toApiMessages(newMessages),
        // onChunk
        (text) => {
          streamingRef.current += text;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMessageId ? { ...m, content: streamingRef.current } : m
            )
          );
        },
        // onDone
        () => {
          setIsLoading(false);
        },
        // onError
        (error) => {
          console.error('Chat error:', error);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMessageId
                ? { ...m, content: '죄송해요, 오류가 발생했어요. 다시 시도해주세요.' }
                : m
            )
          );
          setIsLoading(false);
        }
      );
    },
    [character, characterId, isLoading, messages, toApiMessages, userWorry]
  );

  // 채팅 진입 시 유저 걱정을 첫 메시지로 자동 발송
  useEffect(() => {
    if (character && userWorry && !initialMessageSentRef.current) {
      initialMessageSentRef.current = true;
      handleSendMessage(userWorry);
    }
  }, [character, userWorry, handleSendMessage]);

  const handleBack = () => {
    router.push(`/characters/${characterId}`);
  };

  if (!character) {
    return (
      <div className="min-h-dvh bg-black flex items-center justify-center">
        <p className="text-white">로딩 중...</p>
      </div>
    );
  }

  return (
    <ChatScreen
      character={character}
      messages={messages}
      onSendMessage={handleSendMessage}
      onBack={handleBack}
      isLoading={isLoading}
    />
  );
}
