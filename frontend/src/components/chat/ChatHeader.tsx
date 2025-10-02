import { NyxAvatar } from "./NyxAvatar";
import type { ChatHeaderProps } from "../../types/chat";

export const ChatHeader = ({ nyxState, currentMessage }: ChatHeaderProps) => {
  return (
    <header className="p-6 flex items-center justify-between border-b border-[#9e78ff]/10">
      <div className="flex items-center gap-4">
        <NyxAvatar state={nyxState} />
        <div>
          <h1 className="text-2xl font-bold text-white font-secondary">
            NYX
          </h1>
          <p className="text-sm text-cyan-400 font-secondary">
            Oracle of the Portfolio
          </p>
          <p className="text-xs text-purple-300 transition-all duration-500 font-mono">
            {currentMessage || "Observing the digital cosmos..."}
          </p>
        </div>
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
