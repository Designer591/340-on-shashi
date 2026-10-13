// Central place to edit all venue content. Menu items, prices and event details
// below are SAMPLE content — replace them with the real ones.

export const SITE = {
  name: '340 On Shashi',
  tagline: 'Soft sunsets. Good music. Beautiful meals.',
  about:
    'A dining and entertainment venue in the heart of Bindura, designed for memorable moments — romantic dates, family gatherings, and golden-hour celebrations with friends. Relaxed atmosphere, curated playlists, and plates that make the evening.',
  phoneDisplay: '071 900 6246',
  phoneTel: '+263719006246',
  whatsapp: '263719006246', // international format, no +
  location: 'Shashi, Bindura, Mashonaland Central, Zimbabwe',
  mapQuery: '340 on Shashi Bindura',
  social: {
    facebook: 'https://www.facebook.com/p/340-on-Shashi-61572565050490/',
    tiktok: 'https://www.tiktok.com/@340onshashi',
  },
  hours: [
    { days: 'Monday – Thursday', time: '11:00 – 21:00' },
    { days: 'Friday – Saturday', time: '11:00 – 23:30' },
    { days: 'Sunday', time: '11:00 – 20:00' },
  ],
  // Passcode for the /admin bookings page. Change it. Client-side only, so it is
  // a convenience lock, not real security — see README for the backend upgrade path.
  adminPasscode: '340admin',
}

export const TIME_SLOTS = [
  { group: 'Lunch', times: ['12:00', '13:00', '14:00', '15:00'] },
  { group: 'Sunset', times: ['16:00', '17:00', '18:00'] },
  { group: 'Evening', times: ['19:00', '20:00', '21:00'] },
]

export const OCCASIONS = [
  'Just dining',
  'Date night',
  'Birthday',
  'Anniversary',
  'Family gathering',
  'Business meeting',
  'Other celebration',
]

export const MENU = [
  {
    category: 'Starters',
    items: [
      { name: 'Crispy Calamari', desc: 'Lightly fried, lemon aioli', price: 6 },
      { name: 'Chicken Wings', desc: 'Peri-peri or honey-soy glaze', price: 7 },
      { name: 'Garden Bruschetta', desc: 'Tomato, basil, balsamic', price: 5 },
    ],
  },
  {
    category: 'Mains',
    items: [
      { name: 'Flame-Grilled T-Bone', desc: 'Served with chips and seasonal veg', price: 16 },
      { name: 'Sadza & Braai Platter', desc: 'Beef, boerewors, greens, relish', price: 10 },
      { name: 'Lemon Herb Chicken', desc: 'Roasted half chicken, creamy mash', price: 11 },
      { name: 'Grilled Bream', desc: 'Whole fish, garlic butter, rice', price: 13 },
    ],
  },
  {
    category: 'Light Bites',
    items: [
      { name: 'Gourmet Burger', desc: 'Beef patty, cheddar, caramelised onion', price: 8 },
      { name: 'Chicken Wrap', desc: 'Grilled chicken, slaw, chilli mayo', price: 6 },
      { name: 'Loaded Fries', desc: 'Cheese, bacon bits, spring onion', price: 5 },
    ],
  },
  {
    category: 'Desserts',
    items: [
      { name: 'Chocolate Fondant', desc: 'Warm centre, vanilla ice cream', price: 5 },
      { name: 'Malva Pudding', desc: 'Warm apricot sponge, custard', price: 4 },
    ],
  },
  {
    category: 'Drinks',
    items: [
      { name: 'Sunset Mocktail', desc: 'Passion fruit, orange, soda', price: 4 },
      { name: 'Fresh Juice', desc: 'Seasonal fruit blend', price: 3 },
      { name: 'Craft Coffee', desc: 'Espresso, latte or cappuccino', price: 3 },
      { name: 'Soft Drinks & Water', desc: 'Assorted', price: 2 },
    ],
  },
]

export const EVENTS = [
  {
    title: 'Sunset Sessions',
    when: 'Every Friday · 16:30',
    desc: 'Golden hour, chilled house and Afrobeats, and a rolling small-plates menu.',
  },
  {
    title: 'Live Music Saturdays',
    when: 'Every Saturday · 19:00',
    desc: 'Local artists and DJs turn the evening up. Reserve early — tables fill fast.',
  },
  {
    title: 'Sunday Family Lunch',
    when: 'Every Sunday · 12:00',
    desc: 'Relaxed lunch for the whole family with a kids-friendly menu.',
  },
  {
    title: 'Private Functions',
    when: 'By arrangement',
    desc: 'Birthdays, anniversaries, bridal showers and corporate evenings. Call us to plan yours.',
  },
]

export const GALLERY = [
  { caption: 'Golden hour on the deck', tone: 'sunset' },
  { caption: 'Plated to impress', tone: 'ember' },
  { caption: 'Music after dark', tone: 'night' },
  { caption: 'Date night tables', tone: 'rose' },
  { caption: 'Family gatherings', tone: 'gold' },
  { caption: 'Celebrations', tone: 'plum' },
]
