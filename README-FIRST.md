# DFO V32 Pixel-Match Artboard Proof

This is the locked visual proof build.

Upload these to the root of your GitHub Pages repo:

- index.html
- .nojekyll
- assets/dfo-pixel-match-reference-artboard-1920x1080.png

What this does:
- Uses the uploaded reference image as the visual source of truth.
- Converts it into a 1920x1080 artboard without cropping the vertical design.
- Adds clickable hotspots over the cards/nav/arrows/footer.
- Includes working modals for videos, locations, contact/build show, favorites, and Facebook social feed.
- Keeps the DFO firecracker/logo exactly where the reference shows it because it is part of the visual artboard.

What is intentionally not editable yet:
- The visible card text/images/header/countdown are baked into the artboard for pixel-match proof.
- Arrow clicks track rotation state but do not visually swap cards in this proof.
- Once this screenshot is approved, rebuild the editable layer version against this exact artboard using these measured positions.

Why:
Previous builds failed because the code kept redesigning the background, card spacing, and firecracker placement. This locks the exact look first.
