import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { RETAIL_PRODUCTS } from '../../data/products';
import type { RetailProduct } from '../../data/products';

interface ProductPlaneProps {
  product: RetailProduct;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  isFocused?: boolean;
  onSelectProduct?: (product: RetailProduct) => void;
}

const ProductPlane: React.FC<ProductPlaneProps> = ({
  product,
  position,
  rotation,
  scale = 1,
  isFocused = false,
  onSelectProduct
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(product.image, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      if (meshRef.current) {
        meshRef.current.material = new THREE.MeshStandardMaterial({
          map: tex,
          transparent: true,
          roughness: 0.2,
          metalness: 0.8,
          side: THREE.DoubleSide
        });
      }
    });
  }, [product.image]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Subtle floating inertia in 3D space
    const floatY = position[1] + Math.sin(time * 1.2 + position[0]) * 0.08;
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, floatY, 0.08);

    // Hover focus scale lift
    const targetScale = isFocused ? scale * 1.12 : scale;
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        onClick={() => onSelectProduct && onSelectProduct(product)}
        castShadow
      >
        <planeGeometry args={[1.6, 2.4]} />
        <meshStandardMaterial color="#141418" roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );
};

interface ShowroomSceneProps {
  mousePos: { x: number; y: number };
  onSelectProduct?: (product: RetailProduct) => void;
}

const ShowroomScene: React.FC<ShowroomSceneProps> = ({ mousePos, onSelectProduct }) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const cameraGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!cameraGroupRef.current) return;
    // Camera parallax tracking through 3D depth space
    const targetX = mousePos.x * 0.6;
    const targetY = mousePos.y * 0.4;

    cameraGroupRef.current.position.x = THREE.MathUtils.lerp(cameraGroupRef.current.position.x, targetX, 0.05);
    cameraGroupRef.current.position.y = THREE.MathUtils.lerp(cameraGroupRef.current.position.y, targetY, 0.05);
  });

  // Display 3 real products arranged in 3D depth space
  const showcaseProducts = RETAIL_PRODUCTS.slice(0, 3);

  return (
    <group ref={cameraGroupRef}>
      {/* Dark Ambient & Studio Lighting */}
      <ambientLight intensity={0.35} />
      
      {/* Main Cool Key Light */}
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.8}
        color="#ffffff"
        castShadow
      />

      {/* Crimson Rim Spotlight Sweeping 3D Retail Showroom */}
      <spotLight
        position={[-4, 4, -2]}
        angle={0.6}
        penumbra={0.8}
        intensity={4.5}
        color="#E50914"
      />

      {/* 3D Depth Layer 1: Foreground Main Product (OXVA Xlim Pro 2) */}
      <ProductPlane
        product={showcaseProducts[0]}
        position={[0.8, 0, 0.5]}
        rotation={[0.05, -0.2, 0]}
        scale={1.25}
        isFocused={focusedIndex === 0}
        onSelectProduct={(p) => {
          setFocusedIndex(0);
          if (onSelectProduct) onSelectProduct(p);
        }}
      />

      {/* 3D Depth Layer 2: Midground Product (Vaporesso XROS 4) */}
      <ProductPlane
        product={showcaseProducts[1]}
        position={[-1.2, -0.2, -0.6]}
        rotation={[0.05, 0.25, 0]}
        scale={1.05}
        isFocused={focusedIndex === 1}
        onSelectProduct={(p) => {
          setFocusedIndex(1);
          if (onSelectProduct) onSelectProduct(p);
        }}
      />

      {/* 3D Depth Layer 3: Background Flagship Mod (Geekvape Aegis) */}
      <ProductPlane
        product={showcaseProducts[2]}
        position={[2.2, 0.4, -1.4]}
        rotation={[-0.05, -0.4, 0]}
        scale={0.9}
        isFocused={focusedIndex === 2}
        onSelectProduct={(p) => {
          setFocusedIndex(2);
          if (onSelectProduct) onSelectProduct(p);
        }}
      />

      {/* Soft Contact Floor Shadow */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.7}
        scale={9}
        blur={2.5}
        far={4}
        color="#000000"
      />
    </group>
  );
};

interface DigitalShowroom3DProps {
  onSelectProduct?: (product: RetailProduct) => void;
  className?: string;
}

export const DigitalShowroom3D: React.FC<DigitalShowroom3DProps> = ({
  onSelectProduct,
  className = ""
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[460px] sm:min-h-[580px] ${className}`}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ShowroomScene mousePos={mousePos} onSelectProduct={onSelectProduct} />
      </Canvas>

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-[#030303]/70 pointer-events-none" />
    </div>
  );
};
