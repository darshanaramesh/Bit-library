import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import { resourceStats } from '../data/resources';

const features = [
  {
    icon: 'shield',
    tone: '',
    title: 'Access Control Matrix',
    text: 'A clear matrix of who can view, download or manage every digital resource — students, faculty, librarians and admins at a glance.',
    to: '/access-control',
    link: 'See the matrix',
  },
  {
    icon: 'seat',
    tone: 'gold',
    title: 'Seat Reservation',
    text: 'Six floors, dedicated male and female areas, and four daily slots. Pick an available seat for tomorrow in a few taps.',
    to: '/reserve',
    link: 'Reserve a seat',
  },
  {
    icon: 'book',
    tone: 'teal',
    title: 'Digital Library',
    text: 'E-books, journals, research papers, question papers and study materials — searchable, filterable and downloadable.',
    to: '/resources',
    link: 'Browse catalogue',
  },
  {
    icon: 'bot',
    tone: 'green',
    title: 'AI Library Assistant',
    text: 'A help desk inside the portal that answers questions about bookings, time slots, study rooms and resources.',
    to: '/assistant',
    link: 'Ask a question',
  },
];

const categories = [
  { name: 'E-Books', count: '5,210 items', icon: 'book' },
  { name: 'Journals', count: '1,860 items', icon: 'file' },
  { name: 'Research Papers', count: '2,270 items', icon: 'chart' },
  { name: 'Question Papers', count: '3,140 items', icon: 'clipboard' },
  { name: 'Study Materials', count: '940 items', icon: 'layers' },
];

const steps = [
  { title: 'Sign in', text: 'Log in with your campus role — student, faculty, librarian or admin.' },
  { title: 'Pick a floor', text: 'Every floor shows a Male Area and a Female Area with live seat states.' },
  { title: 'Choose a slot', text: 'Four daily slots keep the reading hall organised during peak hours.' },
  { title: 'Confirm & study', text: 'Reservations appear under My Bookings and can be cancelled anytime.' },
];

const previewSeats = [
  '', '', 'booked', '', 'selected', '', 'booked', '',
  'booked', '', '', '', '', 'booked', '', '',
  '', '', 'booked', '', '', '', '', 'booked',
  '', 'selected', '', 'booked', '', '', '', '',
];

export default function Home() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <span className="eyebrow">
              <Icon name="sparkles" size={14} />
              Digital Resource & Seat Reservation Portal
            </span>

            <h1 className="hero-title">
              The BIT Central Library, <span className="accent">one dashboard away</span>
            </h1>

            <p className="hero-sub">
              Reserve reading-hall seats, browse thousands of digital resources and understand
              exactly what your role can access — all from a single, modern campus portal.
            </p>

            <div className="hero-cta">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get started
                <Icon name="arrowRight" size={17} />
              </Link>
              <Link to="/reserve" className="btn btn-outline btn-lg">
                <Icon name="seat" size={17} />
                Reserve a seat
              </Link>
            </div>

            <div className="hero-points">
              <span className="hero-point">
                <Icon name="check" size={16} /> 6 floors · 4 daily slots
              </span>
              <span className="hero-point">
                <Icon name="check" size={16} /> 12,480+ digital resources
              </span>
              <span className="hero-point">
                <Icon name="check" size={16} /> Role-based access matrix
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="preview-card">
              <div className="preview-top">
                <div>
                  <div className="preview-title">Second Floor · Male Area</div>
                  <div className="tiny dim">10:40 AM – 12:20 PM</div>
                </div>
                <span className="chip primary">Seat map</span>
              </div>

              <div className="preview-legend mb-12">
                <span>
                  <i className="preview-dot available" /> Available
                </span>
                <span>
                  <i className="preview-dot selected" /> Selected
                </span>
                <span>
                  <i className="preview-dot booked" /> Booked
                </span>
              </div>

              <div className="preview-grid">
                {previewSeats.map((state, i) => (
                  <span key={i} className={`preview-seat ${state}`} />
                ))}
              </div>

              <div className="preview-stats">
                <div className="preview-stat">
                  <b>18</b>
                  <span>Available</span>
                </div>
                <div className="preview-stat">
                  <b>6</b>
                  <span>Booked</span>
                </div>
                <div className="preview-stat">
                  <b>2</b>
                  <span>Disabled</span>
                </div>
              </div>
            </div>

            <div className="float-badge top">
              <span className="icon-tile sm">
                <Icon name="check" size={15} />
              </span>
              Seat confirmed for tomorrow
            </div>

            <div className="float-badge bottom">
              <span className="icon-tile sm success">
                <Icon name="book" size={15} />
              </span>
              3 new question papers added
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Stats ---------------- */}
      <section className="section alt tight">
        <div className="section-inner">
          <div className="stats-band">
            {resourceStats.map((s) => (
              <div className="band-stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
            <div className="band-stat">
              <b>620</b>
              <span>Seats across 6 floors</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">Why this portal</div>
            <h2 className="section-title">Everything the library offers, organised</h2>
            <p className="section-sub">
              Built around the two things students and staff need most: reliable seat reservations
              and controlled access to digital resources.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f) => (
              <div className="feature-card" key={f.title}>
                <div className={`feature-icon ${f.tone}`}>
                  <Icon name={f.icon} size={24} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                <Link to={f.to} className="feature-link">
                  {f.link} <Icon name="arrowRight" size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Categories ---------------- */}
      <section className="section alt">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">Digital library</div>
            <h2 className="section-title">Five collections, one search bar</h2>
            <p className="section-sub">
              Filter by category, open a resource for full details, then view or download it.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((c) => (
              <Link to="/resources" className="category-card" key={c.name}>
                <span className="icon-tile">
                  <Icon name={c.icon} size={20} />
                </span>
                <span>
                  <b>{c.name}</b>
                  <span>{c.count}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div className="section-eyebrow">How it works</div>
            <h2 className="section-title">Reserve a seat in four steps</h2>
            <p className="section-sub">
              Seats can be reserved only for tomorrow, so the reading hall stays predictable
              during peak days.
            </p>
          </div>

          <div className="steps">
            {steps.map((s, i) => (
              <div className="step" key={s.title}>
                <div className="step-num">{i + 1}</div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="section no-top">
        <div className="section-inner">
          <div className="cta-band">
            <h2>Ready to find your seat?</h2>
            <p>
              Create your library account, pick a floor and slot, and your reservation will be
              waiting under My Bookings.
            </p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-accent btn-lg">
                Create free account
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                I already have one
              </Link>
              <span className="cta-fine">Campus sign-in uses your BIT institutional email (@bitsathy.ac.in).</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}