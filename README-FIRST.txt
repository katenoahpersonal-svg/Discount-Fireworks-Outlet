DFO V112 — Arrow Glide Position/Size Transition

Starting point:
- Built from the safe V108/V107 base, not the V109/V110/V111 motion experiments.

V112 changes:
1. Arrow-click transition only:
   - Left/right arrow movement now animates left, top, width, height, transform, opacity, and filter together.
   - This fixes the jagged snap caused by cards changing position/size instantly while only transform was easing.
   - Arrow clicks are locked briefly during the glide so rapid-clicking does not create jumps.

Not changed:
- No face card content changes
- No face card layout value changes
- No card spacing changes
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
