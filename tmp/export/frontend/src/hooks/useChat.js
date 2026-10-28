import { useEffect, useRef, useState } from 'react';
import { getMockReply, initialGreeting } from '../data/chat';

/**
 * useChat – message state for the mock library assistant.
 * Used by the floating widget and the dedicated assistant page.
 */
export function useChat() {
  const [messages, setMessages] = useState([initialGreeting]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text) return;

    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { role: 'user', text, time: stamp }]);
    setInput('');
    setTyping(true);

    timerRef.current = setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: getMockReply(text), time: stamp }]);
      setTyping(false);
    }, 700);
  };

  return { messages, input, setInput, typing, send };
}