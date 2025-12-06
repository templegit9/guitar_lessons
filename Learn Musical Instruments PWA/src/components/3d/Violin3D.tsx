import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function ViolinModel({ animate = true }: { animate?: boolean }) {
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (groupRef.current && animate) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 12]}>
      {/* Body (top bout) */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Body (bottom bout) */}
      <mesh position={[0, -0.3, 0]} scale={[1, 1.2, 1]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* C-bouts (waist) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.15]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.5]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Strings */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          position={[-0.06 + i * 0.04, 0.3, 0.08]}
        >
          <cylinderGeometry args={[0.003, 0.003, 1.8]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
      ))}
      
      {/* Bridge */}
      <mesh position={[0, -0.15, 0.08]}>
        <boxGeometry args={[0.15, 0.08, 0.02]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>
      
      {/* Scroll */}
      <mesh position={[0, 1.8, 0]}>
        <torusGeometry args={[0.1, 0.05, 16, 32]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  );
}

export function Violin3D({ animate = true }: { animate?: boolean }) {
  return (
    <Canvas camera={{ position: [2, 0, 4], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <ViolinModel animate={animate} />
    </Canvas>
  );
}