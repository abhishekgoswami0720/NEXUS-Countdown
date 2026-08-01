/**
 * NEXUS COUNTDOWN — Countdown Display
 * 
 * Assembled countdown with four segments (Days, Hours, Minutes, Seconds).
 * Uses individual CountdownDigit components for morph animations.
 * Includes animated separators that pulse with each second.
 */

import { motion } from 'framer-motion';
import { CountdownDigit } from './CountdownDigit';
import type { CountdownTime } from '../../types';

interface CountdownProps {
  time: CountdownTime;
  visible: boolean;
}

/** Animated separator between digit groups */
function Separator() {
  return (
    <motion.span
      className="countdown-separator"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      :
    </motion.span>
  );
}

export function Countdown({ time, visible }: CountdownProps) {
  return (
    <motion.div
      className="countdown"
      id="countdown-display"
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 40,
      }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      role="timer"
      aria-live="polite"
      aria-label="Countdown timer"
    >
      <CountdownDigit value={time.days} label="DAYS" />
      <Separator />
      <CountdownDigit value={time.hours} label="HOURS" />
      <Separator />
      <CountdownDigit value={time.minutes} label="MINUTES" />
      <Separator />
      <CountdownDigit value={time.seconds} label="SECONDS" />
    </motion.div>
  );
}
