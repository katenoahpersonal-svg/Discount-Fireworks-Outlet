# Discount Fireworks Outlet — Grand Finale Control Deck V2

This folder is ready to upload to GitHub Pages.

## What changed in V2
- Added an elevated America’s 250th countdown section inspired by the Claude screenshot, but rebuilt to match the DFO site direction.
- Added a refined black/gold editorial moment without losing the red/blue DFO energy.
- Added a cleaner hero, stronger “Control Deck” panel, and a simple show-builder section.
- Kept demo videos and location directions extremely easy to access.

## Files
- `index.html` — page structure, copy, links, and video cards
- `styles.css` — all design styling
- `script.js` — navigation, reveal animations, countdown, and fireworks canvas
- `.nojekyll` — helps GitHub Pages serve the site cleanly
- `assets/` — place real logo/photos here later

## GitHub Pages upload steps
1. Open your GitHub repository.
2. Click **Add file** → **Upload files**.
3. Drag the CONTENTS of this folder into GitHub, not the zip itself.
4. Commit the changes.
5. Go to **Settings** → **Pages**.
6. Set source to `main` branch and `/root`.
7. Wait a minute and refresh the GitHub Pages link.

## Easy edits
### Replace demo videos
In `index.html`, find each `.demo-card` button and replace the `data-video` value with the YouTube embed URL.

Example:
`https://www.youtube.com/embed/YOUR_VIDEO_ID`

Also update:
- `data-title`
- `data-description`
- the visible firework name inside the card

### Change the countdown date
In `index.html`, find:
`data-countdown="2026-07-04T00:00:00"`

### Change contact email
In `index.html`, find:
`mailto:info@discountfireworksoutlet.com`

Replace with the correct email address.

### Add the real logo
Place the logo in `/assets`, then replace the text logo markup in the header/footer if desired.
