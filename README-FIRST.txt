DFO V43 — Reversed Tangent Cylinder Direction / No Bottom DFO

Starting point:
- V42 forced tangent cylinder carousel.

What changed:
1. Kept the V42 cylinder geometry.
2. Reversed the wrapper rotateY direction.
3. Reversed the actual card-face rotateY direction.
4. Kept the bottom DFO/firecracker removed.
5. Did not change the background, header, card content, footer, modals, or countdowns.
6. Ran Node JavaScript syntax check: passed.

Why:
V42 finally made the cards rotate, but they rotated in the wrong direction.
V43 flips the tangent direction so the cards should now wrap around the carousel wall the correct way.

If it is now too angled:
- reduce 30/17 to 24/12 in the V43 CSS block.
If it still needs more curve:
- increase 30/17 to 36/22.
