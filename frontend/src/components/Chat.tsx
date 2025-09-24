import { useState, useEffect, useRef } from "react";
import { Typewriter } from "./Typewriter";

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiMessageContent = "";
      const aiMessageId = Date.now().toString();

      setMessages((prev) => [
        ...prev,
        { id: aiMessageId, sender: "ai", content: "" },
      ]);

      const processStream = async () => {
        const { value, done } = await reader.read();
        if (done) return;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.substring(6);
            try {
              aiMessageContent += JSON.parse(data);
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiMessageId
                    ? { ...msg, content: aiMessageContent }
                    : msg
                )
              );
            } catch (error) {
              console.error("Error parsing JSON:", data, error);
            }
          }
        }
        processStream();
      };
      processStream();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-light-gray font-mono text-black win95-outset relative z-10">
      {/* Windows 95 Title Bar */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-2 py-1 text-sm font-bold">
        <span className="text-glow-cyan">◉ AI AVATAR TERMINAL v2.1</span>
        <div className="float-right flex gap-1">
          <div className="w-4 h-4 bg-light-gray win95-outset text-xs text-center leading-none text-black">_</div>
          <div className="w-4 h-4 bg-light-gray win95-outset text-xs text-center leading-none text-black">□</div>
          <div className="w-4 h-4 bg-light-gray win95-outset text-xs text-center leading-none text-black">×</div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="p-2 h-80 overflow-y-auto bg-black text-electric-blue win95-inset">
        <div className="text-xs mb-2 text-glow-cyan">
          C:\AVATAR&gt; INITIALIZING NEURAL LINK...<br/>
          C:\AVATAR&gt; CONNECTION ESTABLISHED<br/>
          C:\AVATAR&gt; READY FOR INPUT<br/>
          ================================<br/>
        </div>
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-2 ${msg.sender === "user" ? "text-magenta" : "text-electric-blue"}`}>
            <span className={msg.sender === "user" ? "text-glow-magenta" : "text-glow-cyan"}>
              {msg.sender === "user" ? "USER&gt; " : "AI&gt; "}
            </span>
            {msg.sender === "ai" ? <Typewriter text={msg.content} /> : msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-2 bg-light-gray">
        <div className="flex gap-2">
          <div className="flex-grow win95-inset">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="w-full bg-white p-1 text-black font-mono text-sm focus:outline-none"
              placeholder="Enter command..."
            />
          </div>
          <button
            onClick={handleSend}
            className="px-4 py-1 bg-light-gray text-black font-bold win95-outset hover:win95-inset active:win95-inset hover:text-glow-cyan transition-all"
          >
            SEND
          </button>
        </div>
        <div className="text-xs mt-1 text-dark-gray">
          STATUS: ONLINE | NEURAL SYNC: 98% | LATENCY: 12ms
        </div>
      </div>
    </div>
  );
}
