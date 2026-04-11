'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingScreen from '@/components/screens/OnboardingScreen';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    // Step 1: 0.5초 대기 + 2초 배경 전환 = 2.5초
    const step2 = setTimeout(() => setStep(2), 2500);
    // Step 2: 2.5초 + 1.8초
    const step3 = setTimeout(() => setStep(3), 4300);
    // Step 3: 2.5초 + 3.6초
    const step4 = setTimeout(() => setStep(4), 6100);
    // Step 4 후 이동: 2.5초 + 5.4초
    const navigate = setTimeout(() => router.push('/input'), 7900);

    return () => {
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
      clearTimeout(navigate);
    };
  }, [router]);

  return <OnboardingScreen step={step} />;
}
