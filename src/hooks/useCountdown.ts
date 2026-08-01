/**
 * NEXUS COUNTDOWN — Countdown Hook
 * 
 * Core countdown logic with phase detection.
 * Calculates time remaining and determines which experience phase
 * should be active based on seconds remaining.
 */

import { useEffect, useCallback, useRef } from 'react';
import { useCountdownStore } from '../stores/countdownStore';
import { useAppStore } from '../stores/appStore';
import type { CountdownTime, ExperiencePhase } from '../types';

/** Calculate time remaining until target date */
function calculateTimeRemaining(targetDate: string): CountdownTime {
  const now = Date.now();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isComplete: true,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalSeconds, isComplete: false };
}

/** Determine experience phase from total seconds remaining */
function getPhaseFromSeconds(totalSeconds: number, isComplete: boolean): ExperiencePhase | null {
  if (isComplete) return 'zero';
  if (totalSeconds <= 3) return 'final';
  if (totalSeconds <= 10) return 'tenseconds';
  return null; // Don't override other phases
}

export function useCountdown(targetDate: string) {
  const { setTime, setPrevSeconds, time, prevSeconds } = useCountdownStore();
  const { phase, setPhase, landingComplete } = useAppStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasTriggeredZero = useRef(false);
  const hasTriggeredReveal = useRef(false);

  const tick = useCallback(() => {
    const newTime = calculateTimeRemaining(targetDate);
    setTime(newTime);

    /* Detect second changes for digit morph animations */
    if (newTime.seconds !== prevSeconds) {
      setPrevSeconds(newTime.seconds);
    }

    /* Phase transitions based on countdown */
    if (!landingComplete) return;

    const newPhase = getPhaseFromSeconds(newTime.totalSeconds, newTime.isComplete);

    if (newTime.isComplete && !hasTriggeredZero.current) {
      hasTriggeredZero.current = true;
      setPhase('zero');

      /* After 1.5 second blackout, trigger reveal */
      setTimeout(() => {
        if (!hasTriggeredReveal.current) {
          hasTriggeredReveal.current = true;
          setPhase('reveal');
        }
      }, 1500);
    } else if (newPhase && !newTime.isComplete && phase !== newPhase) {
      setPhase(newPhase);
    }
  }, [targetDate, prevSeconds, landingComplete, phase, setTime, setPrevSeconds, setPhase]);

  useEffect(() => {
    /* Initial calculation */
    tick();

    /* Update every 100ms for smooth second transitions */
    intervalRef.current = setInterval(tick, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tick]);

  return time;
}
