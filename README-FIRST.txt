DFO V59 — Symmetry-Locked Mirrored Slots

Starting point:
- V57 live-card carousel.
- V58 is intentionally skipped because it changed the right side independently.

What changed:
- Rebuilt SLOT_CONFIG as a locked mirror pair system.

Rules:
- far-left and far-right use the same y/z/scale/width/height.
- left and right use the same y/z/scale/width/height.
- x values are exact opposites.
- rotateY values are exact opposites.
- faceRotate values are exact opposites.
- faceSkew values are exact opposites.

Current values:
- far-left:  x -33.0, y 76.8
- left:      x -19.2, y 78.0
- center:    x   0.0, y 75.6
- right:     x  19.2, y 78.0
- far-right: x  33.0, y 76.8

No background changes.
No header changes.
No content changes.
No carousel behavior changes.
No countdown changes.
No footer changes.
Bottom DFO/firecracker remains removed.
Large V51 occlusion remains disabled by default.
Debug helpers remain hidden by default; press D if needed.

Node JS syntax check passed.
