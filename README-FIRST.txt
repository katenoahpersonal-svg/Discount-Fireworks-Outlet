DFO V42 — Forced Tangent Cylinder Carousel / No Bottom DFO

Starting point:
- V41 cylindrical wall carousel.

What changed:
1. Kept the same background/header/content.
2. Kept bottom DFO/firecracker removed.
3. Made perspective stronger so rotateY is visible.
4. Increased wrapper rotateY from V41.
5. Added data-wall-pos attributes to every visible card.
6. Rotated the actual .card face with CSS based on position:
   far-left: +30deg
   left: +17deg
   center: 0deg
   right: -17deg
   far-right: -30deg
7. Tightened the carousel radius so the cards read as one shared circular wall.
8. Increased depth so side cards visually recede.
9. Ran Node JS syntax check: passed.

If this is too angled:
- reduce the CSS .card rotateY values from 30/17 to 24/12.
If still not angled enough:
- increase them to 36/22.
