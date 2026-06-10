DFO V110 — Arrow-Click Carousel Transition

Starting point:
- Built from the safe V108/V109 package.

V110 changes:
1. Left/right arrow buttons now use their own arrowRotate() transition handler.
2. The arrow-click card movement uses a smoother easing curve.
3. The arriving/front card gets a subtle settle glow so the movement feels more polished.
4. This targets arrow clicks only.

Not changed:
- No face card content changes
- No face card layout changes
- No card sizing/spacing changes
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
