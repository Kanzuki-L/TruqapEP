const cacheName = "Evoweb-TruqapEP-0.0.1";
const contentToCache = [
    "Build/75b1a9d5833c2d2fe3e17af79121f0af.loader.js",
    "Build/80303c272c70e529ae98c0fd9bc7ca22.framework.js.unityweb",
    "Build/a0fc53b1b485e4211f4cafcf702233fe.data.unityweb",
    "Build/ed5f4991c16c8eeb7f439458db62a79d.wasm.unityweb",
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
