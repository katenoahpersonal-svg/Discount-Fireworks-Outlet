DFO V104 — Header Nav Exact Card Targets + Button Font Color Only

Starting point:
- Built from V103 header-nav-video-social-contact.

V104 changes:
1. Header nav click behavior:
   - Video opens/rotates to Videos card.
   - Social opens/rotates to Social Feed card.
   - Contact opens/rotates to Build Your Show / Contact card.
   - Get Directions opens/rotates to Locations card.
   - Header nav clicks now stop before the generic card/modal click handler, so they do not accidentally open the current/front card.

2. Button font color only:
   - Get Directions hover/focus text is forced white so it does not disappear.
   - Card/modal/social button hover/focus text is forced white.
   - Non-direction nav hover/focus transitions to orange.
   - Added smooth color transition only.

Not changed:
- No card layout changes
- No carousel geometry changes
- No clock changes
- No background changes
- No header layout changes
- No button size/position/background changes
- No modal/image changes

Upload:
- Upload the full ZIP contents to GitHub.
- Make sure updated index.html is uploaded.
- Hard refresh with Ctrl+Shift+R.
