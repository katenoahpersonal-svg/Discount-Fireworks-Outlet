DFO V48 — Clean Manual Ridge Pass / No Bottom DFO

Starting point:
- V47 manual calibration build.

What was wrong in V47:
1. Calibration helpers were ON by default, which made the page look like a broken debug board.
2. The SLOT_CONFIG y-values placed the card feet on the wrong visual guide, above the real orange ridge.
3. The center card was too high and the debug panel covered the design.

What changed in V48:
1. Calibration helpers are hidden by default.
2. Press D to show/hide red dots and the ring guide.
3. Cards moved DOWN with manual y-values:
   far-left/far-right y 64.2
   left/right y 60.6
   center y 58.1
4. Debug ring guide moved down closer to the visible orange ridge for future tuning.
5. Kept bottom DFO/firecracker removed.
6. Did not change background, header, card content, footer, modals, countdowns, or assets.
7. Node JS syntax check passed.

If it still needs adjustment:
- Move a card DOWN by increasing its y in SLOT_CONFIG.
- Move a card UP by decreasing its y.
- Show pins with D only when calibrating.
