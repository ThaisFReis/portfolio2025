import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Group, Object3D, Bone } from 'three';
import { MathUtils } from 'three';
import { Model } from './Model'; // Seu componente Model.tsx

// Novo componente que contém a lógica de interação
function InteractiveAvatar() {
  const groupRef = useRef<Group>(null);
  const [headBone, setHeadBone] = useState<Bone | null>(null);

  // Este useEffect executa uma vez e procura pelo osso da cabeça dentro do modelo
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((object: Object3D) => {
        // O nome 'cabeça' deve ser EXATAMENTE o mesmo do osso no seu rig
        if (object instanceof Bone && object.name === 'cabeça') {
          setHeadBone(object);
        }
      });
    }
  }, []);

  // useFrame é executado a cada frame (60x por segundo)
  useFrame((state) => {
    // Se não encontramos o osso da cabeça, não fazemos nada
    if (!headBone) return;

    // state.mouse contém a posição do mouse (x, y) de -1 a 1
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;

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