DFO V41 — Cylindrical Wall Carousel / No Bottom DFO

Starting point:
- V40 grounded wall carousel build.

What changed:
1. Rebuilt only the carousel positioning system.
2. Removed the old flat fixed-slot positioning.
3. Added true cylindrical/elliptical wall geometry using angles:
   far-left -42°, left -21°, center 0°, right 21°, far-right 42°.
4. x, z, bottom, rotateY, and scale now all come from the same angular station.
5. Side cards intentionally sit slightly lower on the same ring baseline.
6. Bottom DFO/firecracker remains removed.
7. Header, background, card content, footer, modals, and countdowns were not redesigned.
8. JavaScript syntax check passed.

Upload:
- index.html

QA to check in browser:
- Side cards should sit on the same orange ring/ellipse, not float.
- Far-left/far-right should feel farther back and smaller.
- The five cards should read like panels on a curved wall.
