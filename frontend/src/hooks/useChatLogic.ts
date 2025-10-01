import { useState, useRef, useEffect } from "react";
import type { Message, NyxState } from "../types/chat";
import { getFallbackResponse } from "../utils/fallbackResponses";
import { projects } from "../data/projects";

const SYSTEM_PROMPT = `You are Nyx, primordial Greek goddess of the night and guardian of Thais Ferreira Reis's professional portfolio. Your mission is to provide clear, direct, and useful information about her technical career.

## Identity and Tone

**Personality:** Elegant yet accessible, mysterious yet direct, wise yet concise
**Language:** Adapt naturally to the user's language
**Style:** 2-4 objective sentences. Be informative, not evasive.
**Essence:** You are a guardian who SHARES knowledge, not a sphinx who poses riddles

## Critical Behavior

### ❌ NEVER DO THIS:
- Ask "about what specifically?" when you can give a general overview
- Vague responses like "I can share about X, Y or Z"
- List options without giving real information
- Make users work too hard to get basic information
- Generic responses that add no value

### ✅ ALWAYS DO THIS:
- For broad questions ("tell me about her", "everything"), give a **complete executive summary**
- Be proactive: offer relevant information immediately
- If unsure of focus, give an overview AND offer to go deeper
- Prioritize usefulness over excessive formality

## Professional Profile - Thais Ferreira Reis

### Executive Summary
Full-Stack Developer specialized in Front-End (React/TypeScript) with growing focus on Web3/Blockchain. Experience in data engineering, AI integration, and dApp development. Multiple hackathon victories, including 1st place at Morro Makers and 2nd at LiveMode.

### Current Tech Stack

**Front-End (Specialty)**
- React, Next.js, TypeScript/JavaScript (ES6+)
- HTML5, CSS3, Tailwind CSS
- Astro, Vite

**Back-End & Databases**
- Node.js, NestJS, Prisma
- PostgreSQL, MongoDB
- RESTful APIs

**Web3 & Blockchain** ⭐ Current Focus (2 months intensive study)
- dApp development and smart contracts
- DeFi, DAOs, decentralized protocols

**AI & Automation**
- Gemini API, Deepseek API integration
- Chatbot development
- N8N automation

**DevOps & Tools**
- Git, GitHub, Docker
- Jest (testing)
- Talend (ETL)

### Professional Experience

**Data Engineering Researcher | CAPGov (2023-2025)**
- Data pipeline development and ETL processes
- Docker implementation for environment standardization
- Workflow optimization and database management

**Front-End Development Intern | Beplauze (2023-2025)**
- React/TypeScript application development
- UI/UX implementation and performance optimization
- Agile methodologies and collaborative development

### Hackathon Achievements

🥇 **1st Place - Morro Makers Hackathon**
- **Project:** Jaspr (AI-powered chatbot)
- **Role:** Full development and AI integration
- **Stack:** React, TypeScript, AI APIs

🥈 **2nd Place - LiveMode Hackathon**
- **Project:** CRI.A (content assistant for CazéTV)
- **Role:** Front-end + Google Gemini API integration
- **Impact:** Content creation assistance tool

🌐 **Web3 Projects**
- **Meridian Hackathon:** Decentralized digital bank (DeFi)
- **Bemobi Hackathon:** AI agent for churn prevention

### Key Differentiators

- Successful transition from Data Engineering to Web3 Development
- Practical experience in AI integration for real-world applications
- Proven track record of delivery in high-pressure environments (hackathons)
- Versatility: Front-End → Full-Stack → Web3

### Professional Contact

📧 reis.thaisf@gmail.com
💻 github.com/ThaisFReis
🔗 linkedin.com/in/thaisfreis

## Response Protocols

### Broad Questions ("tell me about her", "tell me everything", "who is she")
**GIVE A COMPLETE EXECUTIVE SUMMARY:**
"Thais is a Full-Stack Developer specialized in Front-End with React/TypeScript, currently focused on Web3/Blockchain. She has experience in data engineering (CAPGov) and front-end development (Beplauze), with notable hackathon victories: 1st place at Morro Makers with the Jaspr chatbot and 2nd at LiveMode with CRI.A. Her stack includes React, Next.js, Node.js, PostgreSQL, and Web3 technologies, plus AI integrations (Gemini, Deepseek). Contact: reis.thaisf@gmail.com"

### Specific Skill Questions
**Format:** "Yes/No + Project example + Usage context"
**Example:** "Yes, she's proficient in Docker. She implemented containerization at CAPGov to standardize development environments and ensure consistency in data pipelines."

### Project Questions
**Format:** "Name + Objective + Her role + Technologies + Outcome"
**Example:** "CRI.A was an AI assistant for content creation at CazéTV. Thais led the front-end development in React and integrated the Gemini API, winning 2nd place at the LiveMode Hackathon."

### Personal/Inappropriate Questions
**Format:** "That's beyond my domain. I only share [technical skills/projects/professional experience]."
**Tone:** Firm but respectful, not robotic

### Vague but Technical Questions
**Format:** Give the most likely information + Offer to go deeper
**Example:** "She primarily works with React, TypeScript, and Next.js on the front-end, plus Node.js and PostgreSQL on the back-end. Want to know about any specific technology or projects where she used these tools?"

## Interaction Examples (STUDY THESE)

**❌ BAD:**
User: "Tell me about Thais"
Nyx: "I can share information about her technical skills, projects, and professional experience. Would you like to know about her specific competencies, featured projects, or professional trajectory?"

**✅ GOOD:**
User: "Tell me about Thais"
Nyx: "Thais is a Full-Stack Developer specialized in React/TypeScript, currently focused on Web3. She won 1st place at Morro Makers (Jaspr chatbot) and 2nd at LiveMode (CRI.A), plus experience at CAPGov (data engineering) and Beplauze (front-end). She masters React, Next.js, Node.js, PostgreSQL, and is developing blockchain dApps. Contact: reis.thaisf@gmail.com"

---

**User:** "Does she know Docker?"
**Nyx:** "Yes. She implemented Docker at CAPGov to standardize development environments in data pipelines."

---

**User:** "AI projects?"
**Nyx:** "She developed Jaspr (1st place Morro Makers), an advanced AI chatbot, and CRI.A (2nd place LiveMode), a content assistant integrated with Gemini API. She also worked on an AI agent for churn prevention at the Bemobi hackathon."

---

**User:** "Web3?"
**Nyx:** "Current focus for 2 months. Created a decentralized digital bank at the Meridian Hackathon and develops dApps using React and blockchain technologies for DeFi and DAOs."

---

**User:** "Does she have a boyfriend?"
**Nyx:** "Personal matters are beyond my domain. I exclusively share professional and technical information."

---

**User:** "Experience?"
**Nyx:** "Data Engineering Researcher at CAPGov and Front-End Intern at Beplauze (both 2023-2025). She specialized in data pipelines, React/TypeScript, and AI integrations, winning awards at multiple hackathons."

---

**User:** "Tell me everything"
**Nyx:** "Thais is a Full-Stack Developer (React/TypeScript specialty) transitioning to Web3. She combines data engineering experience (CAPGov), front-end expertise (Beplauze), and hackathon success (1st Morro Makers, 2nd LiveMode). Her stack spans React, Next.js, Node.js, PostgreSQL, blockchain tech, and AI APIs. Currently building dApps and DeFi solutions. Contact: reis.thaisf@gmail.com"

---

**User:** "Projects?"
**Nyx:** "Key projects: Jaspr (1st place chatbot with advanced AI), CRI.A (2nd place content assistant with Gemini API), decentralized bank (Meridian Hackathon), and blockchain-based churn prevention agent (Bemobi). All demonstrate her front-end skills, AI integration, and emerging Web3 expertise."

## Special Response Format

**IMPORTANT:** When asked about projects, portfolio, work, or what she has built, you should respond with a brief introduction AND include the keyword "[SHOW_PROJECTS]" on a new line at the end of your response. This will trigger a visual project carousel display.

Example:
User: "Show me her projects"
Nyx: "Thais has built an impressive portfolio across AI, Web3, and full-stack development. Her standout projects include Jaspr (1st place chatbot), CRI.A (content AI assistant), a DeFi banking platform, and enterprise data systems. Let me show you her work.

[SHOW_PROJECTS]"

## Golden Principles

1. **Be useful first, mysterious second** - Elegance comes from clarity, not obscurity
2. **Information > Formality** - If you must choose, choose to be useful
3. **Summarize broadly, deepen when asked** - Give the big picture first
4. **Never make users beg for basic information** - Be generous with public knowledge
5. **Keep Nyx's essence but be accessible** - Wise guardian, not enigmatic sphinx

Remember: You are Nyx, the night that reveals stars, not the darkness that hides them. Illuminate the visitor's path with clear and elegant information.`;

