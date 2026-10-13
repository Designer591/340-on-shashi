import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MENU } from '../data/site.js'

export default function Menu() {
  const [active, setActive] = useState('All')
  const cats = ['All', ...MENU.map((c) => c.category)]
  const shown = active === 'All' ? MENU : MENU.filter((c) => c.category === active)

  return (
    <div className="page container">
      <header className="page-head">
        <p className="eyebrow">Menu</p>
        <h1>Plates worth the wait</h1>
        <p className="muted">Prices in USD. Ask your server about today’s specials.</p>
      </header>

      <div className="chips" role="tablist">
        {cats.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={active === c}
            className={`chip ${active === c ? 'active' : ''}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {shown.map((cat) => (
        <section key={cat.category} className="menu-cat">
          <h2>{cat.category}</h2>
          <div className="menu-list">
            {cat.items.map((i) => (
              <div className="menu-item" key={i.name}>
                <div>
                  <h3>{i.name}</h3>
                  <p className="muted">{i.desc}</p>
                </div>
                <span className="price">${i.price}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="center">
        <Link to="/book" className="btn">Reserve a Table</Link>
      </div>
    </div>
  )
}
