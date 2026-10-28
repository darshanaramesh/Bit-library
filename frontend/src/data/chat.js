/**
 * Mock AI Library Assistant – suggested questions and canned replies.
 * No AI service is connected; replies are static UI demonstration data.
 */

export const suggestedQuestions = [
  'How do I book a seat?',
  'What are the available time slots?',
  'Where is the study room?',
  'How can I access digital resources?',
];

const rules = [
  {
    keys: ['book a seat', 'reserve a seat', 'how to book', 'book seat', 'reservation'],
    reply:
      'Reserving a seat takes five quick steps:\n\n1. Open Seat Reservation from the menu.\n2. Pick a floor — each floor shows a Male Area and a Female Area.\n3. Choose one of the four time slots.\n4. Tap an available seat on the seat map (green = available).\n5. Confirm — the booking appears under My Bookings.\n\nReminder: seats can be reserved only for tomorrow.',
  },
  {
    keys: ['time slot', 'slots', 'timing', 'schedule'],
    reply:
      'These are the four daily slots:\n\n• 08:45 AM – 10:25 AM\n• 10:40 AM – 12:20 PM\n• 01:30 PM – 03:10 PM\n• 03:25 PM – 04:25 PM\n\nEach seat is reserved for exactly one slot, and overlapping bookings are not allowed.',
  },
  {
    keys: ['study room', 'where is', 'location', 'silent'],
    reply:
      'The Study Room is on the Ground Floor, opposite the circulation desk. It has individual cubicles, a silent-zone policy and 30 seats split between the Male Area and Female Area. Select "Ground Floor - Study Room" on the reservation page to view it.',
  },
  {
    keys: ['digital resource', 'e-book', 'ebook', 'journal', 'download', 'access resource'],
    reply:
      'Open Digital Resources from the menu, then search or filter by category — E-Books, Journals, Research Papers, Question Papers or Study Materials.\n\n• Open Access items can be viewed or downloaded immediately.\n• Restricted items require an eligible library role.\n\nEvery resource shows a View and a Download button on its details page.',
  },
  {
    keys: ['hours', 'open', 'timing of library', 'library timing'],
    reply:
      'The Central Library is open Monday to Saturday, 08:30 AM to 06:00 PM. The reading hall closes at 08:00 PM on weekdays during examination weeks.',
  },
  {
    keys: ['overlapping', 'overlap', 'already booked', 'conflict'],
    reply:
      'A seat can hold only one booking per time slot. If your requested slot clashes with an existing booking you will see: "Overlapping bookings are not allowed." Choose a different slot or release the existing reservation from My Bookings.',
  },
  {
    keys: ['cancelled', 'cancel', 'refund'],
    reply:
      'Go to My Bookings, choose the reservation and press Cancel. The seat is released immediately for other students. Cancellations must be made at least 60 minutes before the slot begins.',
  },
];

const fallback =
  "I'm the BIT Library Assistant (demo). I can help with seat reservations, time slots, the study room, digital resources and library hours.\n\nTry one of the suggested questions below.";

export function getMockReply(message = '') {
  const text = message.toLowerCase();
  const rule = rules.find((r) => r.keys.some((k) => text.includes(k)));
  return rule ? rule.reply : fallback;
}

export const initialGreeting = {
  role: 'bot',
  text: "Hello! I'm the BIT Library Assistant. Ask me about seat reservations, time slots, study rooms or digital resources.",
  time: 'Now',
};