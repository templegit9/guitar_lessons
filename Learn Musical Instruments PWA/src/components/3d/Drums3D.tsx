import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function DrumKit({ animate = true }: { animate?: boolean }) {
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (groupRef.current && animate) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Snare Drum */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>
      
      {/* Kick Drum */}
      <mesh position={[0, -0.5, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Hi-Hat */}
      <group position={[-0.8, 0.3, 0.3]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>
      </group>
      
      {/* Tom 1 */}
      <mesh position={[0.6, 0.4, -0.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.25, 32]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      
      {/* Tom 2 */}
      <mesh position={[0.9, 0.1, -0.3]}>
        <cylinderGeometry args={[0.35, 0.35, 0.3, 32]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      
      {/* Crash Cymbal */}
      <mesh position={[0.9, 0.8, 0.2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.02, 32]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} />
      </mesh>
      
      {/* Ride Cymbal */}
      <mesh position={[1.2, 0.6, -0.5]}>
        <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} />
      </mesh>
    </group>
  );
}

export function Drums3D({ animate = true }: { animate?: boolean }) {
  return (
    <Canvas camera={{ position: [3, 2, 4], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-5, 5, 5]} intensity={0.5} />
      <DrumKit animate={animate} />
    </Canvas>
  );
}