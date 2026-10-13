import { Link } from 'react-router-dom'
import { SITE } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand">
            <span className="brand-num">340</span> On Shashi
          </div>
          <p className="muted">{SITE.tagline}</p>
        </div>
        <div>
          <h4>Visit</h4>
          <p className="muted">{SITE.location}</p>
          <p>
            <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <p><Link to="/menu">Menu</Link></p>
          <p><Link to="/events">Events</Link></p>
          <p><Link to="/book">Book a table</Link></p>
        </div>
        <div>
          <h4>Follow</h4>
          <p><a href={SITE.social.facebook} target="_blank" rel="noreferrer">Facebook</a></p>
          <p><a href={SITE.social.tiktok} target="_blank" rel="noreferrer">TikTok</a></p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} 340 On Shashi. All rights reserved.</span>
        <Link to="/admin" className="admin-link">Staff</Link>
      </div>
    </footer>
  )
}
