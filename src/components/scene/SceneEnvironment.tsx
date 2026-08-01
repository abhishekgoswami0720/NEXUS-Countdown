/**
 * NEXUS COUNTDOWN — Scene Environment
 * 
 * Lighting, environment map, and atmospheric fog.
 * Creates the dark, cinematic atmosphere.
 */

import { Environment } from '@react-three/drei';
import { useAppStore } from '../../stores/appStore';

export function SceneEnvironment() {
  const phase = useAppStore((s) => s.phase);

  const ambientIntensity = phase === 'zero' ? 0 :
    phase === 'final' ? 0.3 :
      phase === 'reveal' ? 0.6 : 0.15;

  const pointIntensity = phase === 'zero' ? 0 :
    phase === 'final' ? 3 :
      phase === 'reveal' ? 5 : 1.5;

  return (
    <>
      {/* Soft ambient fill */}
      <ambientLight intensity={ambientIntensity} color="#4060a0" />

      {/* Key light — slightly blue, from above-right */}
      <pointLight
        position={[5, 5, 5]}
        intensity={pointIntensity}
        color="#6080ff"
        decay={2}
        distance={20}
      />

      {/* Rim light — from behind-left for edge definition */}
      <pointLight
        position={[-4, 3, -5]}
        intensity={pointIntensity * 0.6}
        color="#8060ff"
        decay={2}
        distance={15}
      />

      {/* Fill light — subtle, from below */}
      <pointLight
        position={[0, -3, 3]}
        intensity={pointIntensity * 0.3}
        color="#304080"
        decay={2}
        distance={10}
      />

      {/* Environment map for reflections */}
      <Environment preset="night" environmentIntensity={0.3} />

      {/* Atmospheric fog */}
      <fog attach="fog" args={['#000005', 8, 30]} />
    </>
  );
}
