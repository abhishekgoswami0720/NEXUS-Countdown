/**
 * NEXUS COUNTDOWN — Glass Fragments
 * 
 * Orbiting transparent glass shards around the AI Core.
 * Uses instanced mesh for performance — renders many fragments
 * in a single draw call.
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../stores/appStore';
import { randomFloat } from '../../utils/math';

const FRAGMENT_COUNT = 18;
const dummy = new THREE.Object3D();

interface FragmentData {
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  tilt: number;
  scale: number;
  yOffset: number;
}

export function GlassFragments() {
  const instancedRef = useRef<THREE.InstancedMesh>(null!);
  const phase = useAppStore((s) => s.phase);

  /** Pre-compute fragment orbital parameters */
  const fragments = useMemo<FragmentData[]>(() => {
    return Array.from({ length: FRAGMENT_COUNT }, (_, i) => ({
      orbitRadius: randomFloat(2.2, 3.5),
      orbitSpeed: randomFloat(0.1, 0.3) * (i % 2 === 0 ? 1 : -1),
      orbitOffset: (i / FRAGMENT_COUNT) * Math.PI * 2,
      tilt: randomFloat(-0.5, 0.5),
      scale: randomFloat(0.04, 0.12),
      yOffset: randomFloat(-0.8, 0.8),
    }));
  }, []);

  /** Custom glass-like geometry (flat shard) */
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0, 0, 0,
      1, 0.3, 0,
      0.5, 1, 0,
      0, 0, 0.05,
      1, 0.3, 0.05,
      0.5, 1, 0.05,
    ]);
    const indices = [0, 1, 2, 3, 5, 4, 0, 3, 4, 0, 4, 1, 1, 4, 5, 1, 5, 2, 2, 5, 3, 2, 3, 0];
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (!instancedRef.current) return;

    const time = state.clock.elapsedTime;

    fragments.forEach((frag, i) => {
      let speedMul = 1;
      let radiusMul = 1;

      if (phase === 'tenseconds') {
        speedMul = 2;
        radiusMul = 0.85;
      } else if (phase === 'final') {
        speedMul = 4;
        radiusMul = 0.6;
      } else if (phase === 'zero') {
        radiusMul = 0;
      } else if (phase === 'reveal') {
        /* Fragments float upward during reveal */
        const revealTime = time % 8;
        dummy.position.set(
          Math.sin(frag.orbitOffset + time * 0.2) * frag.orbitRadius * 0.5,
          frag.yOffset + revealTime * 1.5,
          Math.cos(frag.orbitOffset + time * 0.2) * frag.orbitRadius * 0.5,
        );
        dummy.scale.setScalar(frag.scale * (revealTime < 4 ? revealTime / 4 : 1));
        dummy.rotation.set(time * 0.5, time * 0.3, time * 0.2);
        dummy.updateMatrix();
        instancedRef.current.setMatrixAt(i, dummy.matrix);
        return;
      }

      const angle = frag.orbitOffset + time * frag.orbitSpeed * speedMul;
      const radius = frag.orbitRadius * radiusMul;

      dummy.position.set(
        Math.sin(angle) * radius,
        frag.yOffset + Math.sin(time * 0.5 + i) * 0.2,
        Math.cos(angle) * radius,
      );
      dummy.rotation.set(
        time * 0.3 + i,
        time * 0.2 + i * 0.5,
        frag.tilt,
      );
      dummy.scale.setScalar(phase === 'zero' ? 0.001 : frag.scale);
      dummy.updateMatrix();
      instancedRef.current.setMatrixAt(i, dummy.matrix);
    });

    instancedRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={instancedRef}
      args={[geometry, undefined, FRAGMENT_COUNT]}
    >
      <meshPhysicalMaterial
        color="#e0e8ff"
        metalness={0.1}
        roughness={0.05}
        transmission={0.8}
        thickness={0.5}
        transparent
        opacity={0.6}
        envMapIntensity={1.5}
        ior={1.5}
      />
    </instancedMesh>
  );
}
