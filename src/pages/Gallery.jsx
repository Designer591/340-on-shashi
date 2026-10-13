import { GALLERY, SITE } from '../data/site.js'

// Placeholder tiles. To use real photos, drop images in /public/gallery and add
// an `src` field to each GALLERY entry, then render <img src=...> in place of the tile.
export default function Gallery() {
  return (
    <div className="page container">
      <header className="page-head">
        <p className="eyebrow">Gallery</p>
        <h1>The 340 vibe</h1>
        <p className="muted">
          See more on{' '}
          <a href={SITE.social.tiktok} target="_blank" rel="noreferrer">TikTok</a> and{' '}
          <a href={SITE.social.facebook} target="_blank" rel="noreferrer">Facebook</a>.
        </p>
      </header>

      <div className="gallery">
        {GALLERY.map((g) => (
          <figure className={`tile tone-${g.tone}`} key={g.caption}>
            <figcaption>{g.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
