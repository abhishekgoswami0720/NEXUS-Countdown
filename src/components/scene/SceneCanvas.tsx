/**
 * NEXUS COUNTDOWN — Scene Canvas
 * 
 * React Three Fiber Canvas wrapper.
 * Manages rendering settings, adaptive quality, camera, and suspense.
 */

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { AICore } from './AICore';
import { SceneEnvironment } from './SceneEnvironment';
import { PostProcessing } from './PostProcessing';

export function SceneCanvas() {
  return (
    <div
      id="scene-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneEnvironment />
          <AICore />
          <PostProcessing />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
