import { NavLink } from 'react-router-dom';
import Icon from '../ui/Icon';
import { navByRole } from '../../data/navigation';

/** Sidebar – role-aware navigation for the portal area. */
export default function Sidebar({ open, onClose, role }) {
  const sections = navByRole[role] || navByRole.student;

  return (
    <>
      {open ? <div className="sidebar-overlay" onClick={onClose} /> : null}

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <span className="logo-mark gold">
            <Icon name="library" size={20} />
          </span>
          <div>
            <div className="brand-name">BIT Central Library</div>
            <div className="brand-sub">Access & Reservations</div>
          </div>
          <button type="button" className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <Icon name="x" size={18} />
          </button>
        </div>

        <nav>
          {sections.map((group) => (
            <div key={group.section}>
              <div className="nav-section-title">{group.section}</div>
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                  {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-foot">
          <div className="sidebar-card">
            <h5>Library hours</h5>
            <p>
              Mon–Sat · 08:30 AM – 06:00 PM
              <br />
              Reading hall until 08:00 PM (weekdays)
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}