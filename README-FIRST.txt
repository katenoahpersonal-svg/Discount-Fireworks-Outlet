DFO V105 — Full Upload + GitHub Pages Deploy Fix

Starting point:
- Built from V104 nav-card-targets-button-color-only.

Included:
- Everything from V104.
- No visual/layout/card/clock/header changes.
- Added GitHub Pages workflow fix.

New in V105:
1. Added/updated:
   .github/workflows/pages.yml

2. The workflow includes the deploy permissions GitHub Pages needs:
   permissions:
     contents: read
     pages: write
     id-token: write

3. It deploys the full static site folder to GitHub Pages.

Upload instructions:
1. Extract this ZIP.
2. Upload ALL extracted files/folders to the repo root.
3. Include hidden folders if your unzip tool shows them:
   .github/workflows/pages.yml
4. If GitHub asks, choose “Commit changes.”
5. Go to Settings > Pages and set Source to “GitHub Actions.”
6. Wait for Actions to finish.
7. Hard refresh your site with Ctrl + Shift + R.

Important:
- Do not upload only index.html this time.
- Upload the full folder contents, including assets, scripts, site.webmanifest, and .github.
