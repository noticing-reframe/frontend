'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CharacterDetailScreen from '@/components/screens/CharacterDetailScreen';
import type { Character } from '@/types';

export default function CharacterDetailPage() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.id as string;
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // localStorage에서 매칭된 캐릭터 목록 가져오기
    const matched = localStorage.getItem('matchedCharacters');
    if (matched) {
      try {
        const characters = JSON.parse(matched) as Character[];
        const found = characters.find((c) => c.character_id === characterId);
        if (found) {
          setCharacter(found);
        } else {
          router.push('/characters');
          return;
        }
      } catch {
        router.push('/characters');
        return;
      }
    } else {
      router.push('/input');
      return;
    }
    setIsLoading(false);
  }, [characterId, router]);

  const handleStartChat = () => {
    router.push(`/chat/${characterId}`);
  };

  const handleBack = () => {
    router.push('/characters');
  };

  if (isLoading || !character) {
    return null;
  }

  return (
    <CharacterDetailScreen
      character={character}
      onStartChat={handleStartChat}
      onBack={handleBack}
    />
  );
}
