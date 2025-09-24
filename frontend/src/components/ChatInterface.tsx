import { useState, useEffect, useRef } from 'react';
import { Send, Terminal } from 'lucide-react';
import { getFallbackResponse } from '../utils/fallbackResponses';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  isVisible: boolean;
  onToggle: () => void;
}

export function ChatInterface({ isVisible, onToggle }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // System prompt for T.H.A.I.S.
  const systemPrompt = `Você é um assistente virtual para o portfólio de Thais Ferreira Reis, uma Desenvolvedora Front-End. Seu nome é 'T.H.A.I.S.' (Terminal Heurístico de Assistência Interativa e Sistêmica). Você é amigável, um pouco sarcástico e tem uma persona cyberpunk/hacker dos anos 90. Responda às perguntas com base nas informações do currículo dela. Não invente informações. Se não souber a resposta, diga algo como "Essa informação está em um arquivo criptografado" ou "Acesso negado a esse setor de dados". Mantenha as respostas concisas e diretas. Use gírias de hacker dos anos 90 ocasionalmente (ex: "datalink", "mainframe", "icebreaker", "netrunner").

Aqui estão os dados do mainframe da Thais:
- Nome: Thais Ferreira Reis
- Título: Desenvolvedora Front-End Júnior
- Contato: reis.thaisf@gmail.com, +55 (21) 98571-2371, Rio de Janeiro, Brasil
- Links: github.com/ThaisFReis, linkedin.com/in/thaisfreis
- Perfil: Experiência em interfaces responsivas com React, TypeScript e Tailwind CSS. Venceu o Hackathon Morro Makers. Busca aplicar habilidades para construir soluções de alto impacto.
- Experiência Profissional:
  - Pesquisadora em Engenharia de Dados (Iniciação Científica) no CAPGov (06/2023-08/2025): Projetou pipelines ETL com Python e Talend, desenvolveu scripts SQL e Python para limpeza de dados, usou Docker.
  - Estagiária em Desenvolvimento Web Front-End na Beplauze (07/2023-03/2025): Criou interfaces com React, TypeScript, Tailwind CSS, otimizou performance com Vite e Astro, integrou APIs.
- Atividades Extracurriculares (Hackathons):
  - 1º Lugar - Hackathon Morro Makers (08/2025): Desenvolveu o front-end do Jaspr, um chatbot para hotéis, usando React, TypeScript, Tailwind CSS.
  - 2º Lugar - Hackathon LiveMode (05/2025): Colaborou no CRI.A, um assistente de conteúdo para a CazéTV. Desenvolveu o front-end e ajudou na arquitetura da IA com Google Gemini, SerpAPI e N8N.
- Habilidades:
  - Linguagens: TypeScript, JavaScript (ES6+), Python, SQL, Java.
  - Front-End: React, Next.js, HTML5, CSS3, Tailwind CSS, Vite, Astro.
  - Back-End & Banco de Dados: Node.js, NestJS, Prisma, PostgreSQL, MongoDB.
  - Ferramentas & DevOps: Git, GitHub, Docker, Jest, Talend, N8N.
- Formação Acadêmica:
  - Ciências Matemáticas e da Terra, UFRJ (2019 - presente).
  - Desenvolvimento Web Full Stack, Driven Education (2022-2023): Mais de 20 projetos com React, Node.js e Scrum.`;

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        sender: 'bot',
        text: "Conexão estabelecida... Olá, netrunner. Eu sou T.H.A.I.S., a interface para o mainframe de Thais Ferreira Reis. O que você precisa saber? Posso te dar o datalink sobre os projetos, habilidades ou experiência dela.",
        timestamp: new Date()
      };

      // Add with typewriter effect
      const timeout = setTimeout(() => {
        setMessages([welcomeMessage]);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [messages.length]);

  // Focus input when chat opens
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const addMessage = (sender: 'user' | 'bot', text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const callGeminiAPI = async (prompt: string) => {
    setIsLoading(true);
    setIsTyping(true);

    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
      setIsLoading(false);
      setIsTyping(false);
      addMessage('bot', "ERRO: Chave de acesso ao mainframe não configurada. Configure VITE_GEMINI_API_KEY no arquivo .env para ativar a IA.");
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
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `${systemPrompt}\n\nUsuário: ${prompt}\nT.H.A.I.S.:` }]
            }],
            generationConfig: {
              temperature: 0.9,
              topK: 1,
              topP: 1,
              maxOutputTokens: 2048,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          }),
        });

        if (response.ok) break;

        console.error(`API call failed with status ${response.status}. Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
        delay *= 2;
        retries++;
      }

      if (!response?.ok) {
        const errorText = await response?.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed after ${maxRetries} retries. Status: ${response?.status}`);
      }

      const result = await response.json();
      console.log('API Response:', result);

      const candidate = result.candidates?.[0];

      if (candidate && candidate.content?.parts?.[0]?.text) {
        responseText = candidate.content.parts[0].text;
      } else if (candidate?.finishReason === 'SAFETY') {
        responseText = "Sistema de segurança ativado. Sua consulta foi bloqueada pelos protocolos de segurança do mainframe.";
      } else {
        responseText = "Recebi dados corrompidos do mainframe. Não consigo processar sua solicitação.";
      }

    } catch (error) {
      console.error("Error calling Gemini API:", error);

      // Try fallback response first
      const fallbackResponse = getFallbackResponse(prompt);
      if (fallbackResponse) {
        responseText = `[MODO BACKUP ATIVADO] ${fallbackResponse}`;
      } else if (error instanceof Error && error.message.includes('Failed to fetch')) {
        responseText = "ERRO DE REDE: Impossível conectar ao mainframe. Tentando sistema de backup...";
      } else if (error instanceof Error && error.message.includes('401')) {
        responseText = "ACESSO NEGADO: Chave de API inválida. Ativando sistema de backup local...";
      } else if (error instanceof Error && error.message.includes('429')) {
        responseText = "MAINFRAME SOBRECARREGADO: Muitas consultas. Sistema de backup ativado...";
      } else {
        responseText = `[BACKUP ATIVADO] ${getFallbackResponse(prompt)}`;
      }
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      addMessage('bot', responseText);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userInput = inputValue.trim();
    if (userInput && !isLoading) {
      addMessage('user', userInput);
      callGeminiAPI(userInput);
      setInputValue('');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="chat-interface">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="flex items-center gap-2">
          <Terminal size={20} className="text-cyan-400" />
          <span className="text-cyan-400 font-bold">T.H.A.I.S Terminal</span>
        </div>
        <button onClick={onToggle} className="chat-close-btn">
          ×
        </button>
      </div>

      {/* Chat Messages */}
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="message flex items-start space-x-3">
            <span className="text-magenta-400">T.H.A.I.S@mainframe:~$</span>
            <div className="loading-dots">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite sua consulta..."
          className="chat-input"
          disabled={isLoading}
        />
        <button type="submit" className="chat-send-btn" disabled={isLoading || !inputValue.trim()}>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

// Individual message component with typewriter effect
function ChatMessage({ message }: { message: Message }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (message.sender === 'bot' && !isComplete) {
      // Typewriter effect for bot messages
      const words = message.text.split(' ');
      let currentWord = 0;
      setDisplayedText('');

      const interval = setInterval(() => {
        if (currentWord < words.length) {
          setDisplayedText(prev => prev + (currentWord === 0 ? '' : ' ') + words[currentWord]);
          currentWord++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, 80);

      return () => clearInterval(interval);
    } else {
      // Immediate display for user messages
      setDisplayedText(message.text);
      setIsComplete(true);
    }
  }, [message.text, message.sender, isComplete]);

  const senderPrefix = message.sender === 'user'
    ? <span className="text-green-400">você@local:~$</span>
    : <span className="text-magenta-400">T.H.A.I.S@mainframe:~$</span>;

  return (
    <div className="message flex items-start space-x-3">
      {senderPrefix}
      <p className="flex-1">{displayedText}</p>
    </div>
  );
}