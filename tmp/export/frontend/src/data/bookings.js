/**
 * Mock seat bookings & reservations – demonstration only.
 */

export const myBookings = [
  { id: 'BK-2041', seat: '2F-M-14', floor: 'Second Floor', zone: 'Male Area', date: '29 Oct 2026', day: 'Thursday', slot: '08:45 AM – 10:25 AM', status: 'Confirmed', bookedOn: '26 Oct 2026' },
  { id: 'BK-2039', seat: '1F-F-07', floor: 'First Floor', zone: 'Female Area', date: '29 Oct 2026', day: 'Thursday', slot: '01:30 PM – 03:10 PM', status: 'Confirmed', bookedOn: '25 Oct 2026' },
  { id: 'BK-2036', seat: 'GF-SR-F-03', floor: 'Ground Floor - Study Room', zone: 'Female Area', date: '30 Oct 2026', day: 'Friday', slot: '10:40 AM – 12:20 PM', status: 'Pending', bookedOn: '27 Oct 2026' },
  { id: 'BK-2030', seat: '3F-M-22', floor: 'Third Floor', zone: 'Male Area', date: '31 Oct 2026', day: 'Saturday', slot: '03:25 PM – 04:25 PM', status: 'Confirmed', bookedOn: '27 Oct 2026' },
  { id: 'BK-2024', seat: 'GF-F-11', floor: 'Ground Floor', zone: 'Female Area', date: '24 Oct 2026', day: 'Saturday', slot: '08:45 AM – 10:25 AM', status: 'Completed', bookedOn: '22 Oct 2026' },
  { id: 'BK-2019', seat: '1F-M-05', floor: 'First Floor', zone: 'Male Area', date: '22 Oct 2026', day: 'Thursday', slot: '10:40 AM – 12:20 PM', status: 'Completed', bookedOn: '20 Oct 2026' },
  { id: 'BK-2012', seat: '4F-F-16', floor: 'Fourth Floor', zone: 'Female Area', date: '20 Oct 2026', day: 'Tuesday', slot: '01:30 PM – 03:10 PM', status: 'Cancelled', bookedOn: '18 Oct 2026' },
  { id: 'BK-2007', seat: '2F-F-09', floor: 'Second Floor', zone: 'Female Area', date: '17 Oct 2026', day: 'Friday', slot: '03:25 PM – 04:25 PM', status: 'Completed', bookedOn: '15 Oct 2026' },
];

/** Rows for the Reservation Management table (librarian / admin). */
export const reservationRows = [
  { id: 'RSV-8841', user: 'Ishita Verma', userId: 'BIT/CS/2023/117', floor: 'First Floor', seat: '1F-F-12', zone: 'Female Area', date: '29 Oct 2026', slot: '08:45 AM – 10:25 AM', status: 'Confirmed', checkedIn: 'Yes' },
  { id: 'RSV-8840', user: 'Aarav Sharma', userId: 'BIT/CS/2023/041', floor: 'Second Floor', seat: '2F-M-14', zone: 'Male Area', date: '29 Oct 2026', slot: '08:45 AM – 10:25 AM', status: 'Confirmed', checkedIn: 'No' },
  { id: 'RSV-8838', user: 'Sana Fathima', userId: 'BIT/ME/2022/009', floor: 'Ground Floor - Study Room', seat: 'GF-SR-F-03', zone: 'Female Area', date: '30 Oct 2026', slot: '10:40 AM – 12:20 PM', status: 'Pending', checkedIn: 'No' },
  { id: 'RSV-8835', user: 'Kabir Nair', userId: 'BIT/EC/2024/062', floor: 'Ground Floor', seat: 'GF-M-21', zone: 'Male Area', date: '30 Oct 2026', slot: '01:30 PM – 03:10 PM', status: 'Pending', checkedIn: 'No' },
  { id: 'RSV-8833', user: 'Dr. Meera Iyer', userId: 'BIT/FAC/IT/018', floor: 'Fourth Floor', seat: '4F-F-04', zone: 'Female Area', date: '31 Oct 2026', slot: '08:45 AM – 10:25 AM', status: 'Confirmed', checkedIn: 'No' },
  { id: 'RSV-8830', user: 'Rohan Das', userId: 'BIT/IT/2024/088', floor: 'Third Floor', seat: '3F-M-18', zone: 'Male Area', date: '31 Oct 2026', slot: '03:25 PM – 04:25 PM', status: 'Cancelled', checkedIn: 'No' },
  { id: 'RSV-8827', user: 'Priya Menon', userId: 'BIT/LIB/012', floor: 'First Floor', seat: '1F-F-07', zone: 'Female Area', date: '01 Nov 2026', slot: '10:40 AM – 12:20 PM', status: 'Confirmed', checkedIn: 'No' },
  { id: 'RSV-8824', user: 'Aarav Sharma', userId: 'BIT/CS/2023/041', floor: 'Third Floor', seat: '3F-M-22', zone: 'Male Area', date: '31 Oct 2026', slot: '03:25 PM – 04:25 PM', status: 'Confirmed', checkedIn: 'No' },
  { id: 'RSV-8820', user: 'Ishita Verma', userId: 'BIT/CS/2023/117', floor: 'Second Floor', seat: '2F-F-09', zone: 'Female Area', date: '28 Oct 2026', slot: '01:30 PM – 03:10 PM', status: 'Completed', checkedIn: 'Yes' },
  { id: 'RSV-8816', user: 'Sana Fathima', userId: 'BIT/ME/2022/009', floor: 'Ground Floor', seat: 'GF-F-11', zone: 'Female Area', date: '27 Oct 2026', slot: '08:45 AM – 10:25 AM', status: 'Completed', checkedIn: 'Yes' },
];

/** Occupancy breakdown for dashboards (librarian / admin). */
export const floorOccupancy = [
  { id: 'occ-gf', label: 'Ground Floor', value: '34 / 60', booked: 34, total: 60, percent: 57 },
  { id: 'occ-gsr', label: 'Study Room', value: '26 / 60', booked: 26, total: 60, percent: 43 },
  { id: 'occ-1f', label: 'First Floor', value: '45 / 60', booked: 45, total: 60, percent: 75 },
  { id: 'occ-2f', label: 'Second Floor', value: '58 / 60', booked: 58, total: 60, percent: 97 },
  { id: 'occ-3f', label: 'Third Floor', value: '39 / 60', booked: 39, total: 60, percent: 65 },
  { id: 'occ-4f', label: 'Fourth Floor', value: '21 / 60', booked: 21, total: 60, percent: 35 },
];