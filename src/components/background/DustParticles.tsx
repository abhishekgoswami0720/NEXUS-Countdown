/**
 * NEXUS COUNTDOWN — Dust Particles
 * 
 * Floating ambient dust particles using pure CSS animations.
 * Extremely lightweight — no canvas, no GPU shaders.
 * Creates subtle atmospheric depth.
 */

import { useMemo } from 'react';
import { useAppStore } from '../../stores/appStore';

const DUST_COUNT = 40;

interface DustParticle {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function DustParticles() {
  const prefersReducedMotion = useAppStore((s) => s.prefersReducedMotion);
  const phase = useAppStore((s) => s.phase);

  const particles = useMemo<DustParticle[]>(() => {
    return Array.from({ length: DUST_COUNT }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.2,
    }));
  }, []);

  if (prefersReducedMotion || phase === 'zero') return null;

  return (
    <div className="dust-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="dust-particle"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
