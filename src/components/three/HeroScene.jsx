import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../../hooks/useMediaQuery';

// High-End Professional Cinema Film Camera Rig (ARRI ALEXA 35 / Panavision Millennium Style)
const CinemaFilmCamera = () => {
  const rigRef = useRef();
  const focusGearRef = useRef();
  const followFocusGearRef = useRef();
  const tallyLedRef = useRef();
  const irisBladesRef = useRef();

  useFrame((state, delta) => {
    // 1. Continuous Interactive Focus Pull Gear Rotation
    if (focusGearRef.current) {
      focusGearRef.current.rotation.z += delta * 0.5;
    }
    if (followFocusGearRef.current) {
      followFocusGearRef.current.rotation.z -= delta * 0.8;
    }

    // 2. Aperture iris subtle breathing
    if (irisBladesRef.current) {
      irisBladesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }

    // 3. Studio Recording Tally Light Pulsing
    if (tallyLedRef.current) {
      const pulse = (Math.sin(state.clock.elapsedTime * 4.5) + 1) * 0.5;
      tallyLedRef.current.material.emissiveIntensity = 0.8 + pulse * 2.2;
    }
  });

  return (
    <group ref={rigRef} position={[0, -0.08, 0]} scale={0.76}>
      {/* ========================================================= */}
      {/* 1. CAMERA MAIN CHASSIS (Matte Obsidian Titanium Body)     */}
      {/* ========================================================= */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[1.3, 1.2, 1.45]} />
        <meshStandardMaterial
          color="#0C0F16"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Body Top Bevel Plate */}
      <mesh position={[0, 0.61, -0.1]}>
        <boxGeometry args={[1.15, 0.04, 1.35]} />
        <meshStandardMaterial color="#161C26" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Side Operator Status LCD Display (Right Side) */}
      <group position={[0.66, 0.05, 0.05]}>
        <mesh>
          <planeGeometry args={[0.62, 0.42]} />
          <meshBasicMaterial color="#05070B" />
        </mesh>
        <mesh position={[0, 0, 0.002]}>
          <planeGeometry args={[0.56, 0.36]} />
          <meshBasicMaterial color="#0A182A" />
        </mesh>
        {/* Illuminated Status UI Elements */}
        <mesh position={[-0.08, 0.08, 0.003]}>
          <planeGeometry args={[0.32, 0.04]} />
          <meshBasicMaterial color="#F5C400" />
        </mesh>
        <mesh position={[-0.08, 0, 0.003]}>
          <planeGeometry args={[0.26, 0.03]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>
        <mesh position={[-0.08, -0.08, 0.003]}>
          <planeGeometry args={[0.3, 0.03]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* ARRI Rosette Mounts & Knobs on Side */}
      <mesh position={[0.66, -0.28, -0.25]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 24]} />
        <meshStandardMaterial color="#F5C400" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[0.66, -0.28, 0.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.05, 24]} />
        <meshStandardMaterial color="#232B3A" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[-0.66, -0.28, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 24]} />
        <meshStandardMaterial color="#F5C400" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Front Studio Recording Tally LED (Bright Pulsing Red) */}
      <mesh ref={tallyLedRef} position={[-0.42, 0.42, 0.64]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color="#FF0022"
          emissive="#FF0000"
          emissiveIntensity={1.8}
          roughness={0.1}
        />
      </mesh>

      {/* ========================================================= */}
      {/* 2. PL LENS MOUNT FLANGE & LOCKING COLLAR                 */}
      {/* ========================================================= */}
      <group position={[0, 0, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Steel PL Mount Base */}
        <mesh>
          <cylinderGeometry args={[0.54, 0.58, 0.15, 32]} />
          <meshStandardMaterial color="#1B2230" metalness={0.92} roughness={0.2} />
        </mesh>
        {/* Golden PL Locking Ring with Grips */}
        <mesh position={[0, 0.06, 0]}>
          <torusGeometry args={[0.55, 0.03, 16, 32]} />
          <meshStandardMaterial
            color="#F5C400"
            metalness={0.95}
            roughness={0.15}
            emissive="#F5C400"
            emissiveIntensity={0.35}
          />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 3. PRO MASTER ANAMORPHIC CINEMA LENS (Front Assembly)    */}
      {/* ========================================================= */}
      <group position={[0, 0, 0.75]}>
        {/* Heavy Carbon/Titanium Lens Main Barrel */}
        <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.48, 0.52, 0.5, 32]} />
          <meshStandardMaterial color="#0A0D14" metalness={0.95} roughness={0.18} />
        </mesh>

        {/* Golden Calibrated Distance / Focus Ring */}
        <group ref={focusGearRef} position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
          {/* Main Geared Ring */}
          <mesh>
            <cylinderGeometry args={[0.53, 0.53, 0.12, 48]} />
            <meshStandardMaterial
              color="#F5C400"
              metalness={0.95}
              roughness={0.15}
              emissive="#F5C400"
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Witness Index Ring */}
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.51, 0.51, 0.03, 32]} />
            <meshStandardMaterial color="#1E2536" metalness={0.85} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.51, 0.51, 0.03, 32]} />
            <meshStandardMaterial color="#1E2536" metalness={0.85} roughness={0.3} />
          </mesh>
        </group>

        {/* Front Anamorphic Lens Bezel Housing */}
        <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.58, 0.5, 0.16, 32]} />
          <meshStandardMaterial color="#141924" metalness={0.92} roughness={0.2} />
        </mesh>

        {/* Front Golden Anamorphic Ring */}
        <mesh position={[0, 0, 0.68]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.56, 0.02, 16, 32]} />
          <meshStandardMaterial
            color="#F5C400"
            metalness={0.95}
            roughness={0.15}
            emissive="#F5C400"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Aperture Iris Mechanism (Inside Lens) */}
        <group ref={irisBladesRef} position={[0, 0, 0.58]}>
          <mesh>
            <ringGeometry args={[0.22, 0.44, 24]} />
            <meshBasicMaterial color="#FFD700" transparent opacity={0.85} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <ringGeometry args={[0.12, 0.22, 16]} />
            <meshBasicMaterial color="#040608" side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Front Convex Multi-Coated Curved Optical Glass Element */}
        <mesh position={[0, 0, 0.69]}>
          <sphereGeometry args={[0.46, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          <meshPhysicalMaterial
            color="#14243B"
            transmission={0.94}
            opacity={0.98}
            transparent={true}
            roughness={0.015}
            ior={1.7}
            thickness={1.1}
            reflectivity={0.98}
            clearcoat={1}
            clearcoatRoughness={0.02}
          />
        </mesh>

        {/* Glowing Anamorphic Horizontal Blue Streak Flare */}
        <mesh position={[0, 0, 0.72]}>
          <planeGeometry args={[1.1, 0.02]} />
          <meshBasicMaterial
            color="#00E5FF"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 4. PROFESSIONAL CINEMA MATTE BOX & SUNSHADE HOOD (LMB)   */}
      {/* ========================================================= */}
      <group position={[0, 0, 1.45]}>
        {/* Flared Carbon Fiber Sunshade Hood (Tapered Cone Box) */}
        <mesh position={[0, 0, 0.12]}>
          <boxGeometry args={[1.52, 1.15, 0.24]} />
          <meshStandardMaterial
            color="#07090D"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>

        {/* Front Filter Tray Stage Frame (4x5.65) */}
        <mesh position={[0, 0, 0.24]}>
          <ringGeometry args={[0.62, 0.68, 4]} />
          <meshStandardMaterial
            color="#F5C400"
            metalness={0.95}
            roughness={0.15}
            emissive="#F5C400"
            emissiveIntensity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Top French Flag (Carbon Eyebrow Visor Angled Downward) */}
        <group position={[0, 0.58, 0.24]} rotation={[-0.48, 0, 0]}>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[1.56, 0.42, 0.025]} />
            <meshStandardMaterial
              color="#0A0D14"
              metalness={0.88}
              roughness={0.25}
            />
          </mesh>
          {/* Gold Hinge Bar */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 1.54, 16]} />
            <meshStandardMaterial color="#F5C400" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>

        {/* Left Side Barn-Door Flag */}
        <group position={[-0.78, 0, 0.24]} rotation={[0, 0.35, 0]}>
          <mesh position={[-0.15, 0, 0]}>
            <boxGeometry args={[0.3, 1.12, 0.02]} />
            <meshStandardMaterial color="#0A0D14" metalness={0.88} roughness={0.25} />
          </mesh>
        </group>

        {/* Right Side Barn-Door Flag */}
        <group position={[0.78, 0, 0.24]} rotation={[0, -0.35, 0]}>
          <mesh position={[0.15, 0, 0]}>
            <boxGeometry args={[0.3, 1.12, 0.02]} />
            <meshStandardMaterial color="#0A0D14" metalness={0.88} roughness={0.25} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 5. WIRELESS FOLLOW FOCUS MOTOR (cforce mini / Nucleus)    */}
      {/* ========================================================= */}
      <group position={[0.42, -0.35, 1.05]}>
        {/* Motor Cylindrical Body */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
          <meshStandardMaterial color="#121620" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Rotating Follow Focus Drive Gear */}
        <group ref={followFocusGearRef} position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 24]} />
          <meshStandardMaterial color="#F5C400" metalness={0.95} roughness={0.15} />
        </group>
        {/* Motor Status Channel LED */}
        <mesh position={[0, 0.11, 0]}>
          <boxGeometry args={[0.08, 0.02, 0.02]} />
          <meshBasicMaterial color="#00FF88" />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 6. TOP NATO CHEESE HANDLE & MIC RIG                       */}
      {/* ========================================================= */}
      <group position={[0, 0.65, -0.05]}>
        {/* Main Cheese Handle Horizontal Grip */}
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.18, 0.09, 1.35]} />
          <meshStandardMaterial color="#141A26" metalness={0.92} roughness={0.2} />
        </mesh>
        {/* Front Handle Mount Leg */}
        <mesh position={[0, 0.12, 0.48]}>
          <boxGeometry args={[0.16, 0.24, 0.12]} />
          <meshStandardMaterial color="#F5C400" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Rear Handle Mount Leg */}
        <mesh position={[0, 0.12, -0.48]}>
          <boxGeometry args={[0.16, 0.24, 0.12]} />
          <meshStandardMaterial color="#141A26" metalness={0.9} roughness={0.25} />
        </mesh>
        {/* Shotgun Mic & Transmitter Antenna */}
        <mesh position={[0.22, 0.3, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.65, 16]} />
          <meshStandardMaterial color="#0B0E14" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0.22, 0.3, 0.48]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#F5C400" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 7. ARTICULATED DIRECTOR'S FIELD MONITOR / EVF             */}
      {/* ========================================================= */}
      <group position={[-0.85, 0.42, 0.3]} rotation={[0.12, 0.42, -0.08]}>
        {/* Golden Articulated Magic Arm */}
        <mesh position={[0.14, -0.22, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.035, 0.035, 0.36, 16]} />
          <meshStandardMaterial color="#F5C400" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* 7-Inch High-Brightness Monitor Frame */}
        <mesh>
          <boxGeometry args={[0.78, 0.54, 0.06]} />
          <meshStandardMaterial color="#0E121A" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Monitor Screen Face */}
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[0.72, 0.48]} />
          <meshBasicMaterial color="#06101E" />
        </mesh>

        {/* Framing Gridlines & Waveforms */}
        <mesh position={[0, 0, 0.034]}>
          <planeGeometry args={[0.7, 0.005]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.034]}>
          <planeGeometry args={[0.005, 0.46]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.35} />
        </mesh>
        {/* Monitor Live Tally Badge */}
        <mesh position={[-0.24, 0.17, 0.035]}>
          <planeGeometry args={[0.12, 0.04]} />
          <meshBasicMaterial color="#FF1E1E" />
        </mesh>
        {/* Monitor Waveform Audio Bar */}
        <mesh position={[0.22, -0.16, 0.035]}>
          <planeGeometry args={[0.18, 0.04]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 8. REAR V-MOUNT HIGH-CAPACITY BATTERY PACK                */}
      {/* ========================================================= */}
      <group position={[0, 0, -0.92]}>
        {/* Battery Main Body */}
        <mesh>
          <boxGeometry args={[1.05, 1.15, 0.42]} />
          <meshStandardMaterial color="#080A0E" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* V-Mount Gold Plate */}
        <mesh position={[0, 0, 0.22]}>
          <boxGeometry args={[0.7, 0.8, 0.04]} />
          <meshStandardMaterial color="#F5C400" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* 4-Segment Green LED Power Gauge */}
        <group position={[0.42, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
          {[-0.15, -0.05, 0.05, 0.15].map((x, i) => (
            <mesh key={i} position={[x, 0, 0.12]}>
              <boxGeometry args={[0.04, 0.015, 0.01]} />
              <meshBasicMaterial color="#00FF88" />
            </mesh>
          ))}
        </group>
      </group>

      {/* ========================================================= */}
      {/* 9. BOTTOM 15MM DUAL SUPPORT RODS & BASEPLATE              */}
      {/* ========================================================= */}
      <group position={[0, -0.68, 0.35]}>
        {/* Baseplate Dovetail Block */}
        <mesh position={[0, 0.05, -0.3]}>
          <boxGeometry args={[1.1, 0.14, 1.25]} />
          <meshStandardMaterial color="#101520" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Left 15mm Steel Rod */}
        <mesh position={[-0.32, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.3, 16]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.98} roughness={0.08} />
        </mesh>
        {/* Right 15mm Steel Rod */}
        <mesh position={[0.32, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.3, 16]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.98} roughness={0.08} />
        </mesh>
      </group>
    </group>
  );
};

