export const TypingIndicator = () => {
  return (
    <div className="message-wrapper flex justify-start message-nyx">
      <div className="bg-black/40 border border-[#9e78ff]/10 rounded-lg rounded-bl-sm p-4 max-w-lg shadow-lg backdrop-blur-sm">
        <div className="typing-indicator flex items-center gap-2">
          <span className="text-sm text-gray-400 font-mono">
            Nyx is contemplating
          </span>
          <div className="flex gap-1">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
