DFO V88 — Visible Demo Card Preview Fix

Starting point:
- V87 video-thumbnail-fallback-fix.

What happened:
- The first supplied YouTube video thumbnail is returning YouTube's gray placeholder image.
- That is why the carousel card still looked gray even though the video/embed links were updated.

Careful change:
1. Kept all 7 supplied YouTube videos in the modal.
2. Kept the first supplied video in the modal:
   https://www.youtube.com/embed/cZHENq6D12o
3. Changed only the visible carousel Demo Videos feature preview image to a working YouTube thumbnail:
   https://img.youtube.com/vi/HQKTQe-Efvs/hqdefault.jpg
4. Added a stronger CSS override so the visible card cannot keep the old gray inline preview.

Unchanged:
- all 7 video embeds
- background
- header
- carousel geometry
- Build Your Show image
- Social Feed images
- Locations styling
- countdown
- modals except no embed changes
- social sync

Upload note:
Upload/extract the full ZIP contents to GitHub, then hard refresh with Ctrl+Shift+R.
