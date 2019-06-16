self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cic-cache-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/css/styles.min.css',
        '/app.js',
        '/assets/js/sidenav.js',
        '/assets/placeholderpage.html'
      ]);
    }).catch(function(err){console.log("Error at sw-install: "+err);})
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
      return fetch(event.request).then(function (response) {
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        
        let responseClone = response.clone();
        caches.open('cic-cache-v1').then(function (cache) {
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
