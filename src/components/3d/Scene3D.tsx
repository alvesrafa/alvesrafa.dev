'use client';

import { Box, Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function FloatingShape({
  position,
  shape,
  color,
  speed = 1,
  distort = 0.3
}: {
  position: [number, number, number];
  shape: 'sphere' | 'torus' | 'box';
  color: string;
  speed?: number;
  distort?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  const ShapeComponent = () => {
    switch (shape) {
      case 'sphere':
        return (
          <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={distort}
              speed={2}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        );
      case 'torus':
        return (
          <Torus ref={meshRef} args={[1, 0.4, 32, 64]} position={position}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={distort * 0.5}
              speed={1.5}
              roughness={0.3}
              metalness={0.7}
            />
          </Torus>
        );
      case 'box':
        return (
          <Box ref={meshRef} args={[1.5, 1.5, 1.5]} position={position}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={distort * 0.3}
              speed={1}
              roughness={0.4}
              metalness={0.6}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <ShapeComponent />
    </Float>
  );
}

function ParticleField({ count = 500, isDark }: { count?: number; isDark: boolean }) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={isDark ? '#4e8098' : '#4e8098'}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function MouseFollower({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const x = (state.mouse.x * viewport.width) / 2;
      const y = (state.mouse.y * viewport.height) / 2;

      meshRef.current.position.x = x;
      meshRef.current.position.y = y;

      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[0.3, 4]} />
      <MeshDistortMaterial
        color={isDark ? '#e84855' : '#a31621'}
        attach="material"
        distort={0.4}
        speed={4}
        roughness={0.2}
        metalness={0.9}
      />
    </mesh>
  );
}

function SceneContent({ isDark }: { isDark: boolean }) {
  const primaryColor = isDark ? '#90c2e7' : '#4e8098';
  const accentColor = isDark ? '#e84855' : '#a31621';

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color={accentColor} />

      <ParticleField count={300} isDark={isDark} />

      <FloatingShape
        position={[-4, 2, -5]}
        shape="sphere"
        color={primaryColor}
        speed={0.5}
        distort={0.4}
      />
      <FloatingShape
        position={[4, -2, -3]}
        shape="torus"
        color={accentColor}
        speed={0.7}
        distort={0.3}
      />
      <FloatingShape
        position={[3, 3, -6]}
        shape="box"
        color={primaryColor}
        speed={0.4}
        distort={0.2}
      />
      <FloatingShape
        position={[-3, -3, -4]}
        shape="sphere"
        color={accentColor}
        speed={0.6}
        distort={0.5}
      />

      <MouseFollower isDark={isDark} />
    </>
  );
}

export function Scene3D() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent isDark={isDark} />
      </Canvas>
    </div>
  );
}
