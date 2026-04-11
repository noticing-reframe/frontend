'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CharacterSelectScreen from '@/components/screens/CharacterSelectScreen';
import type { Character } from '@/types';

export default function CharactersPage() {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // localStorage에서 매칭된 캐릭터 가져오기
    const matched = localStorage.getItem('matchedCharacters');
    if (matched) {
      try {
        const parsed = JSON.parse(matched);
        setCharacters(parsed);
      } catch {
        router.push('/input');
        return;
      }
    } else {
      router.push('/input');
      return;
    }
    setIsLoading(false);
  }, [router]);

  const handleSelect = (character: Character) => {
    router.push(`/characters/${character.character_id}`);
  };

  const handleBack = () => {
    router.push('/input');
  };

  if (isLoading) {
    return null;
  }

  return (
    <CharacterSelectScreen
      characters={characters}
      onSelect={handleSelect}
      onBack={handleBack}
    />
  );
}
