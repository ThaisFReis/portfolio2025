import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Scanline,
  Glitch,
  ChromaticAberration,
  Noise,
} from "@react-three/postprocessing";
import * as THREE from "three";
import Avatar from "./Avatar";

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: 'transparent' }}
    >
      {/* Enhanced lighting for cyberpunk effect */}
      <ambientLight intensity={0.2} color="#240046" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff00ff" />
      <directionalLight position={[0, 5, 0]} intensity={0.8} color="#00ffff" />

      <Avatar />

      {/* Enhanced post-processing stack */}
      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur={true}
        />
        <Scanline density={1.5} opacity={0.4} />
        <Glitch
          delay={new THREE.Vector2(1.5, 3.5)}
          duration={new THREE.Vector2(0.1, 0.3)}
          strength={new THREE.Vector2(0.01, 0.05)}
          active
        />
        <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} />
        <Noise opacity={0.1} />
      </EffectComposer>
    </Canvas>
  );
}
