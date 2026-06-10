DFO V113 — Two-Line Title Glitch Fix

Starting point:
- Built from V112 arrow-glide-position-size-transition.

V113 changes:
1. Fixes the weird glitch on cards with 2-line titles:
   - Preview the Boom / Before You Buy
   - Top Picks for the Perfect / Finale

2. The fix:
   - Adds a stable title renderer for those cards.
   - Locks the title into exact line spans so it does not re-wrap while the card width/height animates.
   - Adds GPU/text rendering isolation for the title only.

Not changed:
- No face card layout value changes
- No card spacing changes
- No card sizing changes
- No carousel slot geometry changes
- No header changes
- No clock changes
- No background/image changes
- No modal layout changes
- GitHub Pages workflow remains included

Upload:
- Upload the full extracted ZIP contents to the repo root.
- Include .github/workflows/pages.yml.
- Hard refresh with Ctrl + Shift + R after the GitHub Action finishes.
