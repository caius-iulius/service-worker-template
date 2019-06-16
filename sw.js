var toCache = [
        '/',
        '/index.html',
        '/assets/css/styles.min.css',
        '/app.js',
        '/assets/js/sidenav.js',
        '/assets/placeholderpage.html'
];
var cacheName = 'cic-cache-v1';
var swVersion = 'v0.1.1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(toCache);
    }).catch(function(err){console.log("Error at sw-install: "+err);})
  );
});

self.addEventListener('fetch', function(event) { //network first
  event.respondWith(caches.match(event.request).then(function(response) {
      return fetch(event.request).then(function (response) {
        let responseClone = response.clone();
        caches.open(cacheName).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        
        return response;
      }).catch(function () {
        if (response !== undefined) {
          return response;
        } else {
          return caches.match('/assets/placeholderpage.html');
        }
      });
  }));
});

