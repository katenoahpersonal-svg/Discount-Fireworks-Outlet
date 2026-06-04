# Discount Fireworks Outlet — Website

America's 250th · 1776–2026

## 🚀 Deploy to GitHub Pages in 3 Steps

### Step 1 — Create the repository
1. Go to [github.com](https://github.com) and sign in
2. Click **New** (green button, top left)
3. Name it `discount-fireworks-outlet` (or anything you want)
4. Leave it **Public**
5. Click **Create repository**

### Step 2 — Upload the files
1. Click **uploading an existing file** on the next screen
2. Drag and drop everything in this folder into the upload area
3. Scroll down → click **Commit changes**

### Step 3 — Turn on GitHub Pages
1. Go to **Settings** (tab at the top of your repo)
2. Scroll down to **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Branch: **main** · Folder: **/ (root)**
5. Click **Save**

Your site will be live at:
```
https://YOUR-USERNAME.github.io/discount-fireworks-outlet/
```
(takes about 1–2 minutes to go live)

---

## ✏️ Customizing the Site

Open `index.html` in any text editor. At the very top of the `<script>` section you'll find the config block — everything you need to update is there:

```js
const COUNTDOWN_TARGET = new Date("2026-07-04T09:00:00");
const PHONE = "(712) 336-0000";
```

### Adding Real Photos to the Cards
Search for the comments `<!-- Replace with real photo URL -->` in the HTML. Change the `background` inline style on that `div` to:
```html
<div class="c-img" style="background-image:url('your-photo.jpg'); background-size:cover; background-position:center">
```
You can use:
- A photo URL from your website or social media
- Upload a photo to this repo and reference it: `background-image:url('photos/tent.jpg')`

### Updating Location Names / Info
Search for `Spirit Lake`, `Milford`, `Spencer`, `Armstrong` and update as needed.

---

## 📁 File Structure

```
dfo-site/
├── index.html          ← the entire website (single file)
├── .nojekyll           ← tells GitHub not to use Jekyll
├── .github/
│   └── workflows/
│       └── deploy.yml  ← auto-deploys on every push (optional)
└── README.md           ← this file
```

---

## 🔄 Auto-Deploy (Optional)

The included `deploy.yml` workflow automatically re-deploys your site every time you push a change to `main`. To enable it:

1. Go to **Settings → Pages**
2. Under Source, select **GitHub Actions** instead of "Deploy from branch"
3. Done — every `git push` will auto-deploy

---

## Custom Domain (Optional)

If you have your own domain (e.g. `discountfireworksoutlet.com`):

1. Settings → Pages → Custom domain → enter your domain → Save
2. At your domain registrar, add a CNAME record pointing to `YOUR-USERNAME.github.io`
3. Check **Enforce HTTPS** once it verifies
