const cacheName = "Evoweb-TruqapEP-0.0.1";
const contentToCache = [
    "Build/138b897cbeb4447f8286d08805b0f93c.loader.js",
    "Build/4c28203f380beb74eeea986f2a736d0a.framework.js.unityweb",
    "Build/606929126c56e86e386ec2aafa21e9b6.data.unityweb",
    "Build/98c5d5deff4fb2ec8dd0b553bf10ef61.wasm.unityweb",
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
