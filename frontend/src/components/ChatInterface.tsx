import { Starfield } from "./chat/Starfield";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessage } from "./chat/ChatMessage";
import { TypingIndicator } from "./chat/TypingIndicator";
import { ChatInput } from "./chat/ChatInput";
import { Footer } from "./chat/Footer";
import { useChatLogic } from "../hooks/useChatLogic";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const ChatInterface = () => {
  const {
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
  } = useChatLogic();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-[#040711] overflow-hidden">
        {/* The 3D Environment (Background/Base) - Disabled for now due to rig issues */}
        {/* <NyxScene state={nyxState} /> */}
        
        {/* Starfield on top or within */}
        <Starfield />

        {/* Chat UI Overlay - Centered Premium Interface */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-8">
          {/* Main Chat Container */}
          <div 
            ref={containerRef}
            className="w-full max-w-4xl flex flex-col h-[85vh] bg-[#0a0a1a]/50 backdrop-blur-xl border border-[#9e78ff]/30 rounded-3xl shadow-[0_0_80px_rgba(158,120,255,0.15)] relative overflow-hidden"
          >
            
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#9e78ff]/5 to-transparent pointer-events-none" />

            {/* Header with Enhanced Avatar and Status */}
            <div className="relative z-10">
              <ChatHeader nyxState={nyxState} currentMessage={currentMessage} />
            </div>

        {/* Enhanced Chat Messages Area */}
        <main
          ref={chatWindowRef}
          className="flex-1 p-6 overflow-y-auto space-y-6"
          role="log"
          aria-live="polite"
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* Enhanced Loading Indicator */}
          {nyxState === 'thinking' && <TypingIndicator />}
        </main>

        {/* Enhanced Input Area */}
        <ChatInput
          inputValue={inputValue}
          isLoading={isLoading}
          isTyping={isTyping}
          onInputChange={setInputValue}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
        />

        {/* Footer */}
        <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
