'use client';

import { useRouter, useParams } from 'next/navigation';
import { useMemo } from 'react';
import CharacterDetailScreen from '@/components/screens/CharacterDetailScreen';
import { mockCharacters } from '@/data/mockCharacters';

export default function CharacterDetailPage() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.id as string;

  const character = useMemo(() => {
    return mockCharacters.find((c) => c.id === characterId);
  }, [characterId]);

  const handleStartChat = () => {
    router.push(`/chat/${characterId}`);
  };

  const handleBack = () => {
    router.push('/characters');
  };

  if (!character) {
    return (
      <div className="min-h-dvh bg-black flex items-center justify-center">
        <p className="text-white">캐릭터를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <CharacterDetailScreen
      character={character}
      onStartChat={handleStartChat}
      onBack={handleBack}
    />
  );
}
