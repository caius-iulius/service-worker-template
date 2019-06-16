var toCache = [
        '/',
        '/assets/css/styles.min.css',
        '/app.js',
        '/assets/js/sidenav.js',
        '/assets/placeholderpage.html'
];
var cacheName = 'cic-cache-v1';
var swVersion = 'v0.1.0';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(toCache);
    }).catch(function(err){console.log("Error at sw-install: "+err);})
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open(cacheName).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/assets/placeholderpage.html');
      });
    }
  }));
});
