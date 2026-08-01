/**
 * NEXUS COUNTDOWN — Reduced Motion Hook
 * 
 * Detects and respects the user's prefers-reduced-motion setting.
 * All animations throughout the app check this value.
 */

import { useEffect } from 'react';
import { useAppStore } from '../stores/appStore';

export function useReducedMotion(): boolean {
  const prefersReducedMotion = useAppStore((s) => s.prefersReducedMotion);
  const setPrefersReducedMotion = useAppStore((s) => s.setPrefersReducedMotion);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [setPrefersReducedMotion]);

  return prefersReducedMotion;
}
