'use client';

import { useRouter } from 'next/navigation';
import InputScreen from '@/components/screens/InputScreen';

export default function InputPage() {
  const router = useRouter();

  const handleSubmit = (concern: string) => {
    // Store concern in localStorage for later use
    localStorage.setItem('userConcern', concern);
    router.push('/loading-screen');
  };

  return <InputScreen onSubmit={handleSubmit} />;
}
