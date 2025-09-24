import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';
import * as THREE from 'three';

export function CyberpunkAvatar() {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);

  useFrame((state) => {
    if (headRef.current) {
      // Gentle head movement
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  useEffect(() => {
    if (!headRef.current) return;

    // Create wireframe head geometry
    const headGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);

    // Cyberpunk wireframe materials
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: '#9333ea', // Purple
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: '#06b6d4', // Cyan glow
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      side: THREE.BackSide,
    });

    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: '#ef4444', // Red eyes
      transparent: true,
      opacity: 0.8,
    });

    // Create head mesh
    const headMesh = new THREE.Mesh(headGeometry, wireframeMaterial);
    const headGlow = new THREE.Mesh(headGeometry, glowMaterial);
    headGlow.scale.multiplyScalar(1.05);

    // Create eyes
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.3, 0.2, 0.8);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.3, 0.2, 0.8);

    // Add to head group
    headRef.current.add(headMesh);
    headRef.current.add(headGlow);
    headRef.current.add(leftEye);
    headRef.current.add(rightEye);

    // Create circuit lines around head
    const circuitGeometry = new THREE.BufferGeometry();
    const points = [];

    // Generate circuit-like lines
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2;
      const radius = 1.5 + Math.sin(i * 0.5) * 0.2;
      points.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius + Math.sin(i * 0.8) * 0.3,
        Math.sin(i * 0.3) * 0.5
      );
    }

    circuitGeometry.setFromPoints(points.map((_, i, arr) =>
      new THREE.Vector3(arr[i * 3], arr[i * 3 + 1], arr[i * 3 + 2])
    ));

    const circuitMaterial = new THREE.LineBasicMaterial({
      color: '#06b6d4',
      transparent: true,
      opacity: 0.7,
    });

    const circuitLines = new THREE.Line(circuitGeometry, circuitMaterial);
    headRef.current.add(circuitLines);

    return () => {
      const currentHead = headRef.current;
      currentHead?.clear();
    };
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={headRef} />

      {/* Data streams around avatar */}
      <DataStreams />

      {/* Holographic grid base */}
      <HolographicGrid />
    </group>
  );
}

function DataStreams() {
  const streamRef = useRef<Group>(null);

  useFrame((state) => {
    if (streamRef.current) {
      streamRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  useEffect(() => {
    if (!streamRef.current) return;

    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.BufferGeometry();
      const points = [];

      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.5;

      for (let j = 0; j < 20; j++) {
        const t = j / 19;
        points.push(
          Math.cos(angle) * (radius + Math.sin(t * Math.PI * 4) * 0.2),
          (t - 0.5) * 4,
          Math.sin(angle) * (radius + Math.sin(t * Math.PI * 4) * 0.2)
        );
      }

      geometry.setFromPoints(points.map((_, i, arr) =>
        new THREE.Vector3(arr[i * 3], arr[i * 3 + 1], arr[i * 3 + 2])
      ));

      const material = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? '#06b6d4' : '#9333ea',
        transparent: true,
        opacity: 0.5,
      });

      const line = new THREE.Line(geometry, material);
      streamRef.current.add(line);
    }
  }, []);

  return <group ref={streamRef} />;
}

function HolographicGrid() {
  const gridRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={gridRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, 8, 20, 20]} />
      <meshBasicMaterial
        color="#06b6d4"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}