const cacheName = "Evoweb-TruqapEP-0.0.1";
const contentToCache = [
    "Build/85f551ee86ae0c8f3f253b98c5178f31.loader.js",
    "Build/5dfbd1306a74518362440e5983f7b1e9.framework.js.unityweb",
    "Build/22c094914e3181c57da922384c5ebd38.data.unityweb",
    "Build/ad51e11e59f414fcccb2b78f26664027.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
