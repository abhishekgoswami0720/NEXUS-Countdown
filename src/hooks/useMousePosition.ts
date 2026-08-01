/**
 * NEXUS COUNTDOWN — Mouse Position Hook
 * 
 * Tracks mouse position and provides both raw pixel coordinates
 * and normalized [-1, 1] values for the 3D scene.
 */

import { useEffect, useCallback } from 'react';
import { useAppStore } from '../stores/appStore';

export function useMousePosition() {
  const setMouse = useAppStore((s) => s.setMouse);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMouse({ x, y });
  }, [setMouse]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);
}
