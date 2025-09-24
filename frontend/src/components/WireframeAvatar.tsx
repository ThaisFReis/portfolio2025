import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Avatar from './Avatar';

export function WireframeAvatar() {
  return (
    <div className="avatar-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="wireframe-figure" style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Canvas
          // <<< CÂMERA AFASTADA PARA COMPORTAR A ESCALA MAIOR
          camera={{ position: [0, 0, 7], fov: 50 }}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent'
          }}
        >

          <Suspense fallback={null}>
            <Avatar />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}