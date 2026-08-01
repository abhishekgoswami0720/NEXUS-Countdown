/**
 * NEXUS COUNTDOWN — The Reveal
 * 
 * The unforgettable moment after the countdown reaches zero.
 * Sequence: blackout → light beam → fragments → logo → title → CTAs.
 * 
 * This should feel like the opening of a new chapter.
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../stores/appStore';
import { nexusConfig } from '../../config/nexus.config';

export function Reveal() {
  const phase = useAppStore((s) => s.phase);
  const setPhase = useAppStore((s) => s.setPhase);
  const [revealStep, setRevealStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (phase !== 'reveal') return;

    const timings = [
      { delay: 0, step: 1 },       // Light beam appears
      { delay: 1500, step: 2 },    // Fragments float up
      { delay: 3000, step: 3 },    // AI Core rebuilds
      { delay: 4500, step: 4 },    // Title appears
      { delay: 6000, step: 5 },    // Subtitle + CTA
      { delay: 8000, step: 6 },    // Transition to post-reveal
    ];

    timings.forEach(({ delay, step }) => {
      const timer = setTimeout(() => {
        setRevealStep(step);
        if (step === 6) setPhase('postreveal');
      }, delay);
      timerRef.current.push(timer);
    });

    return () => {
      timerRef.current.forEach(clearTimeout);
    };
  }, [phase, setPhase]);

  if (phase !== 'reveal' && phase !== 'postreveal') return null;

  return (
    <AnimatePresence>
      <div className="reveal" id="reveal-section">
        {/* Light beam from center */}
        {revealStep >= 1 && (
          <motion.div
            className="reveal-beam"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        {/* Floating glass particles */}
        {revealStep >= 2 && (
          <div className="reveal-particles" aria-hidden>
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={i}
                className="reveal-particle"
                initial={{
                  opacity: 0,
                  y: 100,
                  x: (Math.random() - 0.5) * 200,
                }}
                animate={{
                  opacity: [0, 1, 0.5],
                  y: -200 - Math.random() * 300,
                  x: (Math.random() - 0.5) * 400,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 1,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}

        {/* Reveal title */}
        {revealStep >= 4 && (
          <motion.div
            className="reveal-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <motion.h1
              className="reveal-title"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {nexusConfig.countdown.revealTitle}
            </motion.h1>

            {revealStep >= 5 && (
              <>
                <motion.p
                  className="reveal-subtitle"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {nexusConfig.countdown.revealSubtitle}
                </motion.p>

                <motion.div
                  className="reveal-ctas"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {nexusConfig.cta.map((cta) => (
                    <a
                      key={cta.text}
                      href={cta.url}
                      className={`nexus-btn nexus-btn-${cta.variant}`}
                    >
                      {cta.text}
                    </a>
                  ))}
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
