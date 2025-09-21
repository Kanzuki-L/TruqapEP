const cacheName = "Evoweb-TruqapEP-0.0.1";
const contentToCache = [
    "Build/d9d9830623ab0dae121296b0a44cb2f6.loader.js",
    "Build/5dfbd1306a74518362440e5983f7b1e9.framework.js.unityweb",
    "Build/ee466d7b295a9ff68ac0c83f79f1b474.data.unityweb",
    "Build/b2490a5ce91c90a1b3fe805bc51f0764.wasm.unityweb",
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
