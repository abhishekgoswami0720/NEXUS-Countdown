/**
 * NEXUS COUNTDOWN — Countdown Digit
 * 
 * Individual digit with premium morph animation.
 * Each digit transition uses a mechanical, spring-like effect
 * with overshoot for a premium feel.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { padZero } from '../../utils/math';

interface CountdownDigitProps {
  value: number;
  label: string;
  padLength?: number;
}

const digitVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.8,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.8,
    filter: 'blur(8px)',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

export function CountdownDigit({ value, label, padLength = 2 }: CountdownDigitProps) {
  const displayValue = padZero(value, padLength);

  return (
    <div className="countdown-segment" role="timer" aria-label={`${value} ${label}`}>
      <div className="countdown-digit-container">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={displayValue}
            className="countdown-digit"
            variants={digitVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {displayValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="countdown-label">{label}</span>
    </div>
  );
}
