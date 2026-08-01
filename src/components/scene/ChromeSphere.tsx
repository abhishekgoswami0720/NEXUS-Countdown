/**
 * NEXUS COUNTDOWN — Chrome Sphere
 * 
 * Central liquid chrome sphere — the heart of the AI Core.
 * Uses reflective material with animated distortion for an
 * advanced energy source aesthetic.
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../stores/appStore';

interface ChromeSphereProps {
  intensity?: number;
}

export function ChromeSphere({ intensity = 1 }: ChromeSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<typeof MeshDistortMaterial.prototype>(null!);
  const phase = useAppStore((s) => s.phase);
  const mouse = useAppStore((s) => s.mouse);

  /** Phase-dependent distortion parameters */
  const phaseConfig = useMemo(() => {
    switch (phase) {
      case 'tenseconds': return { distort: 0.5, speed: 3, emissiveIntensity: 0.4 };
      case 'final': return { distort: 0.8, speed: 6, emissiveIntensity: 0.8 };
      case 'zero': return { distort: 0, speed: 0, emissiveIntensity: 0 };
      case 'reveal': return { distort: 0.3, speed: 2, emissiveIntensity: 1.2 };
      case 'postreveal': return { distort: 0.25, speed: 1.5, emissiveIntensity: 0.5 };
      default: return { distort: 0.3, speed: 2, emissiveIntensity: 0.15 };
    }
  }, [phase]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    /* Slow ambient rotation */
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;

    /* Mouse influence — subtle follow */
    meshRef.current.rotation.y += mouse.x * delta * 0.3;
    meshRef.current.rotation.x += mouse.y * delta * 0.2;

    /* Scale pulse during intense phases */
    if (phase === 'tenseconds' || phase === 'final') {
      const pulse = 1 + Math.sin(time * (phase === 'final' ? 8 : 3)) * 0.03;
      meshRef.current.scale.setScalar(pulse * intensity);
    } else if (phase === 'zero') {
      meshRef.current.scale.setScalar(0.01);
    } else {
      meshRef.current.scale.setScalar(intensity);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        ref={materialRef as any}
        color="#b0b0b8"
        envMapIntensity={1.8}
        metalness={0.95}
        roughness={0.05}
        distort={phaseConfig.distort}
        speed={phaseConfig.speed}
        emissive="#4060ff"
        emissiveIntensity={phaseConfig.emissiveIntensity}
      />
    </mesh>
  );
}
