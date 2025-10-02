import type { NyxAvatarProps } from "../../types/chat";

export const NyxAvatar = ({ state }: NyxAvatarProps) => {
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
            <stop stopColor="var(--stardust-gray-100)" />
            <stop offset="0.5" stopColor="var(--stellar-purple-400)" />
            <stop offset="1" stopColor="var(--stardust-gray-500)" />
          </linearGradient>
          <radialGradient
            id="glow-ring"
            cx="50"
            cy="50"
            r="50"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--nebula-cyan-400)" />
            <stop offset="0.7" stopColor="var(--stellar-purple-500)" />
            <stop
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
          cx="50"
          cy="35"
          r="3"
          fill="var(--nebula-cyan-400)"
          opacity="0.8"
        />
        <circle
          cx="65"
          cy="50"
          r="2"
          fill="var(--stellar-purple-400)"
          opacity="0.6"
        />
        <circle
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