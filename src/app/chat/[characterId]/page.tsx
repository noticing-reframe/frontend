'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ChatScreen from '@/components/screens/ChatScreen';
import { mockCharacters } from '@/data/mockCharacters';
import type { ChatMessage, Character } from '@/types';

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const character = useMemo(() => {
    return mockCharacters.find((c) => c.id === characterId);
  }, [characterId]);

  // Initialize with greeting message
  useEffect(() => {
    if (character && messages.length === 0) {
      const concern = localStorage.getItem('userConcern') || '';
      const initialMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `안녕하세요. 저도 비슷한 고민을 겪어봤어요. ${concern ? `"${concern.slice(0, 50)}..."에 대해 이야기하고 싶으시군요. ` : ''}편하게 이야기해주세요.`,
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
    }
  }, [character, messages.length]);

  const handleSendMessage = useCallback(
    (content: string) => {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // AI response simulation
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: getAIResponse(content, character),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
    },
    [character]
  );

  const handleBack = () => {
    router.push(`/characters/${characterId}`);
  };

  if (!character) {
    return (
      <div className="min-h-dvh bg-black flex items-center justify-center">
        <p className="text-white">캐릭터를 찾을 수 없습니다.</p>
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

function getAIResponse(userMessage: string, character: Character | undefined): string {
  if (!character) return '';

  const responses = [
    `그렇군요. ${userMessage.slice(0, 20)}... 라고 느끼셨군요. 저도 비슷한 경험이 있어요.`,
    `네, 충분히 이해해요. 그런 상황에서는 누구나 힘들 수 있어요.`,
    `당신의 이야기를 들으니 제가 겪었던 일이 떠오르네요. 그때 저는...`,
    `힘드셨겠어요. 하지만 이렇게 이야기하는 것만으로도 큰 용기예요.`,
    `저도 비슷한 고민을 했었어요. 그때 제가 깨달은 건, 완벽할 필요가 없다는 거였어요.`,
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}
