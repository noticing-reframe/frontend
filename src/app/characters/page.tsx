'use client';

import { useRouter } from 'next/navigation';
import CharacterSelectScreen from '@/components/screens/CharacterSelectScreen';
import { mockCharacters } from '@/data/mockCharacters';
import type { Character } from '@/types';

export default function CharactersPage() {
  const router = useRouter();

  const handleSelect = (character: Character) => {
    router.push(`/characters/${character.id}`);
  };

  const handleBack = () => {
    router.push('/input');
  };

  return (
    <CharacterSelectScreen
      characters={mockCharacters}
      onSelect={handleSelect}
      onBack={handleBack}
    />
  );
}
