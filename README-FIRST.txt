DFO V86 — Forced Card Visual Refresh

Starting point:
- V85 social-card-image-swap.

What this fixes:
Some previous changes affected modals or reused the same asset names, so the visible carousel cards could look unchanged on GitHub/browser cache.
V86 forces the actual carousel card visuals with new v86 asset filenames and direct CSS overrides.

Changes:
1. Build Your Show card:
   - forced to use assets/build-your-show-bomb-v86.jpg?v=86

2. Social Feed card:
   - forced to use the 6 uploaded DFO social graphics with new filenames:
     assets/social-card-v86-01.jpg through assets/social-card-v86-06.jpg

3. Demo Videos card:
   - visible carousel feature image and 4 thumbnails now use the supplied YouTube video thumbnails.
   - the modal still contains all 7 supplied YouTube embeds.

4. Cache protection:
   - new v86 filenames
   - ?v=86 cache-busting query strings
   - direct card-level CSS overrides

Unchanged:
- background
- header
- carousel geometry
- countdown
- Locations styling
- modals except already-existing YouTube links
- social modal

Upload note:
Upload/extract the full ZIP contents to GitHub, including the updated index.html and all new assets.
Then hard refresh the browser with Ctrl+Shift+R.
