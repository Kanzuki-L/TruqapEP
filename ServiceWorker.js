const cacheName = "Evoweb-Truqap-0.0.1";
const contentToCache = [
    "Build/0a080903b2b7c90a461037c84a1bafe1.loader.js",
    "Build/4045c43b9c6c5cc20373efd2db95cb59.framework.js.unityweb",
    "Build/53e548312bec4982448da68bd8af485a.data.unityweb",
    "Build/54deb8572f34b8b9db403c43d2e93dc9.wasm.unityweb",
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
