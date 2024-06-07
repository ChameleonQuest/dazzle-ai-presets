self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sample-pwa').then(function(cache) {
      return cache.addAll([
        '/',
        // '/gem-runner',
        '/css/styles.css',
        '/images/dazzle-icon-192x192.png',
        '/images/dazzle-icon-512x512.png'
      ])
    })
  )
})

self.addEventListener('activate', event => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request)
    })
  )
})
  