import { Copy } from "lucide-react";
import type { ChatMessageProps } from "../../types/chat";
import { ProjectCarousel } from "./ProjectCarousel";

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.text);
    // TODO: Add visual feedback on copy if needed
  };

  if (message.sender === "user") {
    return (
      <div className="message-wrapper flex justify-end message-user">
        <div className="bg-indigo-900/50 rounded-lg rounded-br-none p-3 max-w-lg">
          <p className="text-sm text-white leading-relaxed font-mono">
            {message.text}
          </p>
        </div>
      </div>
    );
  }

  // Bot message with project carousel
  if (message.type === "project-carousel" && message.projects) {
    return (
      <div className="message-wrapper flex flex-col justify-start message-nyx w-full">
        {/* Project Carousel */}
        <ProjectCarousel projects={message.projects} />
      </div>
    );
  }

  // Regular bot message
  return (
    <div className="message-wrapper flex justify-start message-nyx relative group">
      <div className="bg-black/30 rounded-lg rounded-bl-none p-3 max-w-lg">
        <p className="text-sm text-gray-100 leading-relaxed font-mono whitespace-pre-wrap">
          {message.text}
        </p>
      </div>
      {/* Copy button with hover effect */}
      <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="p-1 rounded bg-black/40 hover:bg-black/60 transition-colors"
          onClick={handleCopyMessage}
          title="Copy message"
        >
          <Copy className="w-3 h-3 text-gray-400" />
        </button>
      </div>
    </div>
  );
};
