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

