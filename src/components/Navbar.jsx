import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SITE } from '../data/site.js'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-num">340</span> On Shashi
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={close}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/book" className="btn btn-small" onClick={close}>
            Book a Table
          </Link>
        </nav>
      </div>
    </header>
  )
}
