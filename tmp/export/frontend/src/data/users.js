/**
 * Mock user data – demonstration only. No authentication is implemented.
 */

export const demoUsers = {
  student: {
    name: 'Aarav Sharma',
    initials: 'AS',
    role: 'student',
    roleLabel: 'Student',
    userId: 'BIT/CS/2023/041',
    department: 'B.Tech Computer Science & Engineering',
    year: '3rd Year',
    email: 'aarav.sharma@bit.ac.in',
    phone: '+91 98765 43210',
    joined: '12 Aug 2023',
    bloodGroup: 'O+',
    libraryId: 'LIB-2023-0041',
  },
  faculty: {
    name: 'Dr. Meera Iyer',
    initials: 'MI',
    role: 'faculty',
    roleLabel: 'Faculty',
    userId: 'BIT/FAC/IT/018',
    department: 'Information Technology',
    year: 'Associate Professor',
    email: 'meera.iyer@bit.ac.in',
    phone: '+91 98450 11223',
    joined: '05 Jul 2018',
    bloodGroup: 'B+',
    libraryId: 'LIB-2018-0018',
  },
  librarian: {
    name: 'Rajesh Kumar',
    initials: 'RK',
    role: 'librarian',
    roleLabel: 'Librarian',
    userId: 'BIT/LIB/007',
    department: 'Central Library',
    year: 'Senior Librarian',
    email: 'rajesh.kumar@bit.ac.in',
    phone: '+91 99000 55667',
    joined: '18 Feb 2015',
    bloodGroup: 'A+',
    libraryId: 'LIB-2015-0007',
  },
  admin: {
    name: 'Dr. S. Raghavan',
    initials: 'SR',
    role: 'admin',
    roleLabel: 'Administrator',
    userId: 'BIT/ADM/001',
    department: 'Library Administration',
    year: 'Director – IT & Library Services',
    email: 's.raghavan@bit.ac.in',
    phone: '+91 98800 22334',
    joined: '01 Jan 2012',
    bloodGroup: 'AB+',
    libraryId: 'LIB-2012-0001',
  },
};

export const roleOptions = [
  { value: 'student', label: 'Student', icon: 'user', desc: 'Reserve seats & borrow resources' },
  { value: 'faculty', label: 'Faculty', icon: 'book', desc: 'Department access & approvals' },
  { value: 'librarian', label: 'Librarian', icon: 'library', desc: 'Operations & inventory' },
  { value: 'admin', label: 'Admin', icon: 'shield', desc: 'Users, roles & permissions' },
];

/** Rows for the User Management table (mock). */
export const userRows = [
  { id: 'BIT/CS/2023/041', name: 'Aarav Sharma', email: 'aarav.sharma@bit.ac.in', role: 'Student', department: 'CSE', status: 'Active', joined: '12 Aug 2023', reservations: 12 },
  { id: 'BIT/CS/2023/117', name: 'Ishita Verma', email: 'ishita.verma@bit.ac.in', role: 'Student', department: 'CSE', status: 'Active', joined: '12 Aug 2023', reservations: 8 },
  { id: 'BIT/EC/2024/062', name: 'Kabir Nair', email: 'kabir.nair@bit.ac.in', role: 'Student', department: 'ECE', status: 'Pending', joined: '04 Sep 2024', reservations: 2 },
  { id: 'BIT/ME/2022/009', name: 'Sana Fathima', email: 'sana.fathima@bit.ac.in', role: 'Student', department: 'Mechanical', status: 'Active', joined: '19 Jul 2022', reservations: 21 },
  { id: 'BIT/IT/2024/088', name: 'Rohan Das', email: 'rohan.das@bit.ac.in', role: 'Student', department: 'IT', status: 'Suspended', joined: '04 Sep 2024', reservations: 0 },
  { id: 'BIT/FAC/IT/018', name: 'Dr. Meera Iyer', email: 'meera.iyer@bit.ac.in', role: 'Faculty', department: 'IT', status: 'Active', joined: '05 Jul 2018', reservations: 6 },
  { id: 'BIT/FAC/CSE/024', name: 'Dr. Arun Prakash', email: 'arun.prakash@bit.ac.in', role: 'Faculty', department: 'CSE', status: 'Active', joined: '11 Jan 2016', reservations: 4 },
  { id: 'BIT/LIB/007', name: 'Rajesh Kumar', email: 'rajesh.kumar@bit.ac.in', role: 'Librarian', department: 'Central Library', status: 'Active', joined: '18 Feb 2015', reservations: 3 },
  { id: 'BIT/LIB/012', name: 'Priya Menon', email: 'priya.menon@bit.ac.in', role: 'Librarian', department: 'Central Library', status: 'Active', joined: '23 Mar 2019', reservations: 1 },
  { id: 'BIT/ADM/001', name: 'Dr. S. Raghavan', email: 's.raghavan@bit.ac.in', role: 'Admin', department: 'Administration', status: 'Active', joined: '01 Jan 2012', reservations: 0 },
];
