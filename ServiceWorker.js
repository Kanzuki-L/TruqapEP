const cacheName = "Evoweb-TruqapEP-0.0.1";
const contentToCache = [
    "Build/447209a52433f44ae157cf6cde6e737c.loader.js",
    "Build/80303c272c70e529ae98c0fd9bc7ca22.framework.js.unityweb",
    "Build/6dfba43f94d06ce785de949bd5c4edd8.data.unityweb",
    "Build/191b16e61433d65a8e74830ee5bece6e.wasm.unityweb",
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
