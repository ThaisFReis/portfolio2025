import { MessageSquare } from 'lucide-react';

interface ChatToggleProps {
  onClick: () => void;
}

export function ChatToggle({ onClick }: ChatToggleProps) {
  return (
    <button onClick={onClick} className="chat-toggle-btn" title="Chat com T.H.A.I.S.">
      <MessageSquare size={24} />
    </button>
  );
}