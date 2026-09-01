import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HardwareModelProps {
  mousePos?: { x: number; y: number };
  targetRotationX?: number;
  targetRotationY?: number;
  targetRotationZ?: number;
  scale?: number;
  accentColor?: string;
  enableFloating?: boolean;
  onRevealProgress?: (progress: number) => void;
}

export const HardwareModel: React.FC<HardwareModelProps> = ({
  mousePos = { x: 0, y: 0 },
  targetRotationX = 0.1,
  targetRotationY = 0.4,
  targetRotationZ = 0,
  scale = 1.3,
  accentColor = '#E50914',
  enableFloating = true,
  onRevealProgress
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    // 2.2 second smooth reveal timeline
    let startTime: number | null = null;
    let animationFrame: number;

    const animateReveal = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / 2.0, 1);
      setRevealProgress(progress);

      if (onRevealProgress) {
        onRevealProgress(progress);
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateReveal);
      }
    };

    animationFrame = requestAnimationFrame(animateReveal);
    return () => cancelAnimationFrame(animationFrame);
  }, [onRevealProgress]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Reveal Camera Push-in & Off-axis Rotation (0-2s transition)
    // Starts off-axis at rotY = -0.3, z = -1.5, then pushes in to target angle
    const startRotY = -0.35;
    const startZ = -1.6;

    const currentRotY = THREE.MathUtils.lerp(startRotY, targetRotationY, revealProgress);
    const currentZ = THREE.MathUtils.lerp(startZ, 0, revealProgress);

    // Subtle floating inertia (starts after initial reveal)
    const floatY = enableFloating ? Math.sin(time * 1.3) * 0.06 * revealProgress : 0;

    // Smooth lerp mouse parallax response
    const mouseRotX = mousePos.y * 0.25 * revealProgress;
    const mouseRotY = mousePos.x * 0.35 * revealProgress;
    const mouseRotZ = mousePos.x * 0.06 * revealProgress;

    const finalRotX = targetRotationX + mouseRotX;
    const finalRotY = currentRotY + mouseRotY;
    const finalRotZ = targetRotationZ + mouseRotZ;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, finalRotX, 0.07);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, finalRotY, 0.07);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, finalRotZ, 0.07);

    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, floatY, 0.08);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, currentZ, 0.08);
  });

  // Photorealistic PBR Metallic Materials
  const matteBodyMaterial = new THREE.MeshStandardMaterial({
    color: '#060608',
    metalness: 0.85,
    roughness: 0.32,
    envMapIntensity: 1.2
  });

  const blackChromeMaterial = new THREE.MeshStandardMaterial({
    color: '#181a20',
    metalness: 0.98,
    roughness: 0.08,
    envMapIntensity: 2.2
  });

  const smokedGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#040406',
    metalness: 0.15,
    roughness: 0.05,
    transmission: 0.8,
    thickness: 0.4,
    transparent: true,
    opacity: 0.92
  });

  const ledMaterial = new THREE.MeshBasicMaterial({
    color: accentColor
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0, 0]}>
      
      {/* Main Unibody Hardware Chassis */}
      <mesh material={matteBodyMaterial} castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 3.2, 0.6]} />
      </mesh>

      {/* Chamfered Black Chrome Side Rails */}
      <mesh material={blackChromeMaterial} castShadow position={[-0.62, 0, 0]}>
        <boxGeometry args={[0.08, 3.22, 0.64]} />
      </mesh>
      <mesh material={blackChromeMaterial} castShadow position={[0.62, 0, 0]}>
        <boxGeometry args={[0.08, 3.22, 0.64]} />
      </mesh>

      {/* Front Polished Chrome Bevel Plate */}
      <mesh material={blackChromeMaterial} castShadow position={[0, 0.2, 0.31]}>
        <boxGeometry args={[0.9, 2.2, 0.04]} />
      </mesh>

      {/* Tactile Power Ignition Button */}
      <group position={[0, 0.6, 0.34]}>
        <mesh material={blackChromeMaterial}>
          <cylinderGeometry args={[0.22, 0.22, 0.06, 32]} />
        </mesh>
        {/* Glowing Crimson LED Halo Ring */}
        <mesh material={ledMaterial} position={[0, 0, -0.01]}>
          <ringGeometry args={[0.22, 0.26, 32]} />
        </mesh>
      </group>

      {/* Laser-Etched Cooling Fins / Micro Gills */}
      {[-0.2, -0.4, -0.6, -0.8].map((yOffset, idx) => (
        <mesh key={idx} material={blackChromeMaterial} position={[0, yOffset, 0.33]}>
          <boxGeometry args={[0.75, 0.05, 0.02]} />
        </mesh>
      ))}

      {/* Vertical Crimson Telemetry LED Bar */}
      <mesh material={ledMaterial} position={[0, -1.1, 0.33]}>
        <boxGeometry args={[0.08, 0.4, 0.02]} />
      </mesh>

      {/* Smoked Glass Mouthpiece Pod */}
      <mesh material={smokedGlassMaterial} castShadow position={[0, 1.85, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.6, 32]} />
      </mesh>

      {/* Mouthpiece Tip */}
      <mesh material={smokedGlassMaterial} position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.2, 32]} />
      </mesh>

      {/* Metallic Base Contact Ring */}
      <mesh material={blackChromeMaterial} position={[0, -1.65, 0]}>
        <boxGeometry args={[1.22, 0.1, 0.62]} />
      </mesh>

    </group>
  );
};
