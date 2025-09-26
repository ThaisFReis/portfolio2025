import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Group, Object3D, Bone } from 'three';
import { MathUtils } from 'three';
import { Model } from './Model_old';

// Novo componente que contém a lógica de interação
function InteractiveAvatar() {
  const groupRef = useRef<Group>(null);
  const [headBone, setHeadBone] = useState<Bone | null>(null);

  // Este useEffect executa uma vez e procura pelo osso da cabeca dentro do modelo
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((object: Object3D) => {
        // Check for different possible head bone names
        if (object instanceof Bone) {
          console.log('Found bone:', object.name);
          // Try common head bone names
          if (object.name === 'cabeca' ||
              object.name === 'head' ||
              object.name === 'Head' ||
              object.name === 'pescoco' ||
              object.name.toLowerCase().includes('head') ||
              object.name.toLowerCase().includes('cabeca') ||
              object.name.toLowerCase().includes('neck') ||
              object.name.toLowerCase().includes('pescoco')) {
            setHeadBone(object);
            console.log('Set head bone:', object.name);
          }
        }
      });
    }
  }, []);

  // useFrame é executado a cada frame (60x por segundo)
  useFrame((state) => {
    // Se não encontramos o osso da cabeca, não fazemos nada
    if (!headBone) return;

    // state.pointer contém a posição do mouse (x, y) de -1 a 1
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // Calculamos a rotação desejada com um limite para não ficar estranho
    // Math.PI / 6 = 30 graus. O movimento será de -30 a +30 graus.
    const targetRotationY = mouseX * (Math.PI / 6);
    const targetRotationX = -mouseY * (Math.PI / 6);

    // Suavizamos o movimento usando lerp para um efeito mais natural
    headBone.rotation.y = MathUtils.lerp(headBone.rotation.y, targetRotationY, 0.1);
    headBone.rotation.x = MathUtils.lerp(headBone.rotation.x, targetRotationX, 0.1);
  });

  return (
    <group ref={groupRef}>
      <Model />
    </group>
  );
}

// Seu componente Avatar agora usa o InteractiveAvatar
export function Avatar() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ fov: 45, position: [0, 0, 20] }}>
        <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6}>
            <InteractiveAvatar />
          </Stage>
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}