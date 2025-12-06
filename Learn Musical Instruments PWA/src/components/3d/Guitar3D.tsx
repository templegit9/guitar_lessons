import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function GuitarModel({ animate = true }: { animate?: boolean }) {
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (groupRef.current && animate) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, -Math.PI / 6]}>
      {/* Guitar Body */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[1.2, 1.8, 0.3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.3, 2, 0.15]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
      
      {/* Fretboard */}
      <mesh position={[0, 0.8, 0.08]}>
        <boxGeometry args={[0.28, 2, 0.02]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>
      
      {/* Strings */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[-0.1 + i * 0.04, 0.8, 0.1]}
        >
          <cylinderGeometry args={[0.005, 0.005, 2]} />
          <meshStandardMaterial color="#c0c0c0" />
        </mesh>
      ))}
      
      {/* Headstock */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[0.35, 0.4, 0.15]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

export function Guitar3D({ animate = true }: { animate?: boolean }) {
  return (
    <Canvas camera={{ position: [3, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <GuitarModel animate={animate} />
    </Canvas>
  );
}