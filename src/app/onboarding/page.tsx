'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingScreen from '@/components/screens/OnboardingScreen';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      router.push('/input');
    }
  };

  return <OnboardingScreen step={step} onNext={handleNext} />;
}
