import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import { useChat } from '../../hooks/useChat';

/**
 * ChatWidget – floating "BIT Library Assistant" launcher.
 * Hidden on the dedicated assistant page (the page shows the full panel).
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const chat = useChat();

  if (location.pathname.startsWith('/assistant')) return null;

  if (open) return <ChatWindow chat={chat} onClose={() => setOpen(false)} />;

  return (
    <button
      type="button"
      className="chat-fab"
      onClick={() => setOpen(true)}
      aria-label="Open BIT Library Assistant"
    >
      <span className="fab-dot" />
      <span className="fab-label">BIT Library Assistant</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="8" width="16" height="12" rx="3" />
        <path d="M12 8V4" />
        <circle cx="12" cy="3" r="1" />
        <path d="M9 13h.01M15 13h.01" />
      </svg>
    </button>
  );
}