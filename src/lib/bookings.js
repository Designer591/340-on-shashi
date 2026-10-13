// Booking storage. Currently localStorage (per-browser) so the site works with no
// backend. Swap these functions for API calls when you add a server.

const KEY = 'shashi340_bookings_v1'

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function write(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    /* storage unavailable — ignore */
  }
}

export function makeReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < 5; i++) out += chars[Math.floor(Math.random() * chars.length)]
  return `340-${out}`
}

export function getBookings() {
  return read().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
}

export function addBooking(data) {
  const booking = {
    ...data,
    reference: makeReference(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  write([...read(), booking])
  return booking
}

export function updateStatus(reference, status) {
  write(read().map((b) => (b.reference === reference ? { ...b, status } : b)))
}

export function deleteBooking(reference) {
  write(read().filter((b) => b.reference !== reference))
}

export function todayISO() {
  const d = new Date()
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10)
}

export function prettyDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
