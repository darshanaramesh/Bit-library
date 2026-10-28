import { useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import Icon from '../ui/Icon';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';
import { publicNavLinks } from '../../data/navigation';

function Brand() {
  return (
    <Link to="/" className="public-brand">
      <span className="logo-mark gold">
        <Icon name="library" size={20} />
      </span>
      <span>
        <span className="brand-name">BIT Central Library</span>
        <span className="brand-sub">Access & Seat Reservation</span>
      </span>
    </Link>
  );
}

/** PublicLayout – marketing navbar, page outlet and footer. */
export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, profile } = useAuth();
  const location = useLocation();

  const isSame = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <div>
      <header className="public-nav">
        <div className="public-nav-inner">
          <Brand />

          <nav className="nav-links">
            {publicNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `nav-link-public ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            {user ? (
              <Link to={`/dashboard/${profile.role}`} className="btn btn-primary btn-sm nav-collapse">
                <Icon name="grid" size={16} />
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm nav-collapse">
                  Log in
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm nav-collapse">
                  Register
                </Link>
              </>
            )}

            {user ? (
              <Link to="/profile" className="user-chip nav-collapse" aria-label="Open profile">
                <Avatar name={profile.name} initials={profile.initials} size="sm" />
                <span className="who">
                  <span className="name">{profile.name}</span>
                  <span className="role">{profile.roleLabel}</span>
                </span>
              </Link>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm nav-collapse">
                Log in
              </Link>
            )}

            <button
              type="button"
              className="icon-btn public-menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
            >
              <Icon name={menuOpen ? 'x' : 'menu'} size={19} />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="public-menu">
            {publicNavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`nav-link-public ${isSame(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to={user ? `/dashboard/${profile.role}` : '/login'}
              onClick={() => setMenuOpen(false)}
              className="nav-link-public"
            >
              {user ? 'Dashboard' : 'Log in'}
            </NavLink>
            {!user ? (
              <NavLink to="/register" onClick={() => setMenuOpen(false)} className="nav-link-public">
                Register
              </NavLink>
            ) : null}
          </div>
        ) : null}
      </header>

      <main className="public-main" key={location.pathname}>
        <Outlet />
      </main>

      <footer className="public-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="public-brand">
              <span className="logo-mark gold">
                <Icon name="library" size={20} />
              </span>
              <span className="brand-name">BIT Central Library</span>
            </div>
            <p className="footer-about">
              Digital resource access control and seat reservation for the BIT campus — a single
              portal for books, journals, question papers and reading-hall seats.
            </p>
          </div>

          <div className="footer-col">
            <h5>Explore</h5>
            <ul>
              <li>
                <Link to="/resources">Digital Resources</Link>
              </li>
              <li>
                <Link to="/reserve">Seat Reservation</Link>
              </li>
              <li>
                <Link to="/assistant">AI Library Assistant</Link>
              </li>
              <li>
                <Link to="/bookings">My Bookings</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li>
                <Link to="/resources">E-Books & Journals</Link>
              </li>
              <li>
                <Link to="/resources">Question Papers</Link>
              </li>
              <li>
                <Link to="/reserve">Study Room</Link>
              </li>
              <li>
                <Link to="/profile">Membership</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Library</h5>
            <ul>
              <li>
                <Link to="/">About us</Link>
              </li>
              <li>
                <Link to="/login">Help & support</Link>
              </li>
              <li>
                <Link to="/settings">Privacy policy</Link>
              </li>
              <li>
                <Link to="/access-control">Access policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 BIT Central Library. All rights reserved.</span>
          <span>Reading Hall · Mon–Sat · 08:30 AM – 06:00 PM</span>
        </div>
      </footer>
    </div>
  );
}