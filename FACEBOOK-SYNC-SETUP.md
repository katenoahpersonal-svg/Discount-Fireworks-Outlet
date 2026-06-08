# DFO V68 Facebook Auto-Sync Setup

The homepage is still a static site. The Social Feed card still reads these files:

- assets/social-feed-01.jpg
- assets/social-feed-02.jpg
- assets/social-feed-03.jpg
- assets/social-feed-04.jpg
- assets/social-feed-05.jpg
- assets/social-feed-06.jpg

V68 adds an automation script that can replace those six files with the newest images from the Facebook Page.

## What you still need

You need a private Facebook Page access token.

Do not paste the token into index.html.
Do not put the token in front-end JavaScript.
Do not upload the token publicly.

## The files I added

- scripts/sync-facebook-images.js
- package.json
- .env.example
- .github/workflows/sync-facebook-images.yml
- assets/social-feed.json gets created/updated when sync runs

## If you host from GitHub, GitHub Pages, Netlify, or Vercel connected to GitHub

This is the easiest setup.

1. Upload this full V68 project to your GitHub repo.
2. In GitHub, open the repo.
3. Go to Settings → Secrets and variables → Actions.
4. Add these Repository secrets:

   FACEBOOK_PAGE_ID
   FACEBOOK_PAGE_ACCESS_TOKEN

5. Set FACEBOOK_PAGE_ID to:

   DFOBoji

   A numeric Facebook Page ID is even better if you have it.

6. Set FACEBOOK_PAGE_ACCESS_TOKEN to your Page access token.
7. Go to the Actions tab.
8. Run “Sync Facebook social images” manually once.
9. After that, it runs every 3 hours.

If your host auto-deploys from GitHub, the updated images will deploy automatically after the workflow commits the changed images.

## If you do NOT use GitHub at all

You need a host that can run Node on a schedule or before build.

Use this command:

npm install
FACEBOOK_PAGE_ID=DFOBoji FACEBOOK_PAGE_ACCESS_TOKEN=YOUR_TOKEN npm run sync:facebook

Then deploy the updated assets folder.

A purely static upload host with no GitHub, no scheduled job, and no build step cannot auto-update Facebook images by itself. It can show the images, but something has to fetch and save them.

## Local test

1. Install Node 18 or newer.
2. Run:

npm install

3. Run:

FACEBOOK_PAGE_ID=DFOBoji FACEBOOK_PAGE_ACCESS_TOKEN=YOUR_TOKEN npm run sync:facebook

On Windows PowerShell:

$env:FACEBOOK_PAGE_ID="DFOBoji"
$env:FACEBOOK_PAGE_ACCESS_TOKEN="YOUR_TOKEN"
npm run sync:facebook

## How the script chooses images

1. It tries Facebook Page uploaded photos first.
2. It also checks Page feed image attachments.
3. It sorts newest first.
4. It downloads the newest 6.
5. It crops/resizes them square.
6. It saves them to the filenames the homepage already uses.

## If the token fails

Usually it is one of these:

- token missing
- token expired
- token does not have Page access
- Meta app/page permissions are not set correctly
- Page ID/username is wrong

The existing social images will stay in place unless FACEBOOK_SYNC_REQUIRED=true.
