#!/usr/bin/env node

/**
 * DFO Facebook Social Feed Image Sync
 *
 * What this does:
 * - Fetches the newest Facebook Page photo/image candidates.
 * - Downloads the newest 6 images.
 * - Crops/resizes them square.
 * - Saves them as:
 *   assets/social-feed-01.jpg
 *   assets/social-feed-02.jpg
 *   assets/social-feed-03.jpg
 *   assets/social-feed-04.jpg
 *   assets/social-feed-05.jpg
 *   assets/social-feed-06.jpg
 *
 * Required env vars:
 * - FACEBOOK_PAGE_ACCESS_TOKEN
 *
 * Optional env vars:
 * - FACEBOOK_PAGE_ID = DFOBoji by default. A numeric Page ID is safest.
 * - FACEBOOK_GRAPH_VERSION = v25.0 by default.
 * - FACEBOOK_SYNC_REQUIRED = true to fail if token/images are missing.
 */

const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

let sharp;
try {
  sharp = require("sharp");
} catch (error) {
  console.error("\nMissing dependency: sharp");
  console.error("Run: npm install");
  console.error("Then retry: npm run sync:facebook\n");
  process.exit(1);
}

const ROOT = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT, "assets");
const PAGE_ID = process.env.FACEBOOK_PAGE_ID || "DFOBoji";
const TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
const GRAPH_VERSION = process.env.FACEBOOK_GRAPH_VERSION || "v25.0";
const REQUIRED = String(process.env.FACEBOOK_SYNC_REQUIRED || "").toLowerCase() === "true";

function failOrWarn(message) {
  if (REQUIRED) {
    console.error(message);
    process.exit(1);
  }
  console.warn(message);
  console.warn("Keeping the existing social-feed images.");
  process.exit(0);
}

function hashString(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

async function graphGet(edge, params = {}) {
  const url = new URL(`https://graph.facebook.com/${GRAPH_VERSION}/${edge.replace(/^\//, "")}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  }
  url.searchParams.set("access_token", TOKEN);

  const res = await fetch(url);
  const body = await res.text();

  let data;
  try {
    data = JSON.parse(body);
  } catch {
    throw new Error(`Facebook returned non-JSON response for ${edge}: ${body.slice(0, 300)}`);
  }

  if (!res.ok || data.error) {
    const msg = data.error ? `${data.error.message} (${data.error.type || "Graph API error"})` : body;
    throw new Error(`Facebook Graph API error for ${edge}: ${msg}`);
  }

  return data;
}

function bestFacebookImage(images = []) {
  if (!Array.isArray(images) || images.length === 0) return null;
  const sorted = [...images].sort((a, b) => (b.width || 0) - (a.width || 0));
  return sorted[0]?.source || null;
}

function collectAttachmentImages(attachment, created_time, out = []) {
  if (!attachment) return out;

  const src = attachment?.media?.image?.src;
  if (src) {
    out.push({
      source: src,
      created_time,
      link: attachment?.target?.url || "",
      id: hashString(src),
      origin: "feed_attachment"
    });
  }

  const subs = attachment?.subattachments?.data || [];
  for (const sub of subs) collectAttachmentImages(sub, created_time, out);

  return out;
}

async function getPhotoCandidates() {
  const candidates = [];

  // 1) Most direct source: Page uploaded photos.
  try {
    const photos = await graphGet(`/${PAGE_ID}/photos`, {
      type: "uploaded",
      fields: "id,created_time,link,name,images",
      limit: 100
    });

    for (const photo of photos.data || []) {
      const source = bestFacebookImage(photo.images);
      if (!source) continue;
      candidates.push({
        id: photo.id || hashString(source),
        source,
        created_time: photo.created_time || "",
        link: photo.link || "",
        origin: "page_photos"
      });
    }
  } catch (error) {
    console.warn("Could not fetch /photos. Will try /feed attachments too.");
    console.warn(error.message);
  }

  // 2) Backup source: Page feed attachments with images.
  try {
    const feed = await graphGet(`/${PAGE_ID}/feed`, {
      fields: "id,created_time,permalink_url,attachments{media,type,target,subattachments}",
      limit: 50
    });

    for (const post of feed.data || []) {
      const attachments = post.attachments?.data || [];
      for (const attachment of attachments) {
        const found = collectAttachmentImages(attachment, post.created_time, []);
        for (const item of found) {
          item.link = post.permalink_url || item.link || "";
          candidates.push(item);
        }
      }
    }
  } catch (error) {
    console.warn("Could not fetch /feed attachments.");
    console.warn(error.message);
  }

  const seen = new Set();
  const deduped = [];

  for (const item of candidates) {
    const key = item.id || hashString(item.source);
    if (!item.source || seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }

  deduped.sort((a, b) => new Date(b.created_time || 0) - new Date(a.created_time || 0));
  return deduped;
}

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "DFO-social-feed-sync/1.0"
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to download image: ${res.status} ${res.statusText}`);
  }

  return Buffer.from(await res.arrayBuffer());
}

async function processImageToSquare(inputBuffer, outputPath) {
  await sharp(inputBuffer)
    .rotate()
    .resize(1000, 1000, {
      fit: "cover",
      position: "attention"
    })
    .jpeg({
      quality: 90,
      mozjpeg: true
    })
    .toFile(outputPath);
}

async function main() {
  if (!TOKEN) {
    failOrWarn("Missing FACEBOOK_PAGE_ACCESS_TOKEN.");
  }

  await fs.mkdir(ASSETS_DIR, { recursive: true });

  console.log(`Fetching Facebook images from Page: ${PAGE_ID}`);
  console.log(`Graph API version: ${GRAPH_VERSION}`);

  const candidates = await getPhotoCandidates();

  if (candidates.length < 1) {
    failOrWarn("No Facebook image candidates found.");
  }

  const selected = candidates.slice(0, 6);
  console.log(`Found ${candidates.length} image candidates. Updating ${selected.length} image(s).`);

  const metadata = [];

  for (let i = 0; i < 6; i++) {
    const target = path.join(ASSETS_DIR, `social-feed-${String(i + 1).padStart(2, "0")}.jpg`);
    const item = selected[i];

    if (!item) {
      console.warn(`No Facebook image for slot ${i + 1}; keeping existing ${path.basename(target)}.`);
      continue;
    }

    console.log(`Downloading slot ${i + 1}: ${item.created_time || "unknown date"} (${item.origin})`);
    const buffer = await downloadBuffer(item.source);
    await processImageToSquare(buffer, target);

    metadata.push({
      slot: i + 1,
      file: `assets/social-feed-${String(i + 1).padStart(2, "0")}.jpg`,
      facebook_id: item.id || null,
      facebook_link: item.link || null,
      created_time: item.created_time || null,
      origin: item.origin || null,
      synced_at: new Date().toISOString()
    });
  }

  await fs.writeFile(
    path.join(ASSETS_DIR, "social-feed.json"),
    JSON.stringify(
      {
        page_id: PAGE_ID,
        graph_version: GRAPH_VERSION,
        synced_at: new Date().toISOString(),
        count: metadata.length,
        images: metadata
      },
      null,
      2
    ) + "\n",
    "utf8"
  );

  console.log("Facebook social image sync complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
