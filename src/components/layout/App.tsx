/**
 * NEXUS COUNTDOWN — Root Application
 * 
 * Orchestrates the entire experience: 3D scene, landing sequence,
 * countdown, reveal, and all supporting features.
 */

import { useEffect } from 'react';
import { SceneCanvas } from '../scene/SceneCanvas';
import { Cursor } from '../ui/Cursor';
import { Landing } from '../ui/Landing';
import { Countdown } from '../ui/Countdown';
import { Reveal } from '../ui/Reveal';
import { ClueSystem } from '../ui/ClueSystem';
import { Timeline } from '../ui/Timeline';
import { CommandPalette } from '../ui/CommandPalette';
import { Footer } from '../ui/Footer';
import { AuroraBackground } from '../background/AuroraBackground';
import { DustParticles } from '../background/DustParticles';
import { useCountdown } from '../../hooks/useCountdown';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useAppStore } from '../../stores/appStore';
import { nexusConfig } from '../../config/nexus.config';
import { applyTheme } from '../../theme/themes';

export function App() {
  const phase = useAppStore((s) => s.phase);
  const landingComplete = useAppStore((s) => s.landingComplete);
  const countdownTime = useCountdown(nexusConfig.countdown.targetDate);

  /* Initialize hooks */
  useMousePosition();
  useReducedMotion();

  /* Apply theme on mount */
  useEffect(() => {
    applyTheme(nexusConfig.theme.active);
  }, []);

  /* Add phase class to body for global CSS hooks */
  useEffect(() => {
    document.body.setAttribute('data-phase', phase);
  }, [phase]);

  const showCountdown = landingComplete && phase !== 'zero' && phase !== 'reveal' && phase !== 'postreveal';
  const showSections = landingComplete && (phase === 'counting' || phase === 'postreveal');

  return (
    <>
      {/* Custom cursor */}
      <Cursor />

      {/* Background effects */}
      <AuroraBackground />
      <DustParticles />

      {/* 3D Scene — always present behind everything */}
      <SceneCanvas />

      {/* UI Layer */}
      <div className="ui-layer" id="ui-layer">
        {/* Landing sequence */}
        <Landing />

        {/* Countdown timer */}
        {showCountdown && (
          <Countdown time={countdownTime} visible={showCountdown} />
        )}

        {/* Reveal experience */}
        <Reveal />

        {/* Supporting sections — visible during normal countdown & post-reveal */}
        {showSections && (
          <div className="sections-container">
            <ClueSystem />
            <Timeline />
          </div>
        )}

        {/* Footer */}
        {landingComplete && <Footer />}
      </div>

      {/* Command Palette (overlay) */}
      <CommandPalette />
    </>
  );
}
