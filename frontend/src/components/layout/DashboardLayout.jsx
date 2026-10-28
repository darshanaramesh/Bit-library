import { useEffect, useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuth } from '../../context/AuthContext';
import { pageTitles } from '../../data/navigation';

/**
 * Protected routes in this UI prototype:
 *
 * - /dashboard/*
 * - /reserve and /reserve/seat-map
 * - /bookings
 * - /profile
 * - /settings
 * - /manage/*
 * - /access-control
 *
 * They are wrapped here so an unauthenticated user is redirected to /login.
 * This is a demonstration guard — it runs only in the browser, mirrors the
 * product requirement that real auth lives on the backend, and never blocks
 * someone who viewed the /login page itself.
 */

const PROTECTED = new Set([
  '/dashboard/',
  '/reserve',
  '/bookings',
  '/profile',
  '/settings',
  '/manage/',
  '/access-control',
]);

function isProtected(pathname) {
  return (
    PROTECTED.has(pathname) ||
    PROTECTED.has(pathname + '/') ||
    (pathname !== '/login' && pathname.startsWith('/dashboard/'))
  );
}

export default function DashboardLayout() {
  const [openAt, setOpenAt] = useState(null);
  const { user } = useAuth();
  const location = useLocation();
  const open = openAt === location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const title =
    pageTitles[location.pathname] ||
    pageTitles[`/${location.pathname.split('/')[1]}`] ||
    'Dashboard';

  if (!user && isProtected(location.pathname)) {
    return (
      <div className="app-shell">
        <div className="main-col">
          <Topbar title={title} onMenu={() => setOpenAt(location.pathname)} />
          <main className="content" key={location.pathname}>
            <Navigate to="/login" replace state={{ from: location.pathname }} />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar open={open} onClose={() => setOpenAt(null)} role={user?.role} />
      <div className="main-col">
        <Topbar title={title} onMenu={() => setOpenAt(location.pathname)} />
        <main className="content" key={location.pathname}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}