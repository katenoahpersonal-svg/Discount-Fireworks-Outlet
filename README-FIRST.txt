DFO V106 — Nav Hard-Lock + Card Button Hover Colors

Starting point:
- Built from V105 full-upload-pages-permissions-fix.

Included:
- Full GitHub Pages workflow/permissions fix from V105.
- V104 header nav/card mapping.
- No-buoy background, header logo, favicon, and all prior safe site assets.

V106 changes:
1. Header nav hard-lock:
   - Video opens/rotates to the Video card.
   - Social opens/rotates to the Social Feed card.
   - Contact opens/rotates to the Build Your Show / Contact card.
   - Get Directions opens/rotates to the Locations card.
   - Header clicks are captured and stopped so they cannot fall through and open the current/front card modal.

2. Card button hover colors:
   - Card buttons now transition to the same orange fill / white text hover behavior as the header button.
   - This is color/visual only. No movement or sizing changes.

Not changed:
- No card layout changes
- No carousel geometry changes
- No clock changes
- No background changes
- No header layout changes
- No button size/position changes
- No modal/image changes

Upload:
- Upload the full extracted ZIP contents to the repo root.
- Include .github/workflows/pages.yml.
- Hard refresh with Ctrl + Shift + R after the GitHub Action finishes.
