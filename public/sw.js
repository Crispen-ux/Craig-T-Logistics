/* Craig-T Logistics service worker: network-first pages, cache-first static assets. */
const VERSION = "ct-v1";
const PAGES = `ct-pages-${VERSION}`;
const ASSETS = `ct-assets-${VERSION}`;
const OFFLINE = "/offline.html";
const PRECACHE = [OFFLINE];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.endsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  // Pages: network first, cached copy as fallback, offline page last.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(PAGES).then((cache) => cache.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(async () => (await caches.match(req)) || (await caches.match(OFFLINE)))
    );
    return;
  }

  // Static assets: cache first, refresh in the background.
  const isAsset =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/downloads/") ||
    ["style", "script", "font", "image"].includes(req.destination);
  if (!isAsset) return;

  event.respondWith(
    caches.open(ASSETS).then(async (cache) => {
      const hit = await cache.match(req);
      const network = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => hit);
      return hit || network;
    })
  );
});
