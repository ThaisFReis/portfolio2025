import { useEffect, useRef } from 'react';

export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Circuit pattern animation
    let animationId: number;

    const drawCircuit = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid pattern
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)'; // Cyan with low opacity
      ctx.lineWidth = 1;

      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Circuit lines
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.3)'; // Purple
      ctx.lineWidth = 2;

      // Random circuit connections
      for (let i = 0; i < 15; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        // Create L-shaped connections
        const endX = startX + (Math.random() - 0.5) * 300;
        const endY = startY + (Math.random() - 0.5) * 300;

        ctx.lineTo(endX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Add junction points
        ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
        ctx.fillRect(endX - 2, startY - 2, 4, 4);
        ctx.fillRect(endX - 2, endY - 2, 4, 4);
      }

      animationId = requestAnimationFrame(drawCircuit);
    };

    drawCircuit();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ zIndex: -1 }}
    />
  );
}