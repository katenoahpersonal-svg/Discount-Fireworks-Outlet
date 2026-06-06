DFO V50 — Real Ridge Drop / No Fake Rail / No Bottom DFO

Starting point:
- V48 clean manual ridge pass, not V49.

Why:
V49 added an artificial glowing rail above the actual ring. That made the cards still feel fake and floating.
V50 removes the fake rail idea and drops the cards onto the real visible platform ridge.

What changed:
1. Used V48 as base.
2. Removed/hid any track-contact-rail.
3. Kept debug helpers hidden by default; press D to show them.
4. Moved cards much lower with manual y-values:
   far-left/far-right y 74.0
   left/right y 70.0
   center y 68.6
5. Added only a tiny contact bloom/shadow at each card foot.
6. Did not change background, header, card content, footer, modals, countdowns, or assets.
7. Node JS syntax check passed.

Fast tuning:
- Move all cards DOWN: increase every y by +1.0.
- Move center DOWN only: center y 68.6 -> 70.0.
- Move side cards DOWN only: left/right y 70.0 -> 71.5.
- Bring cards closer: reduce far x 33 -> 31 and side x 19.2 -> 18.0.
