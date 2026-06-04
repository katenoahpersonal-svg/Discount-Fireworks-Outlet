# DFO Lock Spec V13 — Real Anchor Fix

Upload:
- index.html
- .nojekyll

What was actually broken:
Earlier versions double-centered the carousel cards using both negative margins and translate(-50%, -50%).
That made top/position changes behave unpredictably and caused cards to look like they were floating/cut off.

V13 fixes:
- Removed negative margin centering from cards
- Uses transform centering only
- Repositioned carousel to 50.6% with correct math
- Moved large floor rings up
- Moved the small bottom countdown down and made it smaller
- Kept exactly 5 cards
- Demo Videos starts centered
- No canvas fireworks
- No giant center DFO block
