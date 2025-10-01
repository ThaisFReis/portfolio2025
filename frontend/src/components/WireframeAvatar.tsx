import { useEffect, useRef } from "react";
import * as THREE from "three";

export const WireframeAvatar = () => {
  // Ref para o container onde a cena será renderizada
  const mountRef = useRef<HTMLDivElement>(null);

  // useEffect será executado uma vez após o componente ser montado (como o 'init()')
  // Evita executar o código no lado do servidor ou se o ref não estiver pronto
  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const containerWidth = container.clientWidth || 400;
    const containerHeight = container.clientHeight || 400;

    // Variáveis da cena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // Geometria e material - optimized for performance
    const geometry = new THREE.SphereGeometry(2, 12, 10);
    const material = new THREE.MeshBasicMaterial({
      color: "#22d3ee",
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
    const head = new THREE.Mesh(geometry, material);

    // Alvos para animação suave
    const targetRotation = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const containerHalf = { x: containerWidth / 2, y: containerHeight / 2 };

    // Camera - adjusted for smaller sphere
    camera.position.z = 5;

    // Renderer - optimized pixel ratio for performance
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Adiciona o canvas ao container
    container.appendChild(renderer.domElement);

    // Adiciona a cabeça à cena
    scene.add(head);

    // Funções de Evento
    const onWindowResize = () => {
      const newWidth = container.clientWidth || 400;
      const newHeight = container.clientHeight || 400;

      containerHalf.x = newWidth / 2;
      containerHalf.y = newHeight / 2;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    // Throttled mouse movement with requestAnimationFrame
    let mouseMoveScheduled = false;
    const onDocumentMouseMove = (event: MouseEvent) => {
      if (mouseMoveScheduled) return;

      mouseMoveScheduled = true;
      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) - containerHalf.x) / containerHalf.x;
        mouse.y = ((event.clientY - rect.top) - containerHalf.y) / containerHalf.y;
        mouseMoveScheduled = false;
      });
    };

    // Event Listeners
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    window.addEventListener("resize", onWindowResize, false);

    // Loop de Animação
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Mapeia a posição do mouse para a rotação alvo - reduced sensitivity
      targetRotation.y = mouse.x * 0.5;
      targetRotation.x = mouse.y * 0.5;

      // Interpola suavemente a rotação atual para a rotação alvo (easing) - faster settling
      head.rotation.y += (targetRotation.y - head.rotation.y) * 0.08;
      head.rotation.x += (targetRotation.x - head.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    // Inicia a animação
    animate();

    // Função de Limpeza
    // Será executada quando o componente for desmontado
    return () => {
      // Para o loop de animação
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Remove os event listeners para evitar vazamentos de memória
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);

      // Limpa a cena e o renderer
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Limpeza de geometrias e materiais
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez


  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    />
  );
};
