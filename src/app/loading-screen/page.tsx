'use client';

import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/screens/LoadingScreen';

export default function LoadingPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/characters');
  };

  return <LoadingScreen onComplete={handleComplete} />;
}
