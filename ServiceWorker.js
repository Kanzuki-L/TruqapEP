const cacheName = "Evoweb-TruqapEP-0.0.1";
const contentToCache = [
    "Build/5611540c76a30e0e29a744243ef6a974.loader.js",
    "Build/80303c272c70e529ae98c0fd9bc7ca22.framework.js.unityweb",
    "Build/9f630b5a2ba67b89e90b45a9234c90eb.data.unityweb",
    "Build/48df3b11c44702b465321e86ea67441c.wasm.unityweb",
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
