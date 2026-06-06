DFO V49 — Carousel-Ride Grounding / No Bottom DFO

Starting point:
- V48 clean manual ridge pass.

What changed:
1. Kept manual SLOT_CONFIG.
2. Updated SLOT_CONFIG y-values to move cards down so their bottoms overlap the visible orange ridge:
   far-left/far-right y 68.5
   left/right y 64.2
   center y 61.8
3. Added a subtle base/track mount under every card.
4. Added a contact shadow and orange bloom under every card.
5. Added a shared glowing track-contact rail behind the card bases.
6. Angled each base/contact shadow by slot so the foot follows the card perspective.
7. Debug helpers remain hidden by default. Press D to show them.
8. Kept bottom DFO/firecracker removed.
9. Did not change background, header, card content, footer, modals, countdowns, or assets.
10. Node JS syntax check passed.

If still floating:
- Increase y for the affected slot in SLOT_CONFIG.
- Example: center y 61.8 -> 63.0 moves center DOWN.
- If base feet are too visible, lower opacity in .card3d::before.
