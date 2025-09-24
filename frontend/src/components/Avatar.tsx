import { useRef, useMemo, Suspense  } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Group, Mesh, SkinnedMesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useMouseTracking } from '../hooks/useMouseTracking';

// --- Componente que renderiza o modelo com os materiais corretos ---
function WiredModel({ scene }: { scene: Group }) {
  const meshes = useMemo(() => {
    const meshArray: (Mesh | SkinnedMesh)[] = [];
    scene.traverse((child) => {
      if (child instanceof Mesh || child instanceof SkinnedMesh) {
        meshArray.push(child);
      }
    });
    return meshArray;
  }, [scene]);

  return (
    <group>
      {meshes.slice(0, 4).map((mesh) =>
        mesh instanceof SkinnedMesh ? (
          <skinnedMesh
            key={mesh.uuid}
            geometry={mesh.geometry}
            skeleton={mesh.skeleton}
            frustumCulled={true}
          >
            <meshBasicMaterial
              color="#400761"
              transparent
              opacity={0.6}
              wireframe={true}
            />
          </skinnedMesh>
        ) : (
          <mesh
            key={mesh.uuid}
            geometry={mesh.geometry}
            frustumCulled={true}
          >
            <meshBasicMaterial
              color="#03adad"
              transparent
              opacity={0.6}
            />
          </mesh>
        )
      )}
    </group>
  );
}


// --- Componente principal do Avatar ---
function LoadedAvatar() {
  const { scene } = useLoader(GLTFLoader, '/thais5.glb');
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const mousePosition = useMouseTracking();
  const baseRotationY = -Math.PI / 2;

  useFrame((state) => {
    if (headRef.current && mousePosition.isTracking) {
      const { rotation } = headRef.current;
      const rotationLimit = Math.PI / 12;
      const targetX = baseRotationY + (mousePosition.targetPosition.x * 0.2);
      rotation.y += (targetX - rotation.y) * (mousePosition.interpolationSpeed * 0.7);
      rotation.y = Math.max(baseRotationY - rotationLimit, Math.min(baseRotationY + rotationLimit, rotation.y));

      const targetY = mousePosition.targetPosition.y * 0.1;
      rotation.x += (targetY - rotation.x) * (mousePosition.interpolationSpeed * 0.7);
      rotation.x = Math.max(-rotationLimit, Math.min(rotationLimit, rotation.x));
    }

    if (state.clock.elapsedTime % 0.1 < 0.016 && groupRef.current) {
      const floatY = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      groupRef.current.position.y = 0 + floatY;
    }
  });

  return (
    <group ref={groupRef}>
      <group
        scale={[2.2, 2.2, 2.2]}
        position={[0, 0, 0]}
        rotation={[0, baseRotationY, 0]}
        ref={headRef}
      >
        <WiredModel scene={scene} />
      </group>
    </group>
  );
}

export default function Avatar() {
  return (
    <Suspense fallback={null}>
      <LoadedAvatar />
    </Suspense>
  );
}