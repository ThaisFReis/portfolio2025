import { Copy } from "lucide-react";
import type { ChatMessageProps } from "../../types/chat";
import { ProjectCarousel } from "./ProjectCarousel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.text);
    // TODO: Add visual feedback on copy if needed
  };

  // Custom components for markdown rendering
  const markdownComponents: Components = {
    p: ({ children }) => (
      <p className="mb-2 last:mb-0 text-sm leading-relaxed">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-purple-300">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-cyan-300">{children}</em>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-purple-400 hover:text-purple-300 underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    code: ({ node, className, children, ...props }) => {
      const isInline = !className?.includes('language-');
      return isInline ? (
        <code className="bg-purple-900/30 text-purple-300 px-1.5 py-0.5 rounded font-mono text-xs" {...props}>
          {children}
        </code>
      ) : (
        <code className="block bg-black/50 p-3 rounded font-mono text-xs overflow-x-auto my-2" {...props}>
          {children}
        </code>
      );
    },
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-sm text-gray-100">{children}</li>
    ),
    h1: ({ children }) => (
      <h1 className="text-lg font-bold text-purple-300 mb-2 mt-3 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-base font-bold text-purple-300 mb-2 mt-3 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-bold text-purple-300 mb-2 mt-2 first:mt-0">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-purple-500 pl-3 italic text-gray-300 my-2">
        {children}
      </blockquote>
    ),
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
        <div className="text-gray-100 font-mono markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {message.text}
          </ReactMarkdown>
        </div>
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
