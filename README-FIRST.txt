DFO V52 — Cinematic Image-State Carousel

This is the new approach:
- Desktop hero uses full-scene cinematic state images instead of live HTML cards.
- Header, countdowns, footer, modals, links, and hotspots are real coded layers.
- The carousel switches between 5 image states:
  1. Videos centered
  2. Locations centered
  3. Build Your Show centered
  4. Finale Favorites centered
  5. Social centered

Important note:
The state images are built from the available visual proofs/assets in this chat.
They are not brand-new AI generations, because this environment cannot generate new images directly.
The structure is now correct for the approach: once truly final AI state images are generated, replace the JPGs in /assets with the same filenames.

Upload to GitHub Pages:
- index.html
- assets folder

Hotkeys:
- ArrowLeft / ArrowRight: rotate states
- H: show invisible hotspot zones for debugging

QA:
- Exactly 5 state images.
- Videos starts centered.
- Header is coded.
- Bottom countdown is coded.
- Footer is coded.
- Modals are coded.
- Main desktop carousel no longer uses live HTML cards.
