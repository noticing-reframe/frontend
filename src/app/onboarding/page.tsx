'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingScreen from '@/components/screens/OnboardingScreen';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    // Step 1: 0.5초 대기 + 2초 배경 전환 + 1초 추가 = 3.5초
    const step2 = setTimeout(() => setStep(2), 3500);
    // Step 2: 타이핑(14자 * 120ms = 1.68초) + 대기(0.6초) + 페이드(0.3초) = 2.6초
    const step3 = setTimeout(() => setStep(3), 6100);
    // Step 3: 타이핑(7자 * 120ms = 0.84초) + 대기(0.6초) + 페이드(0.3초) = 1.8초
    const step4 = setTimeout(() => setStep(4), 7900);
    // Step 4: 타이핑(11자 * 120ms = 1.32초) + 대기(0.6초) + 페이드(0.3초) + 여유(1초) = 3.2초
    const navigate = setTimeout(() => router.push('/input'), 11100);

    return () => {
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
      clearTimeout(navigate);
    };
  }, [router]);

  return <OnboardingScreen step={step} />;
}
