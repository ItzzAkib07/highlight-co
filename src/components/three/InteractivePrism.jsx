import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useCursor } from '../../context/CursorContext';
import { useIsMobile } from '../../hooks/useMediaQuery';

const PrismGeometry = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Octahedron / Cinema Prism */}
      <mesh>
        <octahedronGeometry args={[1.5, 0]} />
        <meshPhysicalMaterial
          color="#F5C400"
          emissive="#2A1B00"
          roughness={0.1}
          metalness={0.8}
          transmission={0.4}
          ior={1.8}
          thickness={1.2}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe accent shell */}
      <mesh scale={1.05}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#FFE042" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

export const InteractivePrism = () => {
  const isMobile = useIsMobile();
  const { setCursor, resetCursor } = useCursor();

  return (
    <div
      className="relative w-full h-[380px] sm:h-[450px] md:h-[500px] rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setCursor('drag', 'DRAG')}
      onMouseLeave={resetCursor}
    >
      <div className="absolute top-6 left-6 z-10 font-mono text-xs text-[#0A1128]">
        <span className="text-[#060B1A] font-black bg-[#F5C400] px-2.5 py-1 rounded-full border border-[#0A1128]/20 shadow-sm">// 3D OPTICAL CORE</span>
        <p className="text-[11px] text-[#0A1128] font-black mt-2">Interactive Anamorphic Prism — Click & Rotate</p>
      </div>

      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#FFFFFF" />
        <pointLight position={[-4, -2, 2]} intensity={3} color="#F5C400" />
        <pointLight position={[4, 2, -2]} intensity={2} color="#FFFFFF" />

        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
          <PrismGeometry />
        </Float>

        {!isMobile && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.8}
            autoRotate={false}
          />
        )}
      </Canvas>
    </div>
  );
};
