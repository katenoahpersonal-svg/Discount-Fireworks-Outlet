DFO V45 — Projected Ring-Lock Carousel / No Bottom DFO

Starting point:
- V44 ring-snapped edge-kiss build.

What changed:
1. Rebuilt only the carousel placement math.
2. The visible orange floor ring is treated as the source of truth.
3. Added an invisible ellipse guide:
   centerX = scene width * 0.50
   centerY = scene height * 0.655
   radiusX = scene width * 0.358
   radiusY = scene height * 0.080
4. Every card's bottom-center point is calculated from that same ellipse:
   x = centerX + sin(angle) * radiusX
   y = centerY + cos(angle) * radiusY
   bottom = sceneHeight - y
5. Angles tightened to -39, -19.5, 0, 19.5, 39 for closer edge-kiss spacing.
6. Kept corrected V43/V44 rotation direction.
7. Kept bottom DFO/firecracker removed.
8. Did not change background, header, card content, modals, footer, countdowns, or assets.
9. Node JS syntax check passed.

If browser test needs final tuning:
- If cards are too high above ring: increase ellipseCenterY from 0.655 to 0.670.
- If cards are too low: decrease ellipseCenterY from 0.655 to 0.640.
- If cards are too spread apart: reduce ellipseRadiusX from 0.358 to 0.340.
- If cards overlap too much: increase ellipseRadiusX from 0.358 to 0.375.
- If curve is too flat: increase ellipseRadiusY from 0.080 to 0.095.
- If curve is too deep: reduce ellipseRadiusY from 0.080 to 0.065.
