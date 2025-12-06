import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function PianoKeys({ animate = true }: { animate?: boolean }) {
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (groupRef.current && animate) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  const whiteKeys = 8;
  const whiteKeyWidth = 0.3;
  const whiteKeyHeight = 1.5;
  const whiteKeyDepth = 0.1;
  const blackKeyWidth = 0.2;
  const blackKeyHeight = 1;
  const blackKeyDepth = 0.08;

  const blackKeyPositions = [0, 1, 3, 4, 5]; // Positions where black keys appear

  return (
    <group ref={groupRef}>
      {/* White Keys */}
      {Array.from({ length: whiteKeys }).map((_, i) => (
        <mesh key={`white-${i}`} position={[i * whiteKeyWidth - (whiteKeys * whiteKeyWidth) / 2, 0, 0]}>
          <boxGeometry args={[whiteKeyWidth - 0.02, whiteKeyHeight, whiteKeyDepth]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
      
      {/* Black Keys */}
      {Array.from({ length: whiteKeys - 1 }).map((_, i) => {
        const isBlackKey = blackKeyPositions.includes(i % 7);
        if (!isBlackKey) return null;
        
        return (
          <mesh
            key={`black-${i}`}
            position={[
              (i + 0.5) * whiteKeyWidth - (whiteKeys * whiteKeyWidth) / 2,
              whiteKeyHeight / 2 - blackKeyHeight / 2 + 0.1,
              blackKeyDepth
            ]}
          >
            <boxGeometry args={[blackKeyWidth, blackKeyHeight, blackKeyDepth]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        );
      })}
    </group>
  );
}

export function Piano3D({ animate = true }: { animate?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <PianoKeys animate={animate} />
    </Canvas>
  );
}