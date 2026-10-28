import { Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ChatWidget from './components/chatbot/ChatWidget';

// Public pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Portal pages – these are now behind the Log in gate
import StudentDashboard from './pages/dashboards/StudentDashboard';
import FacultyDashboard from './pages/dashboards/FacultyDashboard';
import LibrarianDashboard from './pages/dashboards/LibrarianDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import SeatReservation from './pages/SeatReservation';
import SeatMapPage from './pages/SeatMapPage';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import UserManagement from './pages/manage/UserManagement';
import ResourceManagement from './pages/manage/ResourceManagement';
import SeatManagement from './pages/manage/SeatManagement';
import ReservationManagement from './pages/manage/ReservationManagement';
import AccessControl from './pages/AccessControl';

/**
 * Route map for the portal UI.
 *
 * Flow enforced by this build:
 *   Landing (/)
 *     -> Log in page (/login)
 *     -> Library Dashboard (/dashboard/*)
 *     -> Remaining library pages (/reserve, /resources, /assistant, /bookings,
 *        /profile, /settings, /manage/*, /access-control)
 *
 * Remaining library pages are behind DashboardLayout so an unauthenticated
 * user is sent to /login first. In this prototype the "sign in" is the
 * frontend-only @bitsathy.ac.in email check in Login.jsx.
 */
export default function App() {
  return (
    <>
      <Routes>
        {/* Public: only the marketing page, the Log in gate and registration. */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Portal: dashboard + remaining library pages. */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Navigate to="/dashboard/student" replace />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/faculty" element={<FacultyDashboard />} />
          <Route path="/dashboard/librarian" element={<LibrarianDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />

          <Route path="/reserve" element={<SeatReservation />} />
          <Route path="/reserve/seat-map" element={<SeatMapPage />} />
          <Route path="/resources" element={<Navigate to="/dashboard/student" replace />} />
          <Route path="/resources/:id" element={<Navigate to="/dashboard/student" replace />} />
          <Route path="/assistant" element={<Navigate to="/dashboard/student" replace />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/manage/users" element={<UserManagement />} />
          <Route path="/manage/resources" element={<ResourceManagement />} />
          <Route path="/manage/seats" element={<SeatManagement />} />
          <Route path="/manage/reservations" element={<ReservationManagement />} />
          <Route path="/access-control" element={<AccessControl />} />
        </Route>
      </Routes>

      <ChatWidget />
    </>
  );
}