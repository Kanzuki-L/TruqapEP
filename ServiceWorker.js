const cacheName = "Evoweb-TruqapEP-0.0.1";
const contentToCache = [
    "Build/6a3995434de98db861218953d140c345.loader.js",
    "Build/795ac81d0fcdaf8da11e2745e1c930d8.framework.js.unityweb",
    "Build/06c0df0e5922259628f831a8d4175892.data.unityweb",
    "Build/2c1fb4c9a2aec6305538f3922ec925f6.wasm.unityweb",
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
