DFO V66 — Locations Side-Slot Selector Fix

Starting point:
- V65 locations-button-and-side-card-fix.

Root cause:
- The carousel JS sets each slot as data-wall-pos="-2/-1/0/1/2".
- The V65 side-card CSS accidentally targeted data-slot instead.
- Because of that, the side/far Locations fixes were not applying at all when the card was not in front.

Only change:
- Corrected side/far Locations CSS selectors from data-slot to data-wall-pos.
- Added a little extra side/far Locations scaling so the title, 2x2 list, copy, and button stay inside the card when it is angled.

No carousel positioning changed.
No background changes.
No header changes.
No other card content changes.
No footer/countdown changes.
No modal behavior changes.
Bottom DFO/firecracker remains removed.
Node JS syntax check passed.
