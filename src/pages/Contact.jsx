import { useState } from 'react'
import { SITE } from '../data/site.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', message: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const send = (e) => {
    e.preventDefault()
    const text = `Hi 340 On Shashi, I'm ${form.name.trim()}. ${form.message.trim()}`
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`

  return (
    <div className="page container">
      <header className="page-head">
        <p className="eyebrow">Contact</p>
        <h1>Find us, call us, say hello</h1>
      </header>

      <div className="split">
        <div>
          <div className="card">
            <h3>Reach us</h3>
            <p><strong>Phone / WhatsApp:</strong> <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a></p>
            <p><strong>Location:</strong> {SITE.location}</p>
            <p>
              <a href={SITE.social.facebook} target="_blank" rel="noreferrer">Facebook</a> ·{' '}
              <a href={SITE.social.tiktok} target="_blank" rel="noreferrer">TikTok</a>
            </p>
            <h3 style={{ marginTop: 20 }}>Hours</h3>
            {SITE.hours.map((h) => (
              <div className="row" key={h.days}>
                <span>{h.days}</span>
                <strong>{h.time}</strong>
              </div>
            ))}
          </div>

          <form className="card form" onSubmit={send} style={{ marginTop: 20 }}>
            <h3>Send an enquiry</h3>
            <label>
              Your name
              <input required value={form.name} onChange={set('name')} />
            </label>
            <label>
              Message
              <textarea required rows="4" value={form.message} onChange={set('message')} />
            </label>
            <button className="btn" type="submit">Send via WhatsApp</button>
          </form>
        </div>

        <div className="map card">
          <iframe
            title="Map to 340 On Shashi"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}
