const cacheKey = `vMainCacheKey`;
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
self.addEventListener("fetch", (evt) => {
  const autoFetch = (evt, timeout) => {
    const exploitCache = (request, resolve, reject) => {
      caches.open(cacheKey).then((cache) => {
        let pathname = new URL(request.url).pathname;
        cache.match(pathname).then((matching) => {
          if (matching) resolve(matching);
          else if (request.headers.get("accept")?.includes("text/html")) {
            cache.match("index.html").then((matching) => {
              if (matching) resolve(matching);
              else if (reject) reject(`fetch error: (${request.url})`);
            });
          } else if (reject && !pathname.startsWith("/favicon.ico"))
            reject(`fetch error: (${request.url})`);
          else if (reject) resolve("");
        }); 
      })
    };
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        exploitCache(evt.request, resolve);
      }, timeout);
      caches.open(cacheKey).then((cache) => {
        new Promise((resolve) =>
          cache.match(evt.request.url.split("?")[0]).then((matching) => {
            if (matching) resolve(matching);
            else if (evt.request.headers.get("accept")?.includes("text/html"))
              cache.match("index.html").then((matching) => resolve(matching));
            else resolve(null);
          })
        ).then((matching) => {
          let request = new Request(evt.request);
          if (matching) {
            const headers = new Headers(evt.request.headers);
            headers.set(
              "v-last-modified",
              matching.headers.get("last-modified")
            );
            headers.set(
              "v-file-origin",
              matching.headers.get("v-file-origin") ||
                new URL(request.url).pathname
            );
            request = new Request(request, {
              mode: "cors",
              // credentials: "omit",
              headers: headers,
            });
          }
          fetch(request)
            .then((response) => {
              clearTimeout(timeoutId);
              if (response.status >= 500 || response.headers.get("v-cache-ok") === "true") {
                exploitCache(request, resolve, reject);
              } else {
                let lastModified = response.headers.get("last-modified");
                let vCustomCache = response.headers.get("v-custom-cache");
                if (lastModified && vCustomCache) {
                  const responseClone = response.clone();
                  const pathname =
                    response.headers.get("v-file-origin") === "/"
                      ? "index.html"
                      : new URL(request.url).pathname;
                  cache.match(pathname).then((matching) => {
                    if (
                      !matching ||
                      new Date(matching.headers.get("last-modified")) <
                        new Date(lastModified)
                    ) {
                      cache.put(pathname, responseClone);
                      if (matching) console.log(`Cache updated (${pathname})`);
                    }
                  });
                }
                resolve(response);
              }
            })
            .catch((err) => {
              exploitCache(request, resolve, reject);
            });
        });
      });
    });
  };
  evt.respondWith(autoFetch(evt, 3000));
});
self.addEventListener("push", function (e) {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
  });
});
console.log("--<< Service-Worker Updated. >>--");
