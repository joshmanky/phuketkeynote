// 3D particle field background with floating orbs and ambient lighting
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 80 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      sz[i] = Math.random() * 0.03 + 0.01;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime * 0.15;
    const posArray = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] += Math.sin(time + i * 0.5) * 0.002;
      posArray[i3] += Math.cos(time + i * 0.3) * 0.001;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#2dd4bf"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingOrb({ position, color, scale = 1, speed = 1 }: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={1.5} floatingRange={[-0.3, 0.3]}>
      <Sphere args={[0.15 * scale, 16, 16]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.15}
          roughness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function AmbientScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <group ref={groupRef}>
      <Particles count={60} />
      <FloatingOrb position={[-3, 2, -5]} color="#2dd4bf" scale={2} speed={0.8} />
      <FloatingOrb position={[4, -1.5, -6]} color="#06b6d4" scale={1.5} speed={1.2} />
      <FloatingOrb position={[-1, -3, -4]} color="#f59e0b" scale={1} speed={0.6} />
      <FloatingOrb position={[2.5, 3, -7]} color="#0e7490" scale={2.5} speed={0.4} />
      <FloatingOrb position={[-4, 0, -8]} color="#14b8a6" scale={1.8} speed={1} />
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#2dd4bf" />
      <pointLight position={[-5, -5, 3]} intensity={0.2} color="#06b6d4" />
    </group>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.7 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <AmbientScene />
      </Canvas>
    </div>
  );
}
