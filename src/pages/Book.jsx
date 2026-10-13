import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE, TIME_SLOTS, OCCASIONS } from '../data/site.js'
import { addBooking, todayISO, prettyDate } from '../lib/bookings.js'

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  guests: 2,
  occasion: OCCASIONS[0],
  notes: '',
}

function whatsappLink(b) {
  const lines = [
    `Hi 340 On Shashi, I'd like to confirm my table booking.`,
    `Ref: ${b.reference}`,
    `Name: ${b.name}`,
    `Date: ${prettyDate(b.date)}`,
    `Time: ${b.time}`,
    `Guests: ${b.guests}`,
    `Occasion: ${b.occasion}`,
  ]
  if (b.notes) lines.push(`Notes: ${b.notes}`)
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
}

export default function Book() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(null)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Please enter your name.'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 9) e.phone = 'Enter a valid phone number.'
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email or leave blank.'
    if (!form.date) e.date = 'Pick a date.'
    else if (form.date < todayISO()) e.date = 'Date cannot be in the past.'
    if (!form.time) e.time = 'Choose a time.'
    const g = Number(form.guests)
    if (!g || g < 1 || g > 30) e.guests = 'Guests must be between 1 and 30.'
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    const booking = addBooking({
      ...form,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      notes: form.notes.trim(),
      guests: Number(form.guests),
    })
    setDone(booking)
    window.scrollTo(0, 0)
  }

  if (done) {
    return (
      <div className="page container narrow">
        <div className="card center success">
          <p className="eyebrow">Request received</p>
          <h1>Thank you, {done.name.split(' ')[0]}!</h1>
          <p className="ref">{done.reference}</p>
          <p className="muted">
            {prettyDate(done.date)} at {done.time} · {done.guests}{' '}
            {done.guests === 1 ? 'guest' : 'guests'}
          </p>
          <p>
            Your table is <strong>pending confirmation</strong>. Tap below to send your details to us on
            WhatsApp so we can confirm quickly.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a className="btn" href={whatsappLink(done)} target="_blank" rel="noreferrer">
              Confirm on WhatsApp
            </a>
            <a className="btn btn-ghost" href={`tel:${SITE.phoneTel}`}>Call {SITE.phoneDisplay}</a>
          </div>
          <p style={{ marginTop: 20 }}>
            <button
              className="link-btn"
              onClick={() => {
                setDone(null)
                setForm(EMPTY)
              }}
            >
              Make another booking
            </button>{' '}
            · <Link to="/">Back home</Link>
          </p>
        </div>
      </div>
    )
  }

  const Err = ({ k }) => (errors[k] ? <span className="err">{errors[k]}</span> : null)

  return (
    <div className="page container narrow">
      <header className="page-head">
        <p className="eyebrow">Reservations</p>
        <h1>Book a table</h1>
        <p className="muted">
          Fill in the details and we’ll confirm via WhatsApp or phone. For groups over 12 or private
          functions, please call {SITE.phoneDisplay}.
        </p>
      </header>

      <form className="card form" onSubmit={submit} noValidate>
        <div className="form-row">
          <label>
            Full name
            <input value={form.name} onChange={set('name')} autoComplete="name" />
            <Err k="name" />
          </label>
          <label>
            Phone / WhatsApp
            <input
              type="tel"
              placeholder="07X XXX XXXX"
              value={form.phone}
              onChange={set('phone')}
              autoComplete="tel"
            />
            <Err k="phone" />
          </label>
        </div>

        <label>
          Email <span className="muted">(optional)</span>
          <input type="email" value={form.email} onChange={set('email')} autoComplete="email" />
          <Err k="email" />
        </label>

        <div className="form-row">
          <label>
            Date
            <input type="date" min={todayISO()} value={form.date} onChange={set('date')} />
            <Err k="date" />
          </label>
          <label>
            Guests
            <input
              type="number"
              min="1"
              max="30"
              value={form.guests}
              onChange={set('guests')}
            />
            <Err k="guests" />
          </label>
        </div>

        <fieldset>
          <legend>Time</legend>
          {TIME_SLOTS.map((g) => (
            <div key={g.group} className="slot-group">
              <span className="slot-label">{g.group}</span>
              <div className="chips">
                {g.times.map((t) => (
                  <button
                    type="button"
                    key={t}
                    className={`chip ${form.time === t ? 'active' : ''}`}
                    aria-pressed={form.time === t}
                    onClick={() => setForm({ ...form, time: t })}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <Err k="time" />
        </fieldset>

        <label>
          Occasion
          <select value={form.occasion} onChange={set('occasion')}>
            {OCCASIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>

        <label>
          Special requests <span className="muted">(optional)</span>
          <textarea
            rows="3"
            placeholder="Seating preference, allergies, decorations…"
            value={form.notes}
            onChange={set('notes')}
          />
        </label>

        <button className="btn" type="submit">Request Booking</button>
      </form>
    </div>
  )
}
