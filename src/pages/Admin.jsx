import { useState, useMemo } from 'react'
import { SITE } from '../data/site.js'
import {
  getBookings,
  updateStatus,
  deleteBooking,
  prettyDate,
  todayISO,
} from '../lib/bookings.js'

const AUTH_KEY = 'shashi340_admin'

function isAuthed() {
  try {
    return sessionStorage.getItem(AUTH_KEY) === '1'
  } catch {
    return false
  }
}

export default function Admin() {
  const [authed, setAuthed] = useState(isAuthed())
  const [code, setCode] = useState('')
  const [bad, setBad] = useState(false)
  const [list, setList] = useState(() => getBookings())
  const [filter, setFilter] = useState('upcoming')

  const refresh = () => setList(getBookings())

  const login = (e) => {
    e.preventDefault()
    if (code === SITE.adminPasscode) {
      try {
        sessionStorage.setItem(AUTH_KEY, '1')
      } catch {
        /* ignore */
      }
      setAuthed(true)
      refresh()
    } else {
      setBad(true)
    }
  }

  const today = todayISO()
  const shown = useMemo(() => {
    if (filter === 'upcoming') return list.filter((b) => b.date >= today && b.status !== 'cancelled')
    if (filter === 'pending') return list.filter((b) => b.status === 'pending')
    if (filter === 'past') return list.filter((b) => b.date < today)
    return list
  }, [list, filter, today])

  const stats = {
    pending: list.filter((b) => b.status === 'pending').length,
    today: list.filter((b) => b.date === today && b.status !== 'cancelled').length,
    guests: list
      .filter((b) => b.date >= today && b.status !== 'cancelled')
      .reduce((s, b) => s + b.guests, 0),
  }

  const act = (fn) => {
    fn()
    refresh()
  }

  if (!authed) {
    return (
      <div className="page container narrow">
        <form className="card form" onSubmit={login}>
          <h1>Staff login</h1>
          <label>
            Passcode
            <input
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setBad(false)
              }}
              autoFocus
            />
            {bad && <span className="err">Incorrect passcode.</span>}
          </label>
          <button className="btn" type="submit">Enter</button>
        </form>
      </div>
    )
  }

  return (
    <div className="page container">
      <header className="page-head">
        <p className="eyebrow">Staff</p>
        <h1>Bookings</h1>
        <p className="muted small">
          Bookings are stored in this browser only. Connect a backend to share them across devices.
        </p>
      </header>

      <div className="grid-3">
        <div className="card center"><h2>{stats.pending}</h2><p className="muted">Pending</p></div>
        <div className="card center"><h2>{stats.today}</h2><p className="muted">Today</p></div>
        <div className="card center"><h2>{stats.guests}</h2><p className="muted">Upcoming guests</p></div>
      </div>

      <div className="chips" style={{ margin: '24px 0' }}>
        {['upcoming', 'pending', 'past', 'all'].map((f) => (
          <button
            key={f}
            className={`chip ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="card center muted">No bookings here yet.</div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ref</th><th>Guest</th><th>When</th><th>Party</th><th>Status</th><th />
              </tr>
            </thead>
            <tbody>
              {shown.map((b) => (
                <tr key={b.reference}>
                  <td>{b.reference}</td>
                  <td>
                    <strong>{b.name}</strong>
                    <br />
                    <a href={`tel:${b.phone}`}>{b.phone}</a>
                    {b.notes && <div className="muted small">“{b.notes}”</div>}
                  </td>
                  <td>{prettyDate(b.date)}<br />{b.time} · {b.occasion}</td>
                  <td>{b.guests}</td>
                  <td><span className={`badge ${b.status}`}>{b.status}</span></td>
                  <td className="actions">
                    {b.status !== 'confirmed' && (
                      <button onClick={() => act(() => updateStatus(b.reference, 'confirmed'))}>Confirm</button>
                    )}
                    {b.status !== 'cancelled' && (
                      <button onClick={() => act(() => updateStatus(b.reference, 'cancelled'))}>Cancel</button>
                    )}
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this booking permanently?'))
                          act(() => deleteBooking(b.reference))
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
