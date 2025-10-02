import { useEffect } from "react";
import type { StarfieldProps } from "../../types/chat";

export const Starfield = ({ className = "" }: StarfieldProps) => {
  useEffect(() => {
    const container = document.getElementById("enhanced-starfield");
    if (!container) return;

    // Clear existing stars
    container.innerHTML = "";

    const starCounts = { small: 60, medium: 30, large: 15 };

    Object.entries(starCounts).forEach(([size, count]) => {
      for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.className = `enhanced-star ${size}`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;

        const duration = 2 + Math.random() * 4;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${Math.random() * duration}s`;

        container.appendChild(star);
      }
    });

    // Add constellation effects
    for (let i = 0; i < 3; i++) {
      const constellation = document.createElement("div");
      constellation.className = "constellation";
      constellation.style.top = `${20 + Math.random() * 60}%`;
      constellation.style.left = `${20 + Math.random() * 60}%`;
      constellation.innerHTML = `<div class="w-1 h-1 bg-cyan-300 rounded-full opacity-60"></div>`;
      container.appendChild(constellation);
    }
  }, []);

  return (
    <div
      id="enhanced-starfield"
      className={`enhanced-starfield ${className}`}
    />
  );
};
