/**
 * NEXUS COUNTDOWN — Countdown State Store
 * 
 * Manages countdown timer state and phase transitions.
 * Drives the entire experience timeline.
 */

import { create } from 'zustand';
import type { CountdownTime } from '../types';

interface CountdownState {
  /** Current countdown values */
  time: CountdownTime;
  setTime: (time: CountdownTime) => void;

  /** Target date as ISO string */
  targetDate: string;
  setTargetDate: (date: string) => void;

  /** Previous seconds value (for detecting changes) */
  prevSeconds: number;
  setPrevSeconds: (seconds: number) => void;
}

export const useCountdownStore = create<CountdownState>((set) => ({
  time: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    isComplete: false,
  },
  setTime: (time) => set({ time }),

  targetDate: '',
  setTargetDate: (targetDate) => set({ targetDate }),

  prevSeconds: -1,
  setPrevSeconds: (prevSeconds) => set({ prevSeconds }),
}));
