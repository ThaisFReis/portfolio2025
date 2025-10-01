import { Starfield } from "./chat/Starfield";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessage } from "./chat/ChatMessage";
import { TypingIndicator } from "./chat/TypingIndicator";
import { ChatInput } from "./chat/ChatInput";
import { useChatLogic } from "../hooks/useChatLogic";

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

  return (
    <>
      {/* Enhanced Starfield Background */}
      <Starfield />

      {/* Main Chat Container */}
      <div className="nyx-chat-interface">
        {/* Header with Enhanced Avatar and Status */}
        <ChatHeader nyxState={nyxState} currentMessage={currentMessage} />

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
      </div>
    </>
  );
};
