import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import ChatWindow from '../components/chatbot/ChatWindow';
import { useChat } from '../hooks/useChat';
import { suggestedQuestions } from '../data/chat';

const capabilities = [
  { icon: 'seat', title: 'Seat reservations', text: 'How booking, floors and gender areas work' },
  { icon: 'clock', title: 'Time slots', text: 'The four daily slots and their timings' },
  { icon: 'pin', title: 'Library locations', text: 'Study rooms, circulation desk and floors' },
  { icon: 'book', title: 'Digital resources', text: 'Searching, viewing and downloading items' },
];

const rules = [
  'Seats can be reserved only for tomorrow.',
  'One seat per person per time slot — no overlapping bookings.',
  'Cancelled seats return to the available pool immediately.',
  'Restricted resources follow the access control matrix.',
];

export default function Assistant() {
  const chat = useChat();

  return (
    <div className="public-container public-page">
      <div className="page-header">
        <div>
          <span className="section-eyebrow">Always on help</span>
          <h1 className="page-title mt-8">
            AI Library Assistant
          </h1>
          <p className="page-sub">
            Ask about bookings, time slots, study rooms or digital resources. Responses in this
            prototype are pre-written mock answers.
          </p>
        </div>
        <span className="chip gold">
          <Icon name="sparkles" size={14} />
          Demo mode
        </span>
      </div>

      <div className="assistant-grid">
        <ChatWindow chat={chat} page />

        <div className="assistant-side">
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Suggested questions</h3>
                <p className="card-sub">Tap one to send it instantly</p>
              </div>
            </div>
            {suggestedQuestions.map((q) => (
              <button key={q} type="button" className="quick-q" onClick={() => chat.send(q)}>
                <span className="flex items-center gap-8">
                  <Icon name="chevronRight" size={15} />
                  {q}
                </span>
                <Icon name="send" size={15} />
              </button>
            ))}
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">What it can help with</h3>
              </div>
            </div>
            <div className="list">
              {capabilities.map((c) => (
                <div className="list-item" key={c.title}>
                  <span className="main">
                    <span className="icon-tile">
                      <Icon name={c.icon} size={17} />
                    </span>
                    <span>
                      <span className="title">{c.title}</span>
                      <span className="sub">{c.text}</span>
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Good to know</h3>
                <p className="card-sub">Library rules the assistant follows</p>
              </div>
            </div>
            <ul className="list">
              {rules.map((r) => (
                <li className="list-item" key={r}>
                  <span className="main">
                    <span className="icon-tile success">
                      <Icon name="check" size={16} />
                    </span>
                    <span>
                      <span className="title">{r}</span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="card-footer flex between items-center gap-12 wrap">
              <span className="small muted">Need a person instead?</span>
              <Link to="/bookings" className="btn btn-outline btn-sm">
                Visit the help desk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}