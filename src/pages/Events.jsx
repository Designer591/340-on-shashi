import { Link } from 'react-router-dom'
import { EVENTS, SITE } from '../data/site.js'

export default function Events() {
  return (
    <div className="page container">
      <header className="page-head">
        <p className="eyebrow">Events</p>
        <h1>Music, sunsets & celebrations</h1>
        <p className="muted">Something on most weekends. Follow us for the latest line-ups.</p>
      </header>

      <div className="grid-2">
        {EVENTS.map((e) => (
          <article className="card event" key={e.title}>
            <p className="eyebrow">{e.when}</p>
            <h3>{e.title}</h3>
            <p className="muted">{e.desc}</p>
          </article>
        ))}
      </div>

      <div className="card center" style={{ marginTop: 32 }}>
        <h3>Planning a private function?</h3>
        <p className="muted">
          Birthdays, anniversaries and corporate evenings — tell us what you have in mind.
        </p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Link to="/book" className="btn">Book a Table</Link>
          <a className="btn btn-ghost" href={`tel:${SITE.phoneTel}`}>Call {SITE.phoneDisplay}</a>
        </div>
      </div>
    </div>
  )
}
