import type { ChatHeaderProps } from "../../types/chat";
import { NyxAvatar } from "./NyxAvatar";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const ChatHeader = ({ currentMessage, nyxState }: ChatHeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.3 }
      );
    }
  }, []);

  return (
    <header className="p-6 flex items-center justify-between border-b border-[#9e78ff]/10">
      <div ref={headerRef} className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 transform scale-75 -ml-2">
            <NyxAvatar state={nyxState} />
          </div>
          <h1 className="text-2xl font-bold text-white font-secondary leading-none">
            NYX
          </h1>
        </div>
        <p className="text-sm text-cyan-400 font-secondary mt-1">
          Oracle of the Portfolio
        </p>
        <p className="text-xs text-purple-300 transition-all duration-500 font-mono">
          {currentMessage || "Observing the digital cosmos..."}
        </p>
      </div>

      {/* Connection Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="font-mono">Connected</span>
        </div>
      </div>
    </header>
  );
};
