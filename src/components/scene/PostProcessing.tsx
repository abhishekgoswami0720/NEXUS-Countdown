/**
 * NEXUS COUNTDOWN — Post Processing
 * 
 * Cinematic post-processing effects: bloom, vignette, noise.
 * Performance-aware — adapts quality based on FPS.
 */

import { Bloom, Vignette, EffectComposer, Noise } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import { useAppStore } from '../../stores/appStore';
import { nexusConfig } from '../../config/nexus.config';

export function PostProcessing() {
  const phase = useAppStore((s) => s.phase);
  const quality = useAppStore((s) => s.adaptiveQuality);

  if (!nexusConfig.scene.enablePostProcessing || quality < 0.3) return null;

  const bloomIntensity = phase === 'final' ? 3 :
    phase === 'tenseconds' ? 2 :
      phase === 'reveal' ? 4 :
        phase === 'zero' ? 0 : nexusConfig.scene.bloomIntensity;

  return (
    <EffectComposer multisampling={0}>
      {/* Selective bloom — only bright objects glow */}
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        kernelSize={quality > 0.7 ? KernelSize.LARGE : KernelSize.MEDIUM}
        mipmapBlur
      />

      {/* Vignette — darkened edges for cinematic framing */}
      <Vignette
        eskil={false}
        offset={0.15}
        darkness={phase === 'tenseconds' ? 0.8 : phase === 'final' ? 1.0 : 0.5}
        blendFunction={BlendFunction.NORMAL}
      />

      {/* Film grain — almost imperceptible texture */}
      <Noise
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={0.015}
      />
    </EffectComposer>
  );
}
