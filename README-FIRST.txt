DFO V120 — Red Label Fix + Gold Cleanup + Carousel Ride Intro

Starting point:
- Built from V119 when available.

V120 changes:
1. Countdown labels are fixed using the actual selectors:
   - Header labels: .clock-lab
   - Bottom labels: .bottom-row small

2. Blue glow is cleaned off countdown numbers/wrappers:
   - numbers stay white
   - colons stay orange/red
   - labels are red/orange again

3. Remaining gold/yellow text accents inside cards/modals are shifted to red/orange:
   - favorite tile labels
   - video labels
   - demo labels
   - modal link text/headings

4. Page-load card intro now feels like a carousel ride:
   - cards start one slot back
   - glide into their final opening wall
   - no layout/size/placement changes

Not changed:
- Card layout
- Card sizing
- Card spacing
- Card x/y placement
- Carousel geometry
- Header layout
- Clock position
- Background image
- Modal structure
- GitHub Pages workflow remains included

Upload:
- Upload the full extracted ZIP contents to the repo root.
- Include .github/workflows/pages.yml.
- Hard refresh with Ctrl + Shift + R after the GitHub Action finishes.
