DFO V53 — Live Carousel Lowered Pass / No Image-State / No Bottom DFO

Starting point:
- V51 live-card carousel.
- V52 image-state approach is abandoned.

What changed:
1. Kept the real HTML cards.
2. Kept the carousel rotation/swap behavior.
3. Brought the cards down significantly:
   far-left/far-right y 79.0
   left/right y 75.0
   center y 72.6
4. Disabled the large V51 foreground glow/occlusion by default because it created the wrong giant ring effect.
5. Kept the V51 glow layers in the code for future use:
   add class "use-occlusion" to body if needed later.
6. Kept only a small natural foot/contact shadow.
7. Debug helpers hidden by default; press D to show them.
8. Bottom DFO/firecracker remains removed.
9. Did not change background, header, card content, footer, modals, countdowns, or assets.
10. Node JS syntax check passed.

Fast tuning:
- Move all cards down more: add +1.0 to every y value in SLOT_CONFIG.
- Move center down only: center y 72.6 -> 74.0.
- If cards go too low: subtract 1.0 from every y.
- Bring cards closer: reduce far x 33 -> 31 and side x 19.2 -> 18.
