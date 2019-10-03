const CACHE_NAME = "v1";
// const  catch_Urls = ["/", "/index.js"];

self.addEventListener("install", e => {
  console.log('Service worker is installed');
});

self.addEventListener('activate', e=> {
  console.log('service worker Activated');
  e.waitUntil(
      caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
              if(CACHE_NAME.indexOf(key) === -1) {
                  return caches.delete(key);
              }
          }));
      })
  )
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
        .then(r=> {
            return r || fetch(e.request)
                .then(response=> {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(e.request, response.clone());
                        return response;
                    })
                })
        }).catch(err=> {
            console.log(err);
            caches.open(CACHE_NAME).then(r=> r);
        })
  )
});
