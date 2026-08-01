/**
 * NEXUS COUNTDOWN — Energy Beams
 * 
 * Volumetric light beams emanating from the AI Core.
 * Created using elongated cone geometries with emissive materials
 * and additive blending for a convincing light effect.
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../stores/appStore';

const BEAM_COUNT = 6;

interface BeamData {
  rotation: THREE.Euler;
  length: number;
  width: number;
  speed: number;
  phase: number;
}

export function EnergyBeams() {
  const groupRef = useRef<THREE.Group>(null!);
  const phase = useAppStore((s) => s.phase);

  const beams = useMemo<BeamData[]>(() => {
    return Array.from({ length: BEAM_COUNT }, (_, i) => {
      const angle = (i / BEAM_COUNT) * Math.PI * 2;
      return {
        rotation: new THREE.Euler(0, angle, Math.PI / 2 + (Math.random() - 0.5) * 0.3),
        length: 3 + Math.random() * 2,
        width: 0.02 + Math.random() * 0.02,
        speed: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {beams.map((beam, i) => (
        <Beam key={i} data={beam} phaseState={phase} />
      ))}
    </group>
  );
}

/* ─── Individual Beam ─────────────────────────────────── */

interface BeamProps {
  data: BeamData;
  phaseState: string;
}

function Beam({ data, phaseState }: BeamProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    /* Pulsing opacity */
    const baseOpacity = phaseState === 'tenseconds' ? 0.25 :
      phaseState === 'final' ? 0.5 :
        phaseState === 'zero' ? 0 :
          phaseState === 'reveal' ? 0.4 : 0.1;

    const pulse = Math.sin(time * data.speed + data.phase) * 0.5 + 0.5;
    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = baseOpacity * pulse;

    /* Scale breathing */
    const scaleY = phaseState === 'zero' ? 0.01 : 1 + Math.sin(time * 0.3 + data.phase) * 0.15;
    meshRef.current.scale.y = scaleY;
  });

  return (
    <mesh ref={meshRef} rotation={data.rotation}>
      <coneGeometry args={[data.width, data.length, 4, 1, true]} />
      <meshBasicMaterial
        color="#4488ff"
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