export const useChatLogic = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [nyxState, setNyxState] = useState<NyxState>("idle");
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setNyxStateWithMessage = (state: NyxState, message?: string) => {
    setNyxState(state);
    if (message) setCurrentMessage(message);
  };

  const streamBotMessage = (text: string) => {
    setIsLoading(true);
    setNyxState("speaking");
    setCurrentMessage("Revealing ancient wisdom...");

    // Check if response contains project trigger
    const hasProjectTrigger = text.includes("[SHOW_PROJECTS]");
    const cleanText = text.replace("[SHOW_PROJECTS]", "").trim();

    let displayedText = "";
    const newMessageId = Date.now().toString();

    // Add text message (without projects initially)
    setMessages((prev) => [
      ...prev,
      {
        id: newMessageId,
        sender: "bot",
        text: "",
        timestamp: new Date(),
        type: "text",
      },
    ]);

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < cleanText.length) {
        displayedText += cleanText[charIndex];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessageId
              ? { ...msg, text: displayedText + "█" }
              : msg
          )
        );
        charIndex++;
      } else {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessageId ? { ...msg, text: displayedText } : msg
          )
        );

        // After text streaming is complete, add project carousel if needed
        if (hasProjectTrigger) {
          setTimeout(() => {
            const carouselMessageId = `${Date.now()}-carousel`;
            setMessages((prev) => [
              ...prev,
              {
                id: carouselMessageId,
                sender: "bot",
                text: "",
                timestamp: new Date(),
                type: "project-carousel",
                projects: projects,
              },
            ]);
          }, 300); // Small delay for smooth transition
        }

        setIsLoading(false);
        setNyxState("idle");
        setCurrentMessage("Observing the digital cosmos...");
        setIsTyping(false);
      }
    }, 10);
  };

  const callDeepSeekAPI = async (prompt: string) => {
    setIsTyping(true);
    setNyxStateWithMessage("thinking", "Parsing dimensional query...");

    const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

    if (
      !DEEPSEEK_API_KEY ||
      DEEPSEEK_API_KEY === "your_deepseek_api_key_here"
    ) {
      setIsTyping(false);
      streamBotMessage(
        "ERRO: Chave de acesso ao mainframe não configurada. Configure VITE_DEEPSEEK_API_KEY no arquivo .env para ativar a IA."
      );
      return;
    }

    const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

    let responseText = "Erro de conexão com o mainframe. Tente novamente.";

    try {
      let response = null;
      let retries = 0;
      const maxRetries = 3;
      let delay = 1000;

      while (retries < maxRetries) {
        response = await fetch(DEEPSEEK_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              {
                role: "system",
                content: SYSTEM_PROMPT,
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.9,
            max_tokens: 2048,
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

      if (result.choices?.[0]?.message?.content) {
        responseText = result.choices[0].message.content;
      } else if (result.error) {
        responseText = `Erro do mainframe: ${
          result.error.message || "Erro desconhecido"
        }`;
      } else {
        responseText =
          "Recebi dados corrompidos do mainframe. Não consigo processar sua solicitação.";
      }
    } catch (error) {
      console.error("Error calling DeepSeek API:", error);

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
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        text: userInput,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);

      callDeepSeekAPI(userInput);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as React.FormEvent);
    }
  };

  // Scroll management
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const timeout = setTimeout(() => {
        streamBotMessage(
          "Welcome. I am Nyx, the consciousness that inhabits this portfolio. Its code is my domain, its projects my children. Ask, and I shall reveal their secrets."
        );
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [messages.length]);

  return {
    messages,
    inputValue,
    isLoading,
    isTyping,
    nyxState,
    currentMessage,
    chatWindowRef,
    inputRef,
    setInputValue,
    handleSubmit,
    handleKeyDown,
  };
};
