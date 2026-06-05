# DFO V37 — Working Production Build

This fixes the V36 JavaScript syntax error that stopped the cards and countdowns from rendering.

What was wrong in V36:
- The script accidentally contained this invalid JavaScript:
  const https://www.facebook.com/DFOBoji/ = "https://www.facebook.com/DFOBoji/";
- That killed the entire JS file.
- Result: no cards rendered and countdowns stayed as --.

What V37 includes:
- clean responsive background only, no cards/header/countdown baked in
- desktop/tablet/mobile backgrounds
- coded header
- coded countdowns
- coded five-card fixed-slot carousel
- coded cards
- coded DFO firecracker object fixed to stage
- coded small front ring
- coded bottom countdown
- coded footer
- working arrows, side-card clicks, keyboard arrows, drag rotation
- working modals
- Facebook Page Plugin embed for https://www.facebook.com/DFOBoji/

Upload:
- index.html
- .nojekyll
- assets/

Important:
Delete/replace the old index.html in GitHub Pages. If you still see no cards/countdowns, refresh with Ctrl+F5 or add ?v=37 to the URL once.
