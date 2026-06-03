# Discount Fireworks Outlet — Grand Finale Control Deck

This folder is ready to upload to a GitHub repository and publish with GitHub Pages.

## Upload to GitHub

1. Create a new repository.
2. Upload all files in this folder, including:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `.nojekyll`
   - `assets/`
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Save, then wait a minute or two for GitHub to publish the site.

## Easy edits

### Change demo videos
Open `index.html` and search for `data-video=`. Replace the YouTube embed links with your actual demo video links.

YouTube link format:
`https://www.youtube.com/embed/YOUTUBE_VIDEO_ID`

Example:
A regular YouTube URL like:
`https://youtu.be/R3mAzPDToPQ`

Becomes:
`https://www.youtube.com/embed/R3mAzPDToPQ`

### Change the contact email
Open `index.html` and search for:
`info@discountfireworksoutlet.com`

Replace it with the email you want form messages to open to.

### Add the real logo
Right now, the site uses a styled text logo so it works immediately. To use the real DFO logo:

1. Add your logo image to the `assets` folder.
2. Replace the `.brand` markup in `index.html` with an image.

Suggested image size: transparent PNG or SVG, roughly 600px wide.

## Notes

The site includes animated fireworks using only JavaScript and CSS. No paid apps, no plugins, no external animation library.
