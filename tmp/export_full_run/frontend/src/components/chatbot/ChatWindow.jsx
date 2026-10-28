import { useEffect, useRef } from 'react';
import Icon from '../ui/Icon';
import Avatar from '../ui/Avatar';
import { suggestedQuestions } from '../../data/chat';

/**
 * ChatWindow – the BIT Library Assistant conversation panel.
 * Presentational: conversation state comes from the useChat hook so the
 * floating widget and the assistant page can both drive it. Mock replies only.
 */
export default function ChatWindow({ chat, page = false, onClose }) {
  const { messages, input, setInput, typing, send } = chat;
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <section className={`chat-panel ${page ? 'static' : ''}`} aria-label="BIT Library Assistant">
      <header className="chat-header">
        <Avatar name="BIT Library Assistant" initials="AI" />
        <div className="who">
          <b>BIT Library Assistant</b>
          <span className="status">
            <i /> Online · demo responses
          </span>
        </div>
        <div className="actions">
          {onClose ? (
            <button type="button" onClick={onClose} aria-label="Close assistant">
              <Icon name="x" size={17} />
            </button>
          ) : null}
        </div>
      </header>

      <div className="chat-messages thin-scroll" ref={listRef}>
        {messages.map((m, i) => (
          <div key={`${m.role}-${i}`} className={`msg ${m.role}`}>
            {m.text}
            <span className="time">{m.time}</span>
          </div>
        ))}

        {typing ? (
          <div className="msg bot">
            <span className="typing">
              <i />
              <i />
              <i />
            </span>
          </div>
        ) : null}
      </div>

      <div className="chat-suggestions">
        {suggestedQuestions.map((q) => (
          <button key={q} type="button" className="suggestion-chip" onClick={() => send(q)}>
            {q}
          </button>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask about seats, slots, resources…"
          aria-label="Message the library assistant"
        />
        <button
          type="button"
          className="chat-send"
          onClick={() => send()}
          disabled={!input.trim()}
          aria-label="Send message"
        >
          <Icon name="send" size={18} />
        </button>
      </div>
    </section>
  );
}