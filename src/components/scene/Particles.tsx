/**
 * NEXUS COUNTDOWN — Ambient Particles
 * 
 * Floating light particles surrounding the AI Core.
 * Uses Points geometry for maximum performance — all particles
 * rendered in a single draw call.
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../stores/appStore';
import { nexusConfig } from '../../config/nexus.config';
import { randomFloat } from '../../utils/math';

export function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const phase = useAppStore((s) => s.phase);
  const quality = useAppStore((s) => s.adaptiveQuality);

  const count = Math.floor(nexusConfig.scene.particleCount * quality);

  /** Generate initial particle positions and velocities */
  const { positions, velocities, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      /* Distribute in a sphere shell */
      const radius = randomFloat(3, 8);
      const theta = randomFloat(0, Math.PI * 2);
      const phi = randomFloat(0, Math.PI);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      velocities[i3] = randomFloat(-0.002, 0.002);
      velocities[i3 + 1] = randomFloat(-0.002, 0.002);
      velocities[i3 + 2] = randomFloat(-0.002, 0.002);

      sizes[i] = randomFloat(0.5, 2);
    }

    return { positions, velocities, sizes };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    /* Speed multiplier based on phase */
    const speedMul = phase === 'tenseconds' ? 3 :
      phase === 'final' ? 8 :
        phase === 'zero' ? 0 :
          phase === 'reveal' ? 2 : 1;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      if (phase === 'tenseconds' || phase === 'final') {
        /* Spiral inward toward center */
        const dx = -posArray[i3] * 0.002 * speedMul;
        const dy = -posArray[i3 + 1] * 0.002 * speedMul;
        const dz = -posArray[i3 + 2] * 0.002 * speedMul;
        posArray[i3] += dx;
        posArray[i3 + 1] += dy;
        posArray[i3 + 2] += dz;

        /* Add orbital motion */
        const angle = time * 0.5 * speedMul;
        posArray[i3] += Math.sin(angle + i) * 0.01;
        posArray[i3 + 2] += Math.cos(angle + i) * 0.01;
      } else if (phase === 'reveal') {
        /* Expand outward during reveal */
        posArray[i3] += posArray[i3] * 0.001;
        posArray[i3 + 1] += 0.01;
        posArray[i3 + 2] += posArray[i3 + 2] * 0.001;
      } else {
        /* Normal drift */
        posArray[i3] += velocities[i3] * speedMul;
        posArray[i3 + 1] += velocities[i3 + 1] * speedMul;
        posArray[i3 + 2] += velocities[i3 + 2] * speedMul;

        /* Gentle breathing */
        posArray[i3 + 1] += Math.sin(time * 0.2 + i * 0.1) * 0.001;
      }

      /* Reset particles that drift too far */
      const dist = Math.sqrt(posArray[i3] ** 2 + posArray[i3 + 1] ** 2 + posArray[i3 + 2] ** 2);
      if (dist > 12 || dist < 0.5) {
        const radius = randomFloat(3, 8);
        const theta = randomFloat(0, Math.PI * 2);
        const phi = randomFloat(0, Math.PI);
        posArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i3 + 2] = radius * Math.cos(phi);
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    /* Slow global rotation */
    pointsRef.current.rotation.y += 0.0003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#6090ff"
        transparent
        opacity={phase === 'zero' ? 0 : 0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
