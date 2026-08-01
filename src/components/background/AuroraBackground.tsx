/**
 * NEXUS COUNTDOWN — Aurora Background
 * 
 * Subtle animated aurora effect using CSS gradients.
 * GPU-optimized — uses transform and opacity only.
 * Almost imperceptible movement for atmospheric depth.
 */

import { useAppStore } from '../../stores/appStore';

export function AuroraBackground() {
  const phase = useAppStore((s) => s.phase);
  const prefersReducedMotion = useAppStore((s) => s.prefersReducedMotion);

  if (phase === 'zero') return null;

  return (
    <div
      className={`aurora-bg ${prefersReducedMotion ? 'aurora-static' : ''}`}
      aria-hidden="true"
    >
      <div className="aurora-layer aurora-layer-1" />
      <div className="aurora-layer aurora-layer-2" />
      <div className="aurora-layer aurora-layer-3" />
    </div>
  );
}
