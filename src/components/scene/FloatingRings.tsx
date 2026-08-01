/**
 * NEXUS COUNTDOWN — Floating Rings
 * 
 * Concentric metallic torus rings orbiting the AI Core.
 * Each ring rotates on different axes at different speeds,
 * creating a complex, elegant orbital pattern.
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../stores/appStore';
import { nexusConfig } from '../../config/nexus.config';

interface RingData {
  radius: number;
  tubeRadius: number;
  rotationSpeed: THREE.Vector3;
  initialRotation: THREE.Euler;
  color: string;
  opacity: number;
}

export function FloatingRings() {
  const groupRef = useRef<THREE.Group>(null!);
  const phase = useAppStore((s) => s.phase);
  const mouse = useAppStore((s) => s.mouse);

  const ringCount = nexusConfig.scene.ringCount;

  /** Generate ring configurations */
  const rings = useMemo<RingData[]>(() => {
    return Array.from({ length: ringCount }, (_, i) => {
      const t = i / ringCount;
      return {
        radius: 1.6 + i * 0.5,
        tubeRadius: 0.008 + i * 0.003,
        rotationSpeed: new THREE.Vector3(
          0.2 + t * 0.3,
          0.3 - t * 0.1,
          0.1 + t * 0.15,
        ),
        initialRotation: new THREE.Euler(
          t * Math.PI * 0.5,
          t * Math.PI * 0.3,
          t * Math.PI * 0.7,
        ),
        color: i % 2 === 0 ? '#8090a0' : '#a0b0c0',
        opacity: 0.6 - t * 0.15,
      };
    });
  }, [ringCount]);

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <Ring key={i} data={ring} index={i} phase={phase} mouse={mouse} />
      ))}
    </group>
  );
}

/* ─── Individual Ring ─────────────────────────────────── */

interface RingProps {
  data: RingData;
  index: number;
  phase: string;
  mouse: { x: number; y: number };
}

function Ring({ data, index, phase, mouse }: RingProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const speedMultiplier = phase === 'tenseconds' ? 2 : phase === 'final' ? 4 : 1;

    /* Orbital rotation */
    meshRef.current.rotation.x = data.initialRotation.x + time * data.rotationSpeed.x * speedMultiplier;
    meshRef.current.rotation.y = data.initialRotation.y + time * data.rotationSpeed.y * speedMultiplier;
    meshRef.current.rotation.z = data.initialRotation.z + time * data.rotationSpeed.z * speedMultiplier;

    /* Mouse influence */
    meshRef.current.rotation.y += mouse.x * delta * 0.5;
    meshRef.current.rotation.x += mouse.y * delta * 0.3;

    /* Phase: zero — collapse rings */
    if (phase === 'zero') {
      meshRef.current.scale.setScalar(0.01);
    } else if (phase === 'reveal') {
      const revealProgress = Math.min(1, (time % 5) / 3);
      meshRef.current.scale.setScalar(revealProgress);
    } else {
      /* Breathing scale */
      const breath = 1 + Math.sin(time * 0.5 + index * 0.8) * 0.02;
      meshRef.current.scale.setScalar(breath);
    }
  });

  return (
    <mesh ref={meshRef} rotation={data.initialRotation}>
      <torusGeometry args={[data.radius, data.tubeRadius, 16, 100]} />
      <meshStandardMaterial
        color={data.color}
        metalness={0.9}
        roughness={0.15}
        transparent
        opacity={data.opacity}
        emissive={data.color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}
