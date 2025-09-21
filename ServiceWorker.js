const cacheName = "Evoweb-TruqapEP-0.0.1";
const contentToCache = [
    "Build/d9d9830623ab0dae121296b0a44cb2f6.loader.js",
    "Build/5dfbd1306a74518362440e5983f7b1e9.framework.js.unityweb",
    "Build/1d5601c5d94e43cc2a49db8a5b56cf07.data.unityweb",
    "Build/d931adebfc6f29d24cc8b0377760252b.wasm.unityweb",
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
