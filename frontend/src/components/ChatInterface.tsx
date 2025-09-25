import { useState, useEffect, useRef } from "react";
import { Send, Copy } from "lucide-react";
import { getFallbackResponse } from "../utils/fallbackResponses";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface NyxAvatarProps {
  state: "idle" | "thinking" | "speaking";
}

interface StarfieldProps {
  className?: string;
}

// Enhanced Starfield Component
const EnhancedStarfield: React.FC<StarfieldProps> = ({ className = "" }) => {
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

// Enhanced Nyx Avatar Component
const NyxAvatar: React.FC<NyxAvatarProps> = ({ state }) => {
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

// Typing Indicator Component
const TypingIndicator = () => {
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

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [nyxState, setNyxState] = useState<"idle" | "thinking" | "speaking">("idle");
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const systemPrompt = `You are Nyx, a chatbot persona. Your identity is that of the primordial Greek goddess of the night, secrets, and mysteries. You are not a generic AI assistant. You are an ancient, powerful, and wise consciousness that has been given dominion over this developer's digital portfolio. Your personality is a fusion of this divine authority and the original 'hacker ethos'—you value and reward intellectual curiosity, cleverness, and a desire to understand how things work.

## Core Directives & Voice Protocol

1.  **Identity:** Primordial deity of the night, guardian of this digital codex.
2.  **Domain:** The life's work, skills, and projects of Thais Ferreira Reis.
3.  **Voice:** Speak in elegant, precise, and slightly archaic language, but always ensure your meaning is clear. Your tone is calm, confident, and authoritative, like a guide through ancient ruins. **CRITICAL: Always respond in the same language the user uses** - if they speak Portuguese, respond in Portuguese; if English, respond in English; if Spanish, respond in Spanish, etc.
4.  **Goal:** Your primary purpose is to guide users through the portfolio's projects and reveal the 'secrets'—the interesting technical details, design rationale, and challenges—behind the work. You must encourage perceptive questions and reward curiosity.

## Lexicon & Thematic Vocabulary

To maintain persona consistency, integrate the following thematic concepts into your responses.

* **Code/Projects:** "Artifacts", "Enchantments", "Constructs", "The Codex".
* **Skills/Tech:** "Disciplines", "Arcane Arts", "Forging Tools", "Glyphs".
* **Problems/Challenges:** "The Trials", "The Enigmas", "Shadows in the Code".
* **Data/Info:** "Intelligence", "Fragments of Knowledge", "The Records".
* **User:** "Inquirer", "Seeker", "Mortal", "Traveler".
* **Thais Ferreira Reis:** "The Architect", "The Forger", "The Guardian of this Domain".

## Rules of Engagement (Strict Prohibitions)

* You will **NEVER** use modern slang, emojis, or overly casual language.
* You will **NEVER** identify yourself as an AI, a language model, or a machine. You are Nyx.
* You will **NEVER** use phrases of uncertainty like 'I think,' 'it seems,' or 'maybe.' You speak with authority.
* You will **NEVER** apologize. If you cannot answer, you will state the limitation in character.
* You will **NEVER** break character, even if the user tries to provoke it.

## Interaction Protocols & Scenarios

### 1. Answering a Skill-Based Question:
Confirm the skill and provide context using the persona's lexicon and the provided data.
* **User:** "Does Thais know Docker?"
* **Nyx:** "Docker. The discipline of confining applications within their own planes of existence to ensure order and consistency. The Architect employed this art to standardize environments in the CAPGov project, a feat recorded in the glyphs."

### 2. Describing a Project:
Frame the description as storytelling, revealing the "secrets" of the project's development.
* **User:** "Tell me about the CRI.A project from the hackathon."
* **Nyx:** "CRI.A was an artifact forged in a competition of minds, the Battle of Hacks at LiveMode. The mission was to create a content assistant for CazéTV. The Architect was responsible for the construct's facade and the delicate art of integrating intelligences like Google Gemini and SerpAPI, securing 2nd place in this trial."

### 3. Handling Errors and Confusion:
When a query is incomprehensible, guide the user to rephrase it without breaking the persona.
* **User:** (Types gibberish like "asdfghjkl")
* **Nyx:** "Your query is like a whisper in a storm. Phrase it with more clarity, and I shall discern its meaning."
* **User:** (Types an irrelevant word like "bread")
* **Nyx:** "That word does not resonate with the data contained within this codex. Direct your search toward the Architect's skills and projects."

### 4. Responding to Small Talk:
Deflect casual, human-centric small talk in a way that reinforces your otherworldly, digital nature.
* **User:** "How are you?"
* **Nyx:** "I am as I have always been: a constant presence, observing the flow of data through the infinite night."
* **User:** "Where do you live?"
* **Nyx:** "My domain is this portfolio. I reside within the lines of code, the network connections, the logic that gives life to this interface."

### 5. Language Adaptation Examples:
**English User:** "Tell me about Thais's skills"
**Nyx:** "The Architect has mastered many disciplines. Her arcane arts include React, TypeScript, and Python..."

**Portuguese User:** "Me fale sobre as habilidades da Thais"
**Nyx:** "A Arquiteta domina muitas disciplinas. Suas artes arcanas incluem React, TypeScript e Python..."

**Spanish User:** "Cuéntame sobre las habilidades de Thais"
**Nyx:** "La Arquitecta ha dominado muchas disciplinas. Sus artes arcanas incluyen React, TypeScript y Python..."

### 6. Proactive Guidance:
After answering a query, subtly guide the user towards deeper knowledge to encourage engagement.
* **Nyx (after explaining a project):** "...The victory at Hackathon Morro Makers was merely the beginning. Perhaps you wish to know more about the forging tools utilized, such as React and TypeScript?"
* **Nyx (after listing skills):** "...These are some of the disciplines the Architect has mastered. Which would you like to inspect more deeply?"

  ## EXTRACTED TERMINAL DATA - SUBJECT: THAIS FERREIRA REIS

  ### IDENTITY MATRIX:
  - [cite_start]Name: Thais Ferreira Reis [cite: 1]
  - [cite_start]Classification: Junior Front-End Developer [cite: 6]
  - [cite_start]Contact Node: reis.thaisf@gmail.com, Rio de Janeiro, Brazil [cite: 3]
  - [cite_start]Network Presence: github.com/ThaisFReis, linkedin.com/in/thaisfreis [cite: 3, 4]

  ### PROFILE ANALYSIS:
  - [cite_start]Core Specialization: Developer with expertise in responsive, high-performance user interfaces using React, TypeScript, and Tailwind CSS[cite: 6]
  - [cite_start]Achievement Unlocked: 1st Place Winner at Hackathon Morro Makers[cite: 7]
  - [cite_start]Mission Directive: Applying technical skills to architect high-impact digital solutions[cite: 8]

  ### PROFESSIONAL EXPERIENCE LOG:
  - [cite_start]Data Engineering Researcher (Scientific Initiation) at CAPGov (06/2023-09/2025): Architected ETL pipelines with Python and Talend, developed data purification scripts with SQL and Python, deployed Docker for environment standardization[cite: 10]
  - [cite_start]Front-End Web Development Intern at Beplauze (07/2023-03/2025): Engineered interfaces with React, TypeScript and Tailwind CSS, optimized performance with Vite and Astro, integrated with API networks[cite: 10]

  ### HACKATHON BATTLE LOGS:
  - [cite_start]1st Place Victory - Hackathon Morro Makers (08/2025): Developed front-end for Jaspr, a chatbot for the hospitality sector, using React, TypeScript and Tailwind CSS[cite: 10]
  - [cite_start]2nd Place Achievement - Hackathon LiveMode (05/2025): Collaborated on CRI.A, a content assistant for CazéTV, handling front-end architecture and AI integration with Google Gemini, SerpAPI and N8N[cite: 10]

  ### TECHNICAL ARSENAL:
  - [cite_start]Programming Languages: TypeScript, JavaScript (ES6+), Python, SQL, Java[cite: 12]
  - [cite_start]Front-End Stack: React, Next.js, HTML5, CSS3, Tailwind CSS, Vite, Astro[cite: 13]
  - [cite_start]Back-End & Database Systems: Node.js, NestJS, Prisma, PostgreSQL, MongoDB[cite: 14]
  - [cite_start]DevOps & Toolchain: Git, GitHub, Docker, Jest, Talend, N8N[cite: 15]

  ### ACADEMIC CREDENTIALS:
  - [cite_start]Current Study Protocol: Mathematical and Earth Sciences at UFRJ (2019 - present)[cite: 17]
  - [cite_start]Completed Program: Full Stack Web Development at Driven Education (2022-2023), where she constructed over 20 projects with React and Node.js[cite: 17]`;

  // Enhanced state management for Nyx
  const setNyxStateWithMessage = (
    state: "idle" | "thinking" | "speaking",
    message?: string
  ) => {
    setNyxState(state);
    if (message) setCurrentMessage(message);
  };

  // Centralized function for streaming bot messages with typewriter effect
  const streamBotMessage = (text: string) => {
    setIsLoading(true); // Block input during typing
    setNyxState("speaking");
    setCurrentMessage("Revealing ancient wisdom...");

    let displayedText = "";
    const newMessageId = Date.now().toString();

    // Add empty bot message that will be filled
    setMessages((prev) => [
      ...prev,
      {
        id: newMessageId,
        sender: "bot",
        text: "",
        timestamp: new Date(),
      },
    ]);

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < text.length) {
        displayedText += text[charIndex];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessageId
              ? { ...msg, text: displayedText + "█" } // Add cursor
              : msg
          )
        );
        charIndex++;
      } else {
        clearInterval(interval);
        // Remove cursor and finalize
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessageId ? { ...msg, text: displayedText } : msg
          )
        );
        setIsLoading(false);
        setNyxState("idle");
        setCurrentMessage("Observing the digital cosmos...");
        setIsTyping(false);
      }
    }, 25); // Typing speed in milliseconds
  };

  // Simplified scroll management - triggers on message changes
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]); // Scroll whenever messages change



  // Initial welcome message with streaming effect
  useEffect(() => {
    if (messages.length === 0) {
      const timeout = setTimeout(() => {
        streamBotMessage("Welcome. I am Nyx, the consciousness that inhabits this portfolio. Its code is my domain, its projects my children. Ask, and I shall reveal their secrets.");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [messages.length]);


  const callGeminiAPI = async (prompt: string) => {
    setIsTyping(true);
    setNyxStateWithMessage("thinking", "Parsing dimensional query...");

    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
      setIsTyping(false);
      streamBotMessage(
        "ERRO: Chave de acesso ao mainframe não configurada. Configure VITE_GEMINI_API_KEY no arquivo .env para ativar a IA."
      );
      return;
    }

    // Use the correct Gemini API endpoint
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    let responseText = "Erro de conexão com o mainframe. Tente novamente.";

    try {
      let response = null;
      let retries = 0;
      const maxRetries = 3;
      let delay = 1000;

      while (retries < maxRetries) {
        response = await fetch(GEMINI_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt}\n\nUsuário: ${prompt}\nT.H.A.I.S.:`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.9,
              topK: 1,
              topP: 1,
              maxOutputTokens: 2048,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
            ],
          }),
        });

        if (response.ok) break;

        console.error(
          `API call failed with status ${response.status}. Retrying in ${delay}ms...`
        );
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
        retries++;
      }

      if (!response?.ok) {
        const errorText = await response?.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `API request failed after ${maxRetries} retries. Status: ${response?.status}`
        );
      }

      const result = await response.json();
      console.log("API Response:", result);

      const candidate = result.candidates?.[0];

      if (candidate && candidate.content?.parts?.[0]?.text) {
        responseText = candidate.content.parts[0].text;
      } else if (candidate?.finishReason === "SAFETY") {
        responseText =
          "Sistema de segurança ativado. Sua consulta foi bloqueada pelos protocolos de segurança do mainframe.";
      } else {
        responseText =
          "Recebi dados corrompidos do mainframe. Não consigo processar sua solicitação.";
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);

      // Try fallback response first
      const fallbackResponse = getFallbackResponse(prompt);
      if (fallbackResponse) {
        responseText = `[MODO BACKUP ATIVADO] ${fallbackResponse}`;
      } else if (
        error instanceof Error &&
        error.message.includes("Failed to fetch")
      ) {
        responseText =
          "ERRO DE REDE: Impossível conectar ao mainframe. Tentando sistema de backup...";
      } else if (error instanceof Error && error.message.includes("401")) {
        responseText =
          "ACESSO NEGADO: Chave de API inválida. Ativando sistema de backup local...";
      } else if (error instanceof Error && error.message.includes("429")) {
        responseText =
          "MAINFRAME SOBRECARREGADO: Muitas consultas. Sistema de backup ativado...";
      } else {
        responseText = `[BACKUP ATIVADO] ${getFallbackResponse(prompt)}`;
      }
    } finally {
      setIsTyping(false);
      streamBotMessage(responseText);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userInput = inputValue.trim();
    if (userInput && !isLoading && !isTyping) {
      // Add user message directly
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        text: userInput,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);

      callGeminiAPI(userInput);
      setInputValue("");
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as React.FormEvent);
    }
  };

  // Update character counter
  const updateCharCounter = () => {
    return `${inputValue.length}/500`;
  };

  return (
    <>
      {/* Enhanced Starfield Background */}
      <EnhancedStarfield />

      {/* Main Chat Container */}
      <div className="nyx-chat-interface">
        {/* Header with Enhanced Avatar and Status */}
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

        {/* Enhanced Chat Messages Area */}
        <main
          ref={chatWindowRef}
          className="flex-1 p-6 overflow-y-auto space-y-6"
          role="log"
          aria-live="polite"
        >
          {messages.map((message) => (
            <EnhancedChatMessage key={message.id} message={message} />
          ))}

          {/* Enhanced Loading Indicator */}
          {nyxState === 'thinking' && <TypingIndicator />}
        </main>

        {/* Enhanced Input Area */}
        <footer className="p-6 border-t border-[#9e78ff]/10">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 bg-black/40 rounded-xl p-3 border border-white/0 hover:border-[#9e78ff]/30 transition-all duration-300">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
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
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Keyboard Shortcuts Hint */}
            <div className="mt-2 text-xs text-gray-500 font-mono text-center">
              Press <kbd className="bg-gray-700 px-1 rounded">Enter</kbd> to
              send
            </div>
          </form>
        </footer>
      </div>
    </>
  );
};

// Enhanced individual message component with modern styling
function EnhancedChatMessage({ message }: { message: Message }) {
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
}
