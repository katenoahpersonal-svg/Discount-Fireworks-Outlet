DFO V68 — Facebook Auto-Sync Ready

Starting point:
- V67 curated-social-card-clean-modal.

What changed:
1. The front-end visual layout is unchanged.
2. The Social Feed card still uses the same 6 local image filenames.
3. Added a host-agnostic Facebook sync script:
   scripts/sync-facebook-images.js
4. Added package.json with:
   npm run sync:facebook
5. Added GitHub Action:
   .github/workflows/sync-facebook-images.yml
6. Added setup guide:
   FACEBOOK-SYNC-SETUP.md
7. Added .env.example.

Important:
- I did not and cannot create your Meta Page access token from here.
- The token must stay private as a host/GitHub secret.
- If you host on GitHub-connected Netlify/Vercel/GitHub Pages, the included GitHub Action can update the images every 3 hours.
- If you do not use GitHub, your host needs a scheduled job/build step that runs npm run sync:facebook.

No carousel positioning changed.
No background changes.
No header changes.
No footer/countdown changes.
No other cards changed.
Bottom DFO/firecracker remains removed.

Node syntax checks passed:
- index.html inline script
- scripts/sync-facebook-images.js

DFO V67 — Curated Social Card + Clean Social Modal

Starting point:
- V66 locations-side-slot-selector-fix.

Only social strategy changes:
1. No live Facebook feed is embedded inside the carousel card.
2. Social Feed carousel card remains a curated 6-image grid using local assets:
   - assets/social-feed-01.jpg
   - assets/social-feed-02.jpg
   - assets/social-feed-03.jpg
   - assets/social-feed-04.jpg
   - assets/social-feed-05.jpg
   - assets/social-feed-06.jpg
3. To update the Social card, replace those six files using the same filenames.
4. View Socials opens a clean modal with:
   - title: Follow the Finale
   - subtitle: Discount Fireworks Outlet on Facebook
   - button: Open Facebook Page
   - visible URL: facebook.com/DFOBoji
5. Removed Facebook iframe/plugin/sdk artifacts.

No carousel positioning changed.
No background changes.
No header changes.
No footer/countdown changes.
No other cards changed.
Bottom DFO/firecracker remains removed.
Node JS syntax check passed.
