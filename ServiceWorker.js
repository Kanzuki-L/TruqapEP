const cacheName = "Evoweb-TruqapEP-0.0.1";
const contentToCache = [
    "Build/08ed508d922e3fdef08225a76af53b88.loader.js",
    "Build/5dfbd1306a74518362440e5983f7b1e9.framework.js.unityweb",
    "Build/87288b42fec37ddbc1219cdb276cf983.data.unityweb",
    "Build/9efc1d337f9704a867fc17673ecbfe01.wasm.unityweb",
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
