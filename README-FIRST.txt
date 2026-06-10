DFO V109 — Smoother Carousel Motion Only

Starting point:
- Built from V108 red-inner-cards-smoother-carousel.

V109 changes:
1. Carousel motion only:
   - Longer, smoother easing for carousel card movement.
   - Adds a temporary carousel.is-rotating class during motion.
   - Adds will-change hints for smoother browser rendering.

2. Multi-card moves:
   - Clicking a farther side card now steps through one card at a time instead of snapping across multiple positions.

Not changed:
- No face card content changes
- No face card layout changes
- No face card sizing/spacing changes
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
