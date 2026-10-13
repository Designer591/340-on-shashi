# 340 On Shashi — Website

React + Vite site for 340 On Shashi (Bindura): home, menu, events, gallery, contact, table booking, and a staff bookings page.

## Run

```bash
npm install
npm run dev      # local dev
npm run build    # production build into dist/
```

## Edit content

Everything lives in `src/data/site.js`: phone, hours, social links, time slots, occasions, menu, events, gallery.
The menu items, prices, events and opening hours are **sample content** — replace with the real ones.

## How bookings work

- `/book` validates the form and saves the booking (reference like `340-AB7K2`) to the browser's localStorage.
- The confirmation screen has a **Confirm on WhatsApp** button that sends the booking details to 071 900 6246.
- `/admin` (linked as "Staff" in the footer) lists bookings with confirm / cancel / delete. Passcode is `adminPasscode` in `site.js` — change it.

## Important limitation

Bookings are stored per browser, so the owner will not see a customer's booking on their own device except via the WhatsApp message.
The admin passcode is client-side only (a convenience lock, not real security).
To make bookings truly shared: add a Node/Express + MySQL API and swap the functions in `src/lib/bookings.js` for `fetch` calls, and move admin auth to the server.

## Real photos

Put images in `public/gallery/` and update `src/pages/Gallery.jsx` to render `<img>` tags.
