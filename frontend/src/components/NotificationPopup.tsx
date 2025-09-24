import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export interface NotificationMessage {
  main: string;
  sub: string;
}

interface NotificationPopupProps {
  isVisible: boolean;
  message: NotificationMessage;
  onClose: () => void;
}

export function NotificationPopup({ isVisible, message, onClose }: NotificationPopupProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`notification-popup ${isAnimating ? 'notification-appear' : ''}`}
      id="notificationPopup"
    >
      <div className="notification-header">
        <div className="notification-avatar">👤</div>
        <div className="notification-title">Tell me about your most complex projects</div>
        <button className="notification-close" onClick={onClose}>
          <X size={16} />
        </button>
      </div>
      <div className="notification-content">
        <div className="banana-icon">🍌</div>
        <div className="notification-text">
          <div className="notification-main">{message.main}</div>
          <div className="notification-sub">{message.sub}</div>
        </div>
      </div>
    </div>
  );
}