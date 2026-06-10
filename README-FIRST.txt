DFO V107 — Header Direct Modal/Wall Open + Card Button Colors

Starting point:
- Built from V105 full-upload-pages-permissions-fix.

V107 plan of attack:
Instead of trying to make the header nav rotate first and then depend on the front card,
the header nav now directly opens the exact modal/wall you asked for.

Header nav:
- Video opens videosModal
- Social opens socialModal
- Contact opens contactModal
- Get Directions opens locationsModal

Why this should fix it:
- Header nav no longer uses data-go.
- Header nav click handler runs in capture phase.
- It stops propagation and stopImmediatePropagation.
- The generic card/current-front-card click handler ignores header nav clicks completely.
- This prevents Social from accidentally opening whatever card is currently facing front.

Card button hover:
- Card buttons now use the same orange-fill / white-text hover color behavior as the header button.

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
