import type { NyxAvatarProps } from "../../types/chat";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const NyxAvatar = ({ state }: NyxAvatarProps) => {
  const light1Ref = useRef<SVGCircleElement>(null);
  const light2Ref = useRef<SVGCircleElement>(null);
  const light3Ref = useRef<SVGCircleElement>(null);

  const glowStop1Ref = useRef<SVGStopElement>(null);
  const glowStop2Ref = useRef<SVGStopElement>(null);
  const glowStop3Ref = useRef<SVGStopElement>(null);

  const moonStop1Ref = useRef<SVGStopElement>(null);
  const moonStop2Ref = useRef<SVGStopElement>(null);
  const moonStop3Ref = useRef<SVGStopElement>(null);

  useEffect(() => {
    // Determine target colors
    const isAngry = state === "angry";

    // Glow Ring Colors (Cyan/Purple to Red/Crimson)
    const gC1 = isAngry ? "#ff0000" : "var(--nebula-cyan-400)"; // #22d3ee
    const gC2 = isAngry ? "#990000" : "var(--stellar-purple-500)"; // #a855f7

    // Moon Colors
    const mC1 = isAngry ? "#4a0000" : "var(--stardust-gray-100)"; // #f3f4f6
    const mC2 = isAngry ? "#ff0000" : "var(--stellar-purple-400)"; // #c084fc
    const mC3 = isAngry ? "#220000" : "var(--stardust-gray-500)"; // #6b7280

    // Light Colors
    const lC1 = isAngry ? "#ff0000" : "var(--nebula-cyan-400)";
    const lC2 = isAngry ? "#ff4444" : "var(--stellar-purple-400)";
    const lC3 = isAngry ? "#ffaaaa" : "var(--nebula-cyan-300)"; // #67e8f9

    // Animation Speed
    const baseDuration = isAngry ? 0.3 : 2;

    // Transition Colors smoothly
    if (glowStop1Ref.current) gsap.to(glowStop1Ref.current, { stopColor: gC1, duration: 0.5 });
    if (glowStop2Ref.current) gsap.to([glowStop2Ref.current, glowStop3Ref.current], { stopColor: gC2, duration: 0.5 });

    if (moonStop1Ref.current) gsap.to(moonStop1Ref.current, { stopColor: mC1, duration: 0.5 });
    if (moonStop2Ref.current) gsap.to(moonStop2Ref.current, { stopColor: mC2, duration: 0.5 });
    if (moonStop3Ref.current) gsap.to(moonStop3Ref.current, { stopColor: mC3, duration: 0.5 });

    if (light1Ref.current) gsap.to(light1Ref.current, { fill: lC1, duration: 0.5 });
    if (light2Ref.current) gsap.to(light2Ref.current, { fill: lC2, duration: 0.5 });
    if (light3Ref.current) gsap.to(light3Ref.current, { fill: lC3, duration: 0.5 });

    // Orbital/Floating Animations
    if (light1Ref.current) {
      gsap.to(light1Ref.current, {
        y: isAngry ? -10 : -5,
        x: isAngry ? 5 : 2,
        duration: baseDuration + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    if (light2Ref.current) {
      gsap.to(light2Ref.current, {
        y: isAngry ? 8 : 4,
        x: isAngry ? -8 : -3,
        duration: baseDuration + 0.5 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    if (light3Ref.current) {
      gsap.to(light3Ref.current, {
        y: isAngry ? -6 : -3,
        x: isAngry ? -10 : -4,
        duration: baseDuration + 1 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Gentle pulse on the whole avatar based on state
    if (isAngry && light1Ref.current) {
      // Rapid heartbeat pulse
      gsap.fromTo(".nyx-avatar", 
        { scale: 1 }, 
        { scale: 1.05, duration: 0.15, repeat: -1, yoyo: true, ease: "power1.inOut" }
      );
    } else {
      // Slow breathing pulse
      gsap.fromTo(".nyx-avatar", 
        { scale: 1 }, 
        { scale: 1.02, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" }
      );
    }

  }, [state]);

  return (
    <div className={`nyx-avatar ${state}`} role="img" aria-label="Nyx Avatar">
      <svg
        width="64"
        height="64"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="moon-gradient"
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop ref={moonStop1Ref} stopColor="var(--stardust-gray-100)" />
            <stop ref={moonStop2Ref} offset="0.5" stopColor="var(--stellar-purple-400)" />
            <stop ref={moonStop3Ref} offset="1" stopColor="var(--stardust-gray-500)" />
          </linearGradient>
          <radialGradient
            id="glow-ring"
            cx="50"
            cy="50"
            r="50"
            gradientUnits="userSpaceOnUse"
          >
            <stop ref={glowStop1Ref} stopColor="var(--nebula-cyan-400)" />
            <stop ref={glowStop2Ref} offset="0.7" stopColor="var(--stellar-purple-500)" />
            <stop
              ref={glowStop3Ref}
              offset="1"
              stopColor="var(--stellar-purple-500)"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="48"
          stroke="url(#glow-ring)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M50 10C50 10 70 30 50 50C30 70 50 90 50 90C50 90 30 70 50 50C70 30 50 10 50 10Z"
          fill="url(#moon-gradient)"
        />
        <circle
          ref={light1Ref}
          cx="50"
          cy="35"
          r="3"
          fill="var(--nebula-cyan-400)"
          opacity="0.8"
        />
        <circle
          ref={light2Ref}
          cx="65"
          cy="50"
          r="2"
          fill="var(--stellar-purple-400)"
          opacity="0.6"
        />
        <circle
          ref={light3Ref}
          cx="35"
          cy="65"
          r="2"
          fill="var(--nebula-cyan-300)"
          opacity="0.7"
        />
      </svg>
    </div>
  );
};