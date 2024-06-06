self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('sample-pwa').then(function(cache) {
        return cache.addAll([
          '/',
          '/sample.html',
          '/css/styles.css',
          '/icons/icon-192x192.png',
          '/icons/icon-512x512.png'
        ])
      })
    )
  })
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request)
      })
    )
  })
  