const cacheName = "Evoweb-Truqap-0.0.1";
const contentToCache = [
    "Build/5ce8f6fba9bb6147f7fcd17fba0f7c70.loader.js",
    "Build/4045c43b9c6c5cc20373efd2db95cb59.framework.js.unityweb",
    "Build/9f125a852c5ba357edd559427176c860.data.unityweb",
    "Build/aeccec96026b0257780650cd04013536.wasm.unityweb",
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
