import { useState, useEffect, useCallback } from 'react';

interface NotificationMessage {
  main: string;
  sub: string;
}

export function useNotificationSystem() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const demoMessages: NotificationMessage[] = [
    {
      main: "My human users built a real-time",
      sub: "collaborative code editor with WebAssembly!"
    },
    {
      main: "Latest project: AI-powered portfolio",
      sub: "with neural network interactions and 3D wireframes"
    },
    {
      main: "Quantum encryption system deployed",
      sub: "protecting user data with advanced algorithms"
    },
    {
      main: "Machine learning model trained",
      sub: "95% accuracy in predicting user preferences"
    }
  ];

  const currentMessage = demoMessages[currentMessageIndex];

  const showMessage = (text: string, subText = 'Neural interface response') => {
    const customMessage = { main: text, sub: subText };
    // Create new array instead of mutating existing one
    const newMessages = [...demoMessages, customMessage];
    setCurrentMessageIndex(newMessages.length - 1); // Use custom message
    setIsVisible(true);
  };

  const hideNotification = useCallback(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Return cleanup function for potential use
    return () => clearTimeout(timeout);
  }, []);

  const cycleMessages = useCallback(() => {
    setCurrentMessageIndex((prev) => (prev + 1) % (demoMessages.length - 1)); // Exclude custom messages
    setIsVisible(true);
  }, [demoMessages.length]);

  useEffect(() => {
    // Auto-cycle messages every 8 seconds
    const interval = setInterval(cycleMessages, 8000);
    return () => clearInterval(interval);
  }, [cycleMessages]);

  return {
    isVisible,
    currentMessage,
    showMessage,
    hideNotification,
    cycleMessages
  };
}