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

self.addEventListener('fetch', function(event) { //cache first
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
        
        caches.open('cic-cache-v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/assets/placeholderpage.html');
      });
    }
  }));
});
