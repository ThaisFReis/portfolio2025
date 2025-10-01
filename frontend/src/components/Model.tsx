import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

export function Model() {
  const { scene } = useGLTF('/avatar.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Apply wireframe material with purple color
        child.material = new THREE.MeshBasicMaterial({
          color: '#8A2BE2', // Purple color
          wireframe: true,
          transparent: true,
          opacity: 0.8,
        });

        // Ensure the material is not affected by lighting
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

// Preload the model
useGLTF.preload('/avatar.glb');