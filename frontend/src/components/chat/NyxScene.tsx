import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { Nyx3DModel } from './Nyx3DModel';
import type { NyxState } from '../../types/chat';

interface NyxSceneProps {
  state: NyxState;
}

export const NyxScene = ({ state }: NyxSceneProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-[50vw] h-[100vh] z-50 pointer-events-none">
      <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
        {/* Mysterious low lighting */}
        <ambientLight intensity={0.2} />
        
        {/* Purple/Cyan rim lights for the cyberpunk aesthetic */}
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#9e78ff" />
        <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#22d3ee" />
        <pointLight position={[0, 2, 2]} intensity={0.5} color="#ffffff" />

        <Nyx3DModel state={state} />

        {/* Soft shadow underneath */}
        <ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} color="#9e78ff" />
        
        {/* Environment reflection (city setting or nebula) */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
