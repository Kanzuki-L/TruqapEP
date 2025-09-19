const cacheName = "Evoweb-TruqapEP-0.0.1";
const contentToCache = [
    "Build/f21218d6efbca80fd5a9a01156619e4b.loader.js",
    "Build/795ac81d0fcdaf8da11e2745e1c930d8.framework.js.unityweb",
    "Build/5a8d1e7ac01cc7019a4dfe29b365ce09.data.unityweb",
    "Build/13cf74fc551556b21be9f68a99676655.wasm.unityweb",
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
