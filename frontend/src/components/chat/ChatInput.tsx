import { PaperPlaneRight } from "@phosphor-icons/react";
import type { ChatInputProps } from "../../types/chat";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const ChatInput = ({
  inputValue,
  isLoading,
  isTyping,
  onInputChange,
  onSubmit,
  onKeyDown,
  inputRef,
}: ChatInputProps) => {
  const updateCharCounter = () => {
    return `${inputValue.length}/500`;
  };

  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.6 }
      );
    }
  }, []);

  return (
    <footer ref={footerRef} className="p-6 border-t border-[#9e78ff]/10">
      <form onSubmit={onSubmit}>
        <div className="flex items-center gap-3 bg-black/60 rounded-xl p-3 border border-[#9e78ff]/20 hover:border-[#9e78ff]/50 focus-within:border-cyan-400/50 focus-within:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Inquire the secrets of this digital realm..."
            className="flex-1 bg-transparent focus:outline-none placeholder:text-gray-500 text-gray-100 font-mono text-sm nyx-input"
            disabled={isLoading || isTyping}
            maxLength={500}
            aria-label="Chat input"
          />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-mono">
              {updateCharCounter()}
            </span>
            <button
              type="submit"
              className="send-button disabled:opacity-50 disabled:cursor-not-allowed
              text-[#9e78ff] hover:text-cyan-500 transition-colors duration-300 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[--accent-purple]
              "
              disabled={isLoading || isTyping || !inputValue.trim()}
              aria-label="Send message"
            >
              <PaperPlaneRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="mt-2 text-xs text-gray-500 font-mono text-center">
          Press <kbd className="bg-gray-700 px-1 rounded">Enter</kbd> to send
        </div>
      </form>
    </footer>
  );
};
