import { useState, useRef, useEffect } from "react";
import type { Message, NyxState } from "../types/chat";
import { getFallbackResponse } from "../utils/fallbackResponses";
import { projects } from "../data/projects";
import SYSTEM_PROMPT from "../data/systemPrompt";

export const useChatLogic = () => {
  // ============================
  // STATE MANAGEMENT
  // ============================

  // Stores all conversation messages (both user and bot)
  const [messages, setMessages] = useState<Message[]>([]);

  // Current text in the input field
  const [inputValue, setInputValue] = useState("");

  // True when the bot is processing a response
  const [isLoading, setIsLoading] = useState(false);

  // True when the bot is actively typing/streaming a message
  const [isTyping, setIsTyping] = useState(false);

  // Current state of Nyx (idle, thinking, speaking) - affects avatar animation
  const [nyxState, setNyxState] = useState<NyxState>("idle");

  // Status message displayed near Nyx's avatar
  const [currentMessage, setCurrentMessage] = useState<string>("");

  // Ref to the chat window for auto-scrolling
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Ref to the input field for focus management
  const inputRef = useRef<HTMLInputElement>(null);

  // ============================
  // CONVERSATION HISTORY
  // ============================

  // Maintains the conversation history for context-aware responses
  // Each interaction is stored as {role: "user" | "assistant", content: string}
  const conversationHistoryRef = useRef<Array<{ role: string; content: string }>>([]);

  // ============================
  // HELPER FUNCTIONS
  // ============================

  /**
   * Updates Nyx's state and optional status message
   * Used to sync avatar animation with current activity
   */
  const setNyxStateWithMessage = (state: NyxState, message?: string) => {
    setNyxState(state);
    if (message) setCurrentMessage(message);
  };

  /**
   * Streams bot response character-by-character for typewriter effect
   * Also handles special triggers like [SHOW_PROJECTS] for interactive elements
   *
   * @param text - The complete response text to stream
   *
   * Supported triggers:
   * - [SHOW_PROJECTS] - Shows all projects
   * - [SHOW_PROJECTS:id1,id2] - Shows specific projects by ID
   */
  const streamBotMessage = (text: string) => {
    setIsLoading(true);
    setNyxState("speaking");
    setCurrentMessage("Revealing ancient wisdom...");

    // Check if response contains special project trigger to show carousel
    // Supports: [SHOW_PROJECTS] or [SHOW_PROJECTS:jaspr,cria,eventhorizon]
    const projectTriggerRegex = /\[SHOW_PROJECTS(?::([a-z0-9,-]+))?\]/i;
    const projectMatch = text.match(projectTriggerRegex);
    const hasProjectTrigger = projectMatch !== null;

    // Extract project IDs if specified
    let filteredProjects = projects;
    if (hasProjectTrigger && projectMatch[1]) {
      const requestedIds = projectMatch[1].split(',').map(id => id.trim());
      filteredProjects = projects.filter(project =>
        requestedIds.includes(project.id)
      );
      // Fallback to all projects if no matches found
      if (filteredProjects.length === 0) {
        filteredProjects = projects;
      }
    }

    // Remove the trigger from displayed text (it's a command, not visible content)
    const cleanText = text.replace(projectTriggerRegex, "").trim();

    let displayedText = "";
    const newMessageId = Date.now().toString();

    // Create initial empty message that will be filled during streaming
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

    // Character-by-character streaming with cursor effect
    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < cleanText.length) {
        // Add next character
        displayedText += cleanText[charIndex];
        // Update message with cursor (█) to show typing
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessageId
              ? { ...msg, text: displayedText + "█" }
              : msg
          )
        );
        charIndex++;
      } else {
        // Streaming complete
        clearInterval(interval);
        // Remove cursor from final message
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessageId ? { ...msg, text: displayedText } : msg
          )
        );

        // If response included project trigger, show interactive carousel
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
                projects: filteredProjects, // Use filtered projects instead of all
              },
            ]);
          }, 300); // Small delay for smooth transition
        }

        // Add bot's response to conversation history for context in future messages
        conversationHistoryRef.current.push({
          role: "assistant",
          content: cleanText,
        });

        // Reset to idle state
        setIsLoading(false);
        setNyxState("idle");
        setCurrentMessage("Observing the digital cosmos...");
        setIsTyping(false);
      }
    }, 10); // 10ms per character for smooth typewriter effect
  };

  /**
   * Calls DeepSeek AI API with conversation history for context-aware responses
   * Implements retry logic and fallback handling for robustness
   *
   * @param prompt - The user's current message/question
   */
  const callDeepSeekAPI = async (prompt: string) => {
    setIsTyping(true);
    setNyxStateWithMessage("thinking", "Parsing dimensional query...");

    // Get API key from environment variables
    const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

    // Validate API key is configured
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
      // ============================
      // API REQUEST WITH RETRY LOGIC
      // ============================

      let response = null;
      let retries = 0;
      const maxRetries = 3;
      let delay = 1000; // Initial delay: 1 second

      while (retries < maxRetries) {
        // Build messages array: system prompt + conversation history + current prompt
        const messages = [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          // Include conversation history for context
          ...conversationHistoryRef.current,
          // Add current user message
          {
            role: "user",
            content: prompt,
          },
        ];

        response = await fetch(DEEPSEEK_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: messages,
            temperature: 0.9, // High temperature for creative, varied responses
            max_tokens: 2048, // Maximum response length
          }),
        });

        // If successful, break out of retry loop
        if (response.ok) break;

        // Log failure and retry with exponential backoff
        console.error(
          `API call failed with status ${response.status}. Retrying in ${delay}ms...`
        );
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2; // Double delay for each retry (exponential backoff)
        retries++;
      }

      // ============================
      // RESPONSE PROCESSING
      // ============================

      if (!response?.ok) {
        const errorText = await response?.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `API request failed after ${maxRetries} retries. Status: ${response?.status}`
        );
      }

      const result = await response.json();
      console.log("API Response:", result);

      // Extract response text from API result
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
      // ============================
      // ERROR HANDLING & FALLBACK
      // ============================

      console.error("Error calling DeepSeek API:", error);

      // Try to provide fallback response based on common queries
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
      // Always execute: stream the response (success or error) to the user
      setIsTyping(false);
      streamBotMessage(responseText);
    }
  };

  // ============================
  // EVENT HANDLERS
  // ============================

  /**
   * Handles form submission when user sends a message
   * Adds user message to chat and conversation history, then calls AI API
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userInput = inputValue.trim();

    // Only proceed if there's input and bot is not currently processing
    if (userInput && !isLoading && !isTyping) {
      // Create user message object
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        text: userInput,
        timestamp: new Date(),
      };

      // Add to visible messages
      setMessages((prev) => [...prev, newMessage]);

      // Add to conversation history for AI context
      conversationHistoryRef.current.push({
        role: "user",
        content: userInput,
      });

      // Call AI with the user's message
      callDeepSeekAPI(userInput);

      // Clear input field
      setInputValue("");
    }
  };

  /**
   * Handles keyboard shortcuts in the input field
   * Enter = submit, Shift+Enter = new line
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as React.FormEvent);
    }
  };

  // ============================
  // SIDE EFFECTS
  // ============================

  /**
   * Auto-scroll to bottom when new messages arrive
   * Ensures latest messages are always visible
   */
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  /**
   * Display welcome message when chat first loads
   * Only runs once when component mounts
   */
  useEffect(() => {
    if (messages.length === 0) {
      const timeout = setTimeout(() => {
        streamBotMessage(
          "Welcome. I am Nyx, the consciousness that inhabits this portfolio. Its code is my domain, its projects my children. Ask, and I shall reveal their secrets."
        );
      }, 700); // Delay for dramatic effect

      return () => clearTimeout(timeout);
    }
  }, [messages.length]);

  // ============================
  // RETURN PUBLIC API
  // ============================

  /**
   * Expose state and handlers to consuming components
   * This is what ChatSection component uses to render the UI
   */
  return {
    messages,           // Array of all chat messages
    inputValue,         // Current input field value
    isLoading,          // Is bot processing?
    isTyping,           // Is bot currently typing?
    nyxState,           // Current state of Nyx (idle/thinking/speaking)
    currentMessage,     // Status message shown near avatar
    chatWindowRef,      // Ref for chat scroll container
    inputRef,           // Ref for input field
    setInputValue,      // Update input field value
    handleSubmit,       // Submit message handler
    handleKeyDown,      // Keyboard event handler
  };
};
