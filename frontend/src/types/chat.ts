export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  github?: string;
  technologies: string[];
  achievement?: string;
}

export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  type?: "text" | "project-carousel";
  projects?: ProjectData[];
}

export type NyxState = "idle" | "thinking" | "speaking";

export interface NyxAvatarProps {
  state: NyxState;
}

export interface StarfieldProps {
  className?: string;
}

export interface ChatMessageProps {
  message: Message;
}

export interface ChatHeaderProps {
  nyxState: NyxState;
  currentMessage: string;
}

export interface ChatInputProps {
  inputValue: string;
  isLoading: boolean;
  isTyping: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}
