/**
 * Mock dashboard content per role – statistics, panels and quick actions.
 */

import { myBookings, reservationRows, floorOccupancy } from './bookings';
import { resources } from './resources';
import { userRows } from './users';

export const dashboards = {
  student: {
    greeting: 'Welcome back, Aarav',
    subtitle: 'Your study activity, bookings and recommended reading at a glance.',
    stats: [
      {
        label: 'Digital Resources',
        value: '12,480',
        icon: 'book',
        tone: '',
        trend: '+37 added this month',
      },
      {
        label: 'Available Seats',
        value: '163',
        icon: 'seat',
        tone: 'info',
        trend: 'Tomorrow · 6 floors',
      },
      {
        label: "Tomorrow's Booking",
        value: '2F-M-14',
        icon: 'calendar',
        tone: 'accent',
        trend: '08:45 AM – 10:25 AM',
      },
      {
        label: 'My Reservations',
        value: '12',
        icon: 'clipboard',
        tone: 'success',
        trend: '4 upcoming · 8 completed',
      },
      {
        label: 'Library Assistant',
        value: 'Online',
        icon: 'bot',
        tone: '',
        trend: 'Slots, floors & resources',
      },
    ],
    quickActions: [
      { label: 'Reserve a Seat', hint: 'Book for tomorrow', icon: 'seat', to: '/reserve' },
      { label: 'Browse Resources', hint: '12,480 items', icon: 'book', to: '/resources' },
      { label: 'My Bookings', hint: 'Manage reservations', icon: 'calendar', to: '/bookings' },
      { label: 'Ask Assistant', hint: 'Instant help', icon: 'bot', to: '/assistant' },
    ],
    chart: {
      title: 'Study hours this week',
      unit: 'h',
      bars: [
        { label: 'Mon', value: 3.5 },
        { label: 'Tue', value: 4 },
        { label: 'Wed', value: 2.5 },
        { label: 'Thu', value: 5 },
        { label: 'Fri', value: 4.5 },
        { label: 'Sat', value: 6 },
        { label: 'Sun', value: 3 },
      ],
    },
    announcements: [
      {
        title: 'Exam week extended hours',
        body: 'The reading hall will stay open until 08:00 PM from 03–14 November.',
        when: '2 hours ago',
        tag: 'Notice',
      },
      {
        title: 'New CSE question papers added',
        body: 'End-semester papers for 8 subjects are now available in Question Papers.',
        when: 'Yesterday',
        tag: 'Resources',
      },
      {
        title: 'Third Floor maintenance',
        body: 'Row C seats on the Third Floor will be unavailable this Saturday morning.',
        when: '2 days ago',
        tag: 'Seats',
      },
    ],
  },

  faculty: {
    greeting: 'Good morning, Dr. Meera',
    subtitle: 'Department access, resource requests and your library schedule.',
    stats: [
      { label: 'Pending Access Requests', value: '5', icon: 'shield', tone: 'warning', trend: '2 new today' },
      { label: 'Resources Shared', value: '9', icon: 'book', tone: '', trend: '+2 this semester' },
      { label: 'Seat Bookings', value: '6', icon: 'seat', tone: 'info', trend: 'Next: Thu 10:40 AM' },
      { label: 'Department Downloads', value: '312', icon: 'download', tone: 'success', trend: '+38 this week' },
    ],
    quickActions: [
      { label: 'Review Requests', hint: '5 awaiting approval', icon: 'clipboard', to: '/access-control' },
      { label: 'Reserve a Seat', hint: 'Faculty lounge slots', icon: 'seat', to: '/reserve' },
      { label: 'Share Resource', hint: 'Upload study material', icon: 'upload', to: '/manage/resources' },
      { label: 'Ask Assistant', hint: 'Instant help', icon: 'bot', to: '/assistant' },
    ],
    chart: {
      title: 'Department downloads by week',
      unit: '',
      bars: [
        { label: 'W1', value: 42 },
        { label: 'W2', value: 58 },
        { label: 'W3', value: 51 },
        { label: 'W4', value: 73 },
        { label: 'W5', value: 66 },
        { label: 'W6', value: 84 },
        { label: 'W7', value: 79 },
      ],
    },
    announcements: [
      {
        title: 'Faculty reservation quota increased',
        body: 'IT and CSE faculty may now hold two concurrent seat bookings.',
        when: 'Today',
        tag: 'Policy',
      },
      {
        title: 'Copyright guidance for uploads',
        body: 'Only self-authored or licensed material may be published to students.',
        when: '3 days ago',
        tag: 'Notice',
      },
    ],
  },

  librarian: {
    greeting: 'Library operations overview',
    subtitle: 'Today’s reservations, occupancy and inventory across all floors.',
    stats: [
      { label: 'Reservations Today', value: '148', icon: 'calendar', tone: '', trend: '+12 vs yesterday' },
      { label: 'Seats Occupied', value: '76%', icon: 'seat', tone: 'info', trend: 'Peak 10:40 AM' },
      { label: 'Resources Added', value: '37', icon: 'book', tone: 'success', trend: 'This month' },
      { label: 'Pending Approvals', value: '6', icon: 'clipboard', tone: 'warning', trend: 'Needs attention' },
    ],
    quickActions: [
      { label: 'Reservations', hint: 'Approve / check-in', icon: 'calendar', to: '/manage/reservations' },
      { label: 'Seat Inventory', hint: 'Floors & zones', icon: 'seat', to: '/manage/seats' },
      { label: 'Add Resource', hint: 'Catalogue entry', icon: 'plus', to: '/manage/resources' },
      { label: 'User Records', hint: '4,820 members', icon: 'users', to: '/manage/users' },
    ],
    chart: {
      title: 'Reservations per day',
      unit: '',
      bars: [
        { label: 'Mon', value: 132 },
        { label: 'Tue', value: 145 },
        { label: 'Wed', value: 121 },
        { label: 'Thu', value: 158 },
        { label: 'Fri', value: 149 },
        { label: 'Sat', value: 96 },
        { label: 'Sun', value: 42 },
      ],
      gold: true,
    },
    occupancy: floorOccupancy,
    reservations: reservationRows.slice(0, 5),
    announcements: [
      {
        title: 'Second Floor at 97% occupancy',
        body: 'Consider directing walk-ins to Ground Floor and Fourth Floor.',
        when: '10 minutes ago',
        tag: 'Alert',
      },
      {
        title: 'Weekly inventory audit',
        body: 'Fourth Floor seat block C is flagged for maintenance this week.',
        when: 'Yesterday',
        tag: 'Maintenance',
      },
    ],
  },

  admin: {
    greeting: 'System overview',
    subtitle: 'Platform usage, access governance and membership health.',
    stats: [
      { label: 'Total Users', value: '4,820', icon: 'users', tone: '', trend: '+124 this semester' },
      { label: 'Total Resources', value: '12,480', icon: 'library', tone: 'info', trend: '+37 this month' },
      { label: 'Reservations Today', value: '148', icon: 'calendar', tone: 'accent', trend: '76% occupancy' },
      { label: 'System Health', value: '99.9%', icon: 'shield', tone: 'success', trend: 'All services online' },
    ],
    quickActions: [
      { label: 'User Management', hint: 'Roles & status', icon: 'users', to: '/manage/users' },
      { label: 'Access Control', hint: 'Permission matrix', icon: 'shield', to: '/access-control' },
      { label: 'Reservations', hint: 'Full audit view', icon: 'calendar', to: '/manage/reservations' },
      { label: 'Platform Settings', hint: 'Policy & security', icon: 'settings', to: '/settings' },
    ],
    chart: {
      title: 'New registrations by month',
      unit: '',
      bars: [
        { label: 'May', value: 64 },
        { label: 'Jun', value: 41 },
        { label: 'Jul', value: 88 },
        { label: 'Aug', value: 210 },
        { label: 'Sep', value: 186 },
        { label: 'Oct', value: 124 },
      ],
      gold: true,
    },
    roleSplit: [
      { label: 'Students', percent: 88, value: '4,242' },
      { label: 'Faculty', percent: 8, value: '386' },
      { label: 'Librarians', percent: 2, value: '96' },
      { label: 'Administrators', percent: 2, value: '96' },
    ],
    activity: [
      { text: '<b>Priya Menon</b> approved 6 reservations on Second Floor', time: '12 minutes ago', icon: 'check' },
      { text: '<b>System</b> flagged 4 overlapping booking attempts', time: '40 minutes ago', icon: 'alert' },
      { text: '<b>Dr. Arun Prakash</b> published “Research Methodology Handbook”', time: '2 hours ago', icon: 'upload' },
      { text: '<b>Admin</b> revoked download access for role “Guest”', time: 'Yesterday, 06:12 PM', icon: 'shield' },
      { text: '<b>42 new students</b> imported from the SIS roster', time: 'Yesterday, 09:30 AM', icon: 'users' },
    ],
    announcements: [
      {
        title: 'Scheduled maintenance',
        body: 'Reservation services will be briefly unavailable on 02 Nov, 02:00–02:30 AM.',
        when: 'Today',
        tag: 'System',
      },
      {
        title: 'Quarterly access review due',
        body: 'Department heads must re-confirm role permissions by 10 November.',
        when: '2 days ago',
        tag: 'Compliance',
      },
    ],
  },
};

export const recentResources = resources.slice(0, 4);
export const recentBookings = myBookings.slice(0, 4);
export const recentUsers = userRows.slice(0, 5);