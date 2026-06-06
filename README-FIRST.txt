DFO V47 — Manual Visual Calibration Mode / No Bottom DFO

Starting point:
- V46 per-slot ridge lock.

What changed:
1. Removed shared ellipse positioning from the active placement logic.
2. Added SLOT_CONFIG at the top of the script for manual slot-by-slot tuning.
3. Each slot now has its own:
   x, y, z, scale, rotateY, faceRotate, faceSkew, width, height
4. x is percent of scene width from center.
5. y is percent from top of the scene to the card bottom-center anchor.
6. Cards are anchored by bottom-center with:
   left = anchorX
   top = anchorY
   transform = translate3d(-50%,-100%,z)
7. Added visible calibration helpers:
   - red dot at each card bottom-center anchor
   - faint dashed ellipse guide
   - small calibration panel
8. Press D to hide/show calibration helpers.
9. Kept bottom DFO/firecracker removed.
10. Did not change background, header, card content, footer, modals, countdowns, or assets.
11. Node JS syntax check passed.

How to tune:
- Open index.html.
- Find SLOT_CONFIG.
- Move a card DOWN by increasing y.
- Move a card UP by decreasing y.
- Move a card left/right by changing x.
- Make cards closer by reducing the absolute x values.
- Make a card larger/smaller with scale, width, height.
- Adjust visual facing with rotateY and faceRotate.

Current initial values:
- far-left  x -34.8 y 58.7
- left      x -19.8 y 54.6
- center    x   0.0 y 50.6
- right     x  19.8 y 54.6
- far-right x  34.8 y 58.7

Goal:
Put each red dot directly on the visible orange glow ridge.
