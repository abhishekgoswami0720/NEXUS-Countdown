/**
 * NEXUS COUNTDOWN — AI Core
 * 
 * The hero 3D object — composed of all sub-components.
 * This is the central visual element of the entire experience:
 * a chrome sphere surrounded by floating rings, glass fragments,
 * energy beams, and ambient particles.
 */

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ChromeSphere } from './ChromeSphere';
import { FloatingRings } from './FloatingRings';
import { GlassFragments } from './GlassFragments';
import { EnergyBeams } from './EnergyBeams';
import { Particles } from './Particles';
import { useAppStore } from '../../stores/appStore';

export function AICore() {
  const groupRef = useRef<THREE.Group>(null!);
  const mouse = useAppStore((s) => s.mouse);
  const phase = useAppStore((s) => s.phase);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    /* Subtle mouse-follow with spring damping */
    const targetRotationY = mouse.x * 0.15;
    const targetRotationX = mouse.y * 0.1;

    groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * delta * 2;
    groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * delta * 2;

    /* Phase-based visibility */
    if (phase === 'zero') {
      groupRef.current.scale.setScalar(
        Math.max(0.01, groupRef.current.scale.x - delta * 3)
      );
    } else if (phase === 'reveal') {
      groupRef.current.scale.setScalar(
        Math.min(1, groupRef.current.scale.x + delta * 0.5)
      );
    } else if (phase === 'loading') {
      groupRef.current.scale.setScalar(0);
    } else {
      const target = 1;
      groupRef.current.scale.setScalar(
        groupRef.current.scale.x + (target - groupRef.current.scale.x) * delta * 2
      );
    }
  });

  return (
    <group ref={groupRef} scale={0}>
      {/* Central reflective sphere */}
      <ChromeSphere />

      {/* Orbiting metallic rings */}
      <FloatingRings />

      {/* Glass shard fragments */}
      <GlassFragments />

      {/* Energy beams from core */}
      <EnergyBeams />

      {/* Ambient particles */}
      <Particles />
    </group>
  );
}
