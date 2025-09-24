import { useEffect, useRef } from 'react';

export function Starfield() {
  const starfieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starfieldRef.current) return;

    const createStars = () => {
      const starfield = starfieldRef.current;
      if (!starfield) return;

      // Clear existing stars
      starfield.innerHTML = '';

      const starCount = 200;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random();

        if (size > 0.8) {
          star.className = 'star star-large';
        } else if (size > 0.6) {
          star.className = 'star star-medium';
        } else {
          star.className = 'star star-small';
        }

        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starfield.appendChild(star);
      }
    };

    createStars();
  }, []);

  return <div ref={starfieldRef} className="starfield"></div>;
}

export function ParticleSystem() {
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particleRef.current) return;

    const addParticle = () => {
      const particleSystem = particleRef.current;
      if (!particleSystem) return;

      const particle = document.createElement('div');
      particle.className = 'blue-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 12 + 's';
      particle.style.animationDuration = (Math.random() * 8 + 10) + 's';
      particleSystem.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 20000);
    };

    // Add particles continuously
    const interval = setInterval(addParticle, 800);

    return () => clearInterval(interval);
  }, []);

  return <div ref={particleRef} className="particle-system"></div>;
}