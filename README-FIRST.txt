DFO V51 — Foreground Ring Occlusion / Stage Composite / No Bottom DFO

Starting point:
- V50 real ridge drop.

What changed:
1. Did not redesign background/header/cards/footer/modals/countdowns.
2. Added rear-atmosphere-layer behind the cards:
   - orange bloom
   - haze
   - light wash to connect cards to stage
3. Added foreground-ring-occlusion above the cards:
   - transparent CSS overlay
   - front orange ring lip
   - warm reflection haze
   - subtle shadow/bloom
4. The foreground ring overlay sits above the lower card edges so the platform can visually pass in front of the cards.
5. Kept individual card contact shadows below the foreground overlay.
6. Kept manual SLOT_CONFIG from V50.
7. Kept bottom DFO/firecracker removed.
8. Debug helpers remain hidden by default. Press D to show them.
9. Node JS syntax check passed.

Why this matters:
The reference image works because the environment is composited both behind and in front of the cards.
V51 adds that missing foreground occlusion layer so the cards stop reading as pasted on top of a flat background.

Fast tuning:
- If overlay covers too much card: set .foreground-ring-occlusion top from 70.4% to 71.2% or lower opacity.
- If cards still float: set top from 70.4% to 69.6% and/or increase opacity.
- If the ring lip is too strong: lower opacity of .foreground-ring-occlusion::before.
- If the haze is too smoky: lower opacity of .foreground-ring-occlusion::after.
