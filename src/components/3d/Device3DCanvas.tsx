import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { StudioLighting } from './StudioLighting';
import { HardwareModel } from './HardwareModel';

interface Device3DCanvasProps {
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  scale?: number;
  accentColor?: string;
  className?: string;
  fallbackImage?: string;
}

export const Device3DCanvas: React.FC<Device3DCanvasProps> = ({
  rotationX = 0.1,
  rotationY = 0.4,
  rotationZ = 0,
  scale = 1.3,
  accentColor = '#E50914',
  className = "",
  fallbackImage = "/images/urban_x1.png"
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [revealProgress, setRevealProgress] = useState(0);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // WebGL support test
    try {
      const canvas = document.createElement('canvas');
      const hasWebGL = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setWebglSupported(hasWebGL);
    } catch {
      setWebglSupported(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!webglSupported) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <img
          src={fallbackImage}
          alt="URBAN VAPES Hardware Render"
          className="w-auto h-[380px] sm:h-[480px] object-contain filter drop-shadow-[0_30px_50px_rgba(229,9,20,0.4)] animate-float"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[440px] sm:min-h-[580px] ${className}`}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 6.0], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        {/* Dynamic Studio Lighting (Key light fades up, Rim light outlines silhouette) */}
        <StudioLighting
          mousePos={mousePos}
          revealProgress={revealProgress}
          rimAccentColor={accentColor}
        />

        {/* 3D Hardware PBR Model with 3-Second Reveal Sequence */}
        <HardwareModel
          mousePos={mousePos}
          targetRotationX={rotationX}
          targetRotationY={rotationY}
          targetRotationZ={rotationZ}
          scale={scale}
          accentColor={accentColor}
          enableFloating={true}
          onRevealProgress={(progress) => setRevealProgress(progress)}
        />

        {/* Soft Reflective Floor Contact Shadow */}
        <ContactShadows
          position={[0, -2.15, 0]}
          opacity={0.8}
          scale={7}
          blur={2.4}
          far={4}
          color="#000000"
        />
      </Canvas>

      {/* Dark Vignette Frame */}
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-[#030303]/70 pointer-events-none" />
    </div>
  );
};
