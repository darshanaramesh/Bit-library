import { createContext, useContext, useMemo, useState } from 'react';
import { demoUsers } from '../data/users';

/**
 * AuthContext – DISPLAY-ONLY session mock for the UI prototype.
 *
 * There is no authentication, token or guard here: it simply remembers which
 * demo role is being previewed so the sidebar, topbar and profile pages can
 * show role-appropriate content.
 */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(demoUsers.student);

  const value = useMemo(
    () => ({
      user,
      role: user?.role || 'student',
      /** Demo "sign in": pick a role and continue. */
      loginAs: (role) => setUser(demoUsers[role] || demoUsers.student),
      switchRole: (role) => setUser(demoUsers[role] || demoUsers.student),
      logout: () => setUser(null),
      profile: user || demoUsers.student,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}