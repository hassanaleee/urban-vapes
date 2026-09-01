import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StudioLightingProps {
  mousePos?: { x: number; y: number };
  revealProgress?: number;
  rimAccentColor?: string;
}

export const StudioLighting: React.FC<StudioLightingProps> = ({
  mousePos = { x: 0, y: 0 },
  revealProgress = 1,
  rimAccentColor = '#E50914'
}) => {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.SpotLight>(null);

  useFrame(() => {
    if (keyLightRef.current) {
      // Key light intensity fades up during the 1-2 second reveal phase
      const keyIntensity = Math.max(0.2, revealProgress * 1.8);
      keyLightRef.current.intensity = THREE.MathUtils.lerp(keyLightRef.current.intensity, keyIntensity, 0.1);

      // Dynamic cursor tracking for key light
      keyLightRef.current.position.x = THREE.MathUtils.lerp(keyLightRef.current.position.x, mousePos.x * 3.5 + 3, 0.05);
      keyLightRef.current.position.y = THREE.MathUtils.lerp(keyLightRef.current.position.y, mousePos.y * 3.5 + 4, 0.05);
    }

    if (rimLightRef.current) {
      // Crimson rim light is active from 0s to highlight the silhouette outline
      const rimIntensity = 3.5 + revealProgress * 2.0;
      rimLightRef.current.intensity = THREE.MathUtils.lerp(rimLightRef.current.intensity, rimIntensity, 0.1);
    }
  });

  return (
    <>
      {/* Dark Ambient Shadow Base */}
      <ambientLight intensity={0.25} />

      {/* Main Cool White Key Light (fades up on reveal) */}
      <directionalLight
        ref={keyLightRef}
        position={[3, 4, 4]}
        intensity={0.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Cool Gunmetal Fill Light */}
      <directionalLight
        position={[-4, -2, -2]}
        intensity={0.4}
        color="#64748b"
      />

      {/* Dramatic Crimson Rim Light from Rear-Right Edge */}
      <spotLight
        ref={rimLightRef}
        position={[-3.5, 4.5, -3.5]}
        angle={0.5}
        penumbra={0.7}
        intensity={4.5}
        color={rimAccentColor}
      />

      {/* Secondary Bottom Crimson Telemetry Light */}
      <pointLight
        position={[0, -2, 1]}
        intensity={1.0}
        color={rimAccentColor}
        distance={5}
      />
    </>
  );
};
