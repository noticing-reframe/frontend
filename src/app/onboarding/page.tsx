'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingScreen from '@/components/screens/OnboardingScreen';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    // Step 1: 0.5초 대기 + 2초 배경 전환 + 3초 추가 = 5.5초
    const step2 = setTimeout(() => setStep(2), 5500);
    // Step 2: 타이핑(14자 * 120ms = 1.68초) + 대기(0.5초) + 페이드(0.3초) = 2.5초
    const step3 = setTimeout(() => setStep(3), 8000);
    // Step 3: 타이핑(7자 * 120ms = 0.84초) + 대기(0.5초) + 페이드(0.3초) = 1.7초
    const step4 = setTimeout(() => setStep(4), 9700);
    // Step 4: 타이핑(11자 * 120ms = 1.32초) + 대기(0.5초) + 페이드(0.3초) + 여유(1초) = 3.1초
    const navigate = setTimeout(() => router.push('/input'), 12800);

    return () => {
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
      clearTimeout(navigate);
    };
  }, [router]);

  return <OnboardingScreen step={step} />;
}
