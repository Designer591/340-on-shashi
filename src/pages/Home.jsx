import { Link } from 'react-router-dom'
import { SITE, MENU, EVENTS } from '../data/site.js'

const HIGHLIGHTS = [
  { title: 'Sunset Views', text: 'Settle in as the sky turns gold. The best seat in Bindura at the best hour.' },
  { title: 'Good Music', text: 'Curated playlists, DJs and live acts to set the mood from lunch to late.' },
  { title: 'Beautiful Meals', text: 'Plates made to be shared, savoured and photographed.' },
]

export default function Home() {
  const featured = MENU.flatMap((c) => c.items).slice(4, 8)

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow">Dining & Entertainment · Bindura</p>
          <h1>
            Where the sun sets <em>slow</em> and the evening begins.
          </h1>
          <p className="lead">{SITE.tagline}</p>
          <div className="hero-actions">
            <Link to="/book" className="btn">Book a Table</Link>
            <Link to="/menu" className="btn btn-ghost">View Menu</Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="grid-3">
          {HIGHLIGHTS.map((h) => (
            <div className="card" key={h.title}>
              <h3>{h.title}</h3>
              <p className="muted">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container split">
        <div>
          <p className="eyebrow">Our story</p>
          <h2>Made for memorable moments</h2>
          <p className="muted">{SITE.about}</p>
          <Link to="/contact" className="btn btn-ghost">Find us</Link>
        </div>
        <div className="hours card">
          <h3>Opening hours</h3>
          {SITE.hours.map((h) => (
            <div className="row" key={h.days}>
              <span>{h.days}</span>
              <strong>{h.time}</strong>
            </div>
          ))}
          <p className="muted small">Hours may vary on event days. Call to confirm.</p>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>From the kitchen</h2>
          <Link to="/menu">Full menu →</Link>
        </div>
        <div className="grid-4">
          {featured.map((i) => (
            <div className="card" key={i.name}>
              <h3>{i.name}</h3>
              <p className="muted">{i.desc}</p>
              <p className="price">${i.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>What’s on</h2>
          <Link to="/events">All events →</Link>
        </div>
        <div className="grid-2">
          {EVENTS.slice(0, 2).map((e) => (
            <div className="card" key={e.title}>
              <p className="eyebrow">{e.when}</p>
              <h3>{e.title}</h3>
              <p className="muted">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Reserve your sunset</h2>
          <p>Tables for lunch, golden hour and evening. Takes under a minute.</p>
          <Link to="/book" className="btn">Book Now</Link>
        </div>
      </section>
    </>
  )
}
