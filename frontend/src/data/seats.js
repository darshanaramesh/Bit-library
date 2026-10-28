/**
 * Mock seat map data – floors, zones, time slots and deterministic seat states.
 * UI demonstration only: no availability, overlap or gender validation exists.
 */

export const floors = [
  { id: 'ground', name: 'Ground Floor', code: 'GF', status: 'Open', note: 'General reading hall • Circulation desk nearby' },
  { id: 'ground-study', name: 'Ground Floor - Study Room', code: 'GF-SR', status: 'Open', note: 'Silent zone • Individual cubicles' },
  { id: 'first', name: 'First Floor', code: '1F', status: 'Open', note: 'Journals & periodicals reading area' },
  { id: 'second', name: 'Second Floor', code: '2F', status: 'Busy', note: 'Peak usage • Project discussion friendly' },
  { id: 'third', name: 'Third Floor', code: '3F', status: 'Open', note: 'Postgraduate reading zone' },
  { id: 'fourth', name: 'Fourth Floor', code: '4F', status: 'Partial', note: 'Some seats under maintenance' },
];

export const zones = [
  { id: 'male', label: 'Male Area', short: 'Male' },
  { id: 'female', label: 'Female Area', short: 'Female' },
];

export const timeSlots = [
  { id: 'slot-1', label: '08:45 AM – 10:25 AM', note: 'Morning · 1 hr 40 min' },
  { id: 'slot-2', label: '10:40 AM – 12:20 PM', note: 'Late morning · 1 hr 40 min' },
  { id: 'slot-3', label: '01:30 PM – 03:10 PM', note: 'Afternoon · 1 hr 40 min' },
  { id: 'slot-4', label: '03:25 PM – 04:25 PM', note: 'Evening · 1 hr' },
];

export const seatStates = {
  AVAILABLE: 'available',
  SELECTED: 'selected',
  BOOKED: 'booked',
  DISABLED: 'disabled',
};

const SEATS_PER_ZONE = 30;

/** Tiny deterministic hash so mock states stay stable across renders. */
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function floorOf(floorId) {
  return floors.find((f) => f.id === floorId) || floors[0];
}

/**
 * Returns the demo seat grid for a floor zone.
 * `second / female` is intentionally rendered fully booked so the
 * "all seats booked" UI state can be demonstrated.
 */
export function getSeats(floorId, zoneId) {
  const floor = floorOf(floorId);
  const prefix = zoneId === 'female' ? 'F' : 'M';
  const seats = [];

  for (let i = 1; i <= SEATS_PER_ZONE; i += 1) {
    const seq = String(i).padStart(2, '0');
    const id = `${floor.code}-${prefix}-${seq}`;
    let state;

    if (floorId === 'second' && zoneId === 'female') {
      state = seatStates.BOOKED;
    } else {
      const bucket = hash(`${id}-${floorId}`) % 10;
      if (bucket < 5) state = seatStates.AVAILABLE;
      else if (bucket < 8) state = seatStates.BOOKED;
      else if (bucket === 8) state = seatStates.DISABLED;
      else state = seatStates.AVAILABLE;
    }

    seats.push({ id, label: `${prefix}${seq}`, state });
  }

  return seats;
}

export function zoneSummary(floorId, zoneId) {
  const seats = getSeats(floorId, zoneId);
  return {
    total: seats.length,
    available: seats.filter((s) => s.state === seatStates.AVAILABLE).length,
    booked: seats.filter((s) => s.state === seatStates.BOOKED).length,
    disabled: seats.filter((s) => s.state === seatStates.DISABLED).length,
  };
}

export function floorSummary(floorId) {
  return {
    male: zoneSummary(floorId, 'male'),
    female: zoneSummary(floorId, 'female'),
  };
}

/** Tomorrow's date label – UI copy only ("seats can be reserved only for tomorrow"). */
export function tomorrowLabel() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

/** Sample UI messages shown on the seat map page (no validation logic). */
export const sampleMessages = [
  {
    type: 'success',
    title: 'Seat available',
    text: 'Seat GF-M-12 is available for tomorrow, 29 October · 08:45 AM – 10:25 AM. Select it to continue.',
  },
  {
    type: 'danger',
    title: 'Seat already booked',
    text: 'Sorry, seat 1F-F-07 is already booked for this time slot. Please choose another seat.',
  },
  {
    type: 'warning',
    title: 'All seats booked',
    text: 'All seats are booked on Second Floor (Female Area) for this slot. Please pick another floor, zone or time slot.',
  },
  {
    type: 'info',
    title: 'Overlapping booking not allowed',
    text: 'You already have a booking from 10:40 AM – 12:20 PM. Overlapping bookings are not allowed.',
  },
];

/** Floor/zone inventory rows for Seat Management (librarian). */
export const seatInventory = [
  { id: 'GF-M', floor: 'Ground Floor', zone: 'Male Area', seats: 30, available: 14, booked: 13, disabled: 3, status: 'Active' },
  { id: 'GF-F', floor: 'Ground Floor', zone: 'Female Area', seats: 30, available: 16, booked: 12, disabled: 2, status: 'Active' },
  { id: 'GSR-M', floor: 'Ground Floor - Study Room', zone: 'Male Area', seats: 30, available: 12, booked: 15, disabled: 3, status: 'Active' },
  { id: 'GSR-F', floor: 'Ground Floor - Study Room', zone: 'Female Area', seats: 30, available: 15, booked: 13, disabled: 2, status: 'Active' },
  { id: '1F-M', floor: 'First Floor', zone: 'Male Area', seats: 30, available: 9, booked: 19, disabled: 2, status: 'Active' },
  { id: '1F-F', floor: 'First Floor', zone: 'Female Area', seats: 30, available: 11, booked: 17, disabled: 2, status: 'Active' },
  { id: '2F-M', floor: 'Second Floor', zone: 'Male Area', seats: 30, available: 5, booked: 24, disabled: 1, status: 'Busy' },
  { id: '2F-F', floor: 'Second Floor', zone: 'Female Area', seats: 30, available: 0, booked: 30, disabled: 0, status: 'Full' },
  { id: '3F-M', floor: 'Third Floor', zone: 'Male Area', seats: 30, available: 13, booked: 14, disabled: 3, status: 'Active' },
  { id: '3F-F', floor: 'Third Floor', zone: 'Female Area', seats: 30, available: 14, booked: 13, disabled: 3, status: 'Active' },
  { id: '4F-M', floor: 'Fourth Floor', zone: 'Male Area', seats: 30, available: 17, booked: 9, disabled: 4, status: 'Maintenance' },
  { id: '4F-F', floor: 'Fourth Floor', zone: 'Female Area', seats: 30, available: 18, booked: 8, disabled: 4, status: 'Maintenance' },
];