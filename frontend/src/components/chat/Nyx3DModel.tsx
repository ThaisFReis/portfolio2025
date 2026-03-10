import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import type { NyxState } from '../../types/chat';

interface Nyx3DModelProps {
  state: NyxState;
}

export const Nyx3DModel = ({ state }: Nyx3DModelProps) => {
  const { scene, animations } = useGLTF('/thais14.glb');
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Bind animations to the group ref
  const { actions, names } = useAnimations(animations, groupRef);

  // Refs for bones found after traversal
  const headBoneRef = useRef<THREE.Object3D | null>(null);
  const neckBoneRef = useRef<THREE.Object3D | null>(null);
  const spineBoneRef = useRef<THREE.Object3D | null>(null);

  // On mount: discover bones via direct name lookup (since skeleton array might be missing or mesh is separated)
  useEffect(() => {
    headBoneRef.current = scene.getObjectByName('cabeça') ?? null;
    neckBoneRef.current = scene.getObjectByName('pescoço') ?? null;
    spineBoneRef.current = scene.getObjectByName('Armação') ?? null;
    
    console.log('[Nyx] Head found:', !!headBoneRef.current);
    console.log('[Nyx] Neck found:', !!neckBoneRef.current);
  }, [scene]);

  // Play idle animation if available
  useEffect(() => {
    if (names.length === 0) return;
    console.log('[Nyx] Playing animation:', names[0]);
    const action = actions[names[0]];
    if (action) {
      action.reset().setEffectiveWeight(1).fadeIn(0.5).play();
    }
    return () => {
      action?.fadeOut(0.5);
    };
  }, [actions, names, state]);

  // Switch animations based on state
  useEffect(() => {
    if (names.length <= 1) return;

    const stateMap: Record<NyxState, number> = {
      idle: 0,
      thinking: 1,
      speaking: 2,
      angry: 3,
    };
    const idx = stateMap[state] ?? 0;
    const targetName = names[Math.min(idx, names.length - 1)];
    const currentName = names[0];

    if (targetName !== currentName) {
      actions[currentName]?.fadeOut(0.3);
      actions[targetName]?.reset().setEffectiveWeight(1).fadeIn(0.3).play();
    }
  }, [state, actions, names]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetRotation.current.x = y * 0.3;  
      targetRotation.current.y = x * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Reusable objects for useFrame (avoids memory leaks and garbage collection stutters)
  const targetEuler = useRef(new THREE.Euler());
  const targetQuat = useRef(new THREE.Quaternion());

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    const time = _state.clock.getElapsedTime();

    // Apply mouse-tracking rotation to head > fallback to neck > fallback to group
    const trackTarget = headBoneRef.current ?? neckBoneRef.current;
    if (trackTarget) {
      // Update the reusable Euler and Quaternion instead of instantiating new ones
      targetEuler.current.set(targetRotation.current.x, targetRotation.current.y, 0);
      targetQuat.current.setFromEuler(targetEuler.current);

      // Slerp the bone's current quaternion towards the target quaternion
      trackTarget.quaternion.slerp(targetQuat.current, delta * 5);
    }

    // Subtle spine sway when speaking
    if (state === 'speaking' && spineBoneRef.current) {
      spineBoneRef.current.rotation.z = Math.sin(time * 4) * 0.03;
    }

    // Thinking: small horizontal jitter
    if (state === 'thinking') {
      groupRef.current.position.x = Math.sin(time * 20) * 0.008;
    } else {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x, 0, delta * 5
      );
    }
  });

  // Enhance materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.envMapIntensity = 2;
        mat.needsUpdate = true;
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef} dispose={null}>
      {/* Positioned slightly left and down. 
          Rotated Math.PI / 5 (36 degrees) so she is "meio de frente e meio de lado" (3/4 view) looking towards the chat on the right */}
      <primitive object={scene} scale={3.2} position={[-1.5, 0, 0]} rotation={[0, -1, 0]} />
    </group>
  );
};

useGLTF.preload('/thais14.glb');
