/**
 * NEXUS COUNTDOWN — Landing Sequence
 * 
 * Orchestrates the cinematic entry animation:
 * Black screen → Logo fade → Background illumination → 
 * AI Core entrance → Title → Subtitle → Countdown.
 * 
 * All timings are carefully choreographed for maximum impact.
 */

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../stores/appStore';
import { nexusConfig } from '../../config/nexus.config';

export function Landing() {
  const [step, setStep] = useState(0);
  const phase = useAppStore((s) => s.phase);
  const setPhase = useAppStore((s) => s.setPhase);
  const setLandingComplete = useAppStore((s) => s.setLandingComplete);
  const prefersReducedMotion = useAppStore((s) => s.prefersReducedMotion);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) {
      /* Skip animation for reduced motion users */
      setStep(6);
      setPhase('counting');
      setLandingComplete(true);
      return;
    }

    /* Choreographed sequence */
    const timings = [
      { delay: 500, step: 1 },    // Logo appears
      { delay: 2000, step: 2 },   // Background illuminates
      { delay: 3000, step: 3 },   // AI Core enters
      { delay: 4500, step: 4 },   // Title appears
      { delay: 5500, step: 5 },   // Subtitle appears
      { delay: 6500, step: 6 },   // Countdown appears
    ];

    timings.forEach(({ delay, step: s }) => {
      const timer = setTimeout(() => {
        setStep(s);
        if (s === 3) setPhase('counting');
        if (s === 6) setLandingComplete(true);
      }, delay);
      timerRef.current.push(timer);
    });

    return () => {
      timerRef.current.forEach(clearTimeout);
    };
  }, [prefersReducedMotion, setPhase, setLandingComplete]);

  /* Hide landing UI during zero/reveal phases */
  if (phase === 'zero') {
    return <div className="landing-blackout" />;
  }

  return (
    <div className="landing" id="landing-section">
      {/* Logo */}
      <motion.div
        className="landing-logo"
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 1 ? 1 : 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <span className="logo-text">◆</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="landing-title"
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: step >= 4 ? 1 : 0,
          y: step >= 4 ? 0 : 40,
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {nexusConfig.meta.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="landing-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: step >= 5 ? 1 : 0,
          y: step >= 5 ? 0 : 20,
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {nexusConfig.meta.subtitle}
      </motion.p>
    </div>
  );
}
