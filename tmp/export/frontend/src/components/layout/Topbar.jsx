import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../ui/Icon';
import { IconButton } from '../ui/Button';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';
import { roleOptions } from '../../data/users';

/** Path segment → breadcrumb label. */
const sectionLabels = {
  dashboard: 'Dashboard',
  reserve: 'Seat Reservation',
  bookings: 'My Bookings',
  profile: 'Profile',
  settings: 'Settings',
  manage: 'Management',
  'access-control': 'Access Control',
};

/**
 * Topbar – branding, page title + breadcrumb, demo role switcher,
 * notifications and the logged-in user chip.
 */
export default function Topbar({ title, onMenu }) {
  const { user, profile, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const section = sectionLabels[location.pathname.split('/')[1]] || '';
  const crumb = `BIT Central Library${section ? ` / ${section}` : ''}`;

  const handleRoleChange = (role) => {
    switchRole(role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button type="button" className="icon-btn menu-btn" onClick={onMenu} aria-label="Open menu">
          <Icon name="menu" size={19} />
        </button>
        <Link to="/" className="topbar-brand" aria-label="BIT Central Library home">
          <span className="logo-mark gold">
            <Icon name="library" size={17} />
          </span>
          <span className="topbar-brand-name">BIT Central Library</span>
        </Link>
        <div>
          <div className="topbar-title">{title}</div>
          <div className="topbar-crumb">{crumb}</div>
        </div>
      </div>

      <div className="topbar-right">
        <div className="role-switcher hide-mobile">
          <span className="rs-label">Preview role</span>
          <select
            value={profile.role}
            onChange={(e) => handleRoleChange(e.target.value)}
            aria-label="Preview portal as role"
          >
            {roleOptions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <IconButton icon="bell" label="Notifications" badge />

        {user ? (
          <>
            <button
              type="button"
              className="user-chip"
              onClick={() => navigate('/profile')}
              aria-label="Open profile"
            >
              <Avatar name={profile.name} initials={profile.initials} size="sm" />
              <span className="who">
                <span className="name">{profile.name}</span>
                <span className="role">{profile.roleLabel}</span>
              </span>
            </button>
            <IconButton icon="logout" label="Sign out" onClick={logout} className="hide-mobile" />
          </>
        ) : (
          <button type="button" className="btn btn-primary btn-sm" onClick={() => navigate('/login')}>
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}