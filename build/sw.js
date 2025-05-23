const cacheName = "my-first-pwa";
const filesToCache = ["/static/*"];
const self = this;
self.addEventListener("install", (e) => {
  console.log("[ServiceWorker**] Install");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[ServiceWorker**] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener("activate", () => {
  caches.keys().then((keyList) => {
    return Promise.all(
      keyList.map((key) => {
        if (key !== cacheName) {
          console.log("[ServiceWorker] - Removing old cache", key);
          return caches.delete(key);
        }
        return key;
      })
    );
  });
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((response) => {
      return response || fetch(event.request);
    })
  );
});
