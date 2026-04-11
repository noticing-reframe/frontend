'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/screens/LoadingScreen';
import { matchCharacters } from '@/api/api';

export default function LoadingPage() {
  const router = useRouter();
  const [isMatching, setIsMatching] = useState(true);

  useEffect(() => {
    const concern = localStorage.getItem('userConcern');
    if (!concern) {
      router.push('/input');
      return;
    }

    // Match API 호출
    matchCharacters(concern)
      .then((matched) => {
        localStorage.setItem('matchedCharacters', JSON.stringify(matched));
        setIsMatching(false);
      })
      .catch((error) => {
        console.error('Match failed:', error);
        setIsMatching(false);
      });
  }, [router]);

  const handleComplete = () => {
    router.replace('/characters');
  };

  // 매칭 완료되면 자동으로 넘어감
  useEffect(() => {
    if (!isMatching) {
      const timer = setTimeout(handleComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [isMatching]);

  return <LoadingScreen onComplete={handleComplete} />;
}