export const HeroScene = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] relative select-none">
      <Canvas
        camera={{ position: [0, 0.25, 4.3], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        {/* Studio Lighting Rig */}
        <ambientLight intensity={1.2} />
        {/* Main Studio Key Spotlight (Front-Right) */}
        <directionalLight position={[4, 5, 5]} intensity={3.4} color="#FFFFFF" />
        {/* Golden Rim Backlight (Left-Rear) */}
        <directionalLight position={[-5, -2, 2]} intensity={2.8} color="#F5C400" />
        {/* Cyan Studio Fill Light (Top-Left) */}
        <pointLight position={[-3, 3, 0]} intensity={2.2} color="#00E5FF" />
        {/* Front Lens Optical Spotlight */}
        <pointLight position={[0, 0.6, 3.2]} intensity={2.0} color="#FFE57F" />
        {/* Baseplate Accent Light */}
        <pointLight position={[2, -3, 1]} intensity={1.5} color="#F5C400" />

        {/* Ambient Golden Cinema Dust Floating Particles */}
        <Sparkles
          count={35}
          scale={5.5}
          size={2.5}
          speed={0.4}
          color="#F5C400"
          opacity={0.65}
        />

        {/* Organic Floating Movement */}
        <Float speed={1.8} rotationIntensity={0.08} floatIntensity={0.2}>
          <CinemaFilmCamera />
        </Float>

        {/* 360-Degree Interactive Orbit Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          rotateSpeed={0.85}
          dampingFactor={0.07}
          autoRotate={true}
          autoRotateSpeed={0.7}
          minPolarAngle={Math.PI / 4.8} // Allows inspecting top handles
          maxPolarAngle={Math.PI / 1.55} // Allows inspecting bottom rods
        />
      </Canvas>
    </div>
  );
};
