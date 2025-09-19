const cacheName = "Evoweb-TruqapEP-0.0.1";
const contentToCache = [
    "Build/07aec5b87522e5ee9ed290da81fe9e3d.loader.js",
    "Build/5dfbd1306a74518362440e5983f7b1e9.framework.js.unityweb",
    "Build/152fb10bd66c98341af90b28dc42f32a.data.unityweb",
    "Build/6e0d3836fe94145f1edb6b84c5a98715.wasm.unityweb",
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
