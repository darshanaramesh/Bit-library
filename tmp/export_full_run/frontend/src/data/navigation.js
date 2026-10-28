/**
 * Navigation configuration – role-based sidebar items and page titles.
 */

export const navByRole = {
  student: [
    {
      section: 'Overview',
      items: [{ label: 'Dashboard', path: '/dashboard/student', icon: 'home' }],
    },
    {
      section: 'Library',
      items: [
        { label: 'Digital Resources', path: '/resources', icon: 'book' },
        { label: 'Seat Reservation', path: '/reserve', icon: 'seat' },
        { label: 'My Bookings', path: '/bookings', icon: 'calendar', badge: '4' },
        { label: 'AI Library Assistant', path: '/assistant', icon: 'bot' },
      ],
    },
    {
      section: 'Account',
      items: [
        { label: 'Profile', path: '/profile', icon: 'user' },
        { label: 'Settings', path: '/settings', icon: 'settings' },
      ],
    },
  ],
  faculty: [
    {
      section: 'Overview',
      items: [{ label: 'Dashboard', path: '/dashboard/faculty', icon: 'home' }],
    },
    {
      section: 'Library',
      items: [
        { label: 'Digital Resources', path: '/resources', icon: 'book' },
        { label: 'Seat Reservation', path: '/reserve', icon: 'seat' },
        { label: 'My Bookings', path: '/bookings', icon: 'calendar', badge: '2' },
        { label: 'AI Library Assistant', path: '/assistant', icon: 'bot' },
      ],
    },
    {
      section: 'Account',
      items: [
        { label: 'Profile', path: '/profile', icon: 'user' },
        { label: 'Settings', path: '/settings', icon: 'settings' },
      ],
    },
  ],
  librarian: [
    {
      section: 'Overview',
      items: [{ label: 'Dashboard', path: '/dashboard/librarian', icon: 'home' }],
    },
    {
      section: 'Operations',
      items: [
        { label: 'Reservations', path: '/manage/reservations', icon: 'calendar', badge: '6' },
        { label: 'Seat Management', path: '/manage/seats', icon: 'seat' },
        { label: 'Resource Management', path: '/manage/resources', icon: 'book' },
        { label: 'Users', path: '/manage/users', icon: 'users' },
      ],
    },
    {
      section: 'Services',
      items: [
        { label: 'Digital Resources', path: '/resources', icon: 'library' },
        { label: 'AI Library Assistant', path: '/assistant', icon: 'bot' },
      ],
    },
    {
      section: 'Account',
      items: [
        { label: 'Profile', path: '/profile', icon: 'user' },
        { label: 'Settings', path: '/settings', icon: 'settings' },
      ],
    },
  ],
  admin: [
    {
      section: 'Overview',
      items: [{ label: 'Dashboard', path: '/dashboard/admin', icon: 'home' }],
    },
    {
      section: 'Administration',
      items: [
        { label: 'User Management', path: '/manage/users', icon: 'users' },
        { label: 'Resource Management', path: '/manage/resources', icon: 'book' },
        { label: 'Seat Management', path: '/manage/seats', icon: 'seat' },
        { label: 'Reservation Management', path: '/manage/reservations', icon: 'calendar' },
        { label: 'Access Control', path: '/access-control', icon: 'shield', badge: 'NEW' },
      ],
    },
    {
      section: 'System',
      items: [
        { label: 'Digital Resources', path: '/resources', icon: 'library' },
        { label: 'Settings', path: '/settings', icon: 'settings' },
        { label: 'Profile', path: '/profile', icon: 'user' },
      ],
    },
  ],
};

export const publicNavLinks = [
  { label: 'Home', path: '/' },
  { label: 'Digital Resources', path: '/resources' },
  { label: 'Seat Reservation', path: '/reserve' },
  { label: 'AI Assistant', path: '/assistant' },
];

/** Route path → topbar / browser title. */
export const pageTitles = {
  '/dashboard/student': 'Student Dashboard',
  '/dashboard/faculty': 'Faculty Dashboard',
  '/dashboard/librarian': 'Librarian Dashboard',
  '/dashboard/admin': 'Admin Dashboard',
  '/bookings': 'My Bookings',
  '/profile': 'My Profile',
  '/settings': 'Settings',
  '/manage/users': 'User Management',
  '/manage/resources': 'Resource Management',
  '/manage/seats': 'Seat Management',
  '/manage/reservations': 'Reservation Management',
  '/access-control': 'Access Control Matrix',
  '/reserve': 'Seat Reservation',
  '/reserve/seat-map': 'Seat Map',
  '/resources': 'Digital Resources',
  '/assistant': 'AI Library Assistant',
};