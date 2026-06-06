DFO V46 — Per-Slot Ridge-Lock Carousel / No Bottom DFO

Starting point:
- V45 projected ring-lock carousel.

What changed:
1. Kept V45 ellipse projection.
2. Added individual per-slot ridge offsets because the visible ring is not a perfect mathematical ellipse.
3. Moved the front card up a few notches:
   center ridgeOffset = +0.030 scene height
4. Adjusted behind cards individually:
   far-left/far-right = -0.020 scene height
   left/right = +0.008 scene height
5. Tightened the angle/radius slightly:
   angles = -37, -18.5, 0, 18.5, 37
   radiusX = scene width * 0.338
6. Kept corrected card rotation direction.
7. Kept bottom DFO/firecracker removed.
8. Did not change background, header, card content, modals, footer, countdowns, or assets.
9. Node JS syntax check passed.

Fast tuning knobs after browser test:
- Center front too low? Increase ridgeOffsetMap["0"] from 0.030 to 0.040.
- Center front too high? Decrease ridgeOffsetMap["0"] from 0.030 to 0.020.
- Side cards too high? Lower ridgeOffsetMap["-1"] and ["1"].
- Far cards too low? Raise ridgeOffsetMap["-2"] and ["2"].
- Cards still too far apart? Lower ellipseRadiusX from 0.338 to 0.320.
- Cards overlap too much? Raise ellipseRadiusX from 0.338 to 0.355.
