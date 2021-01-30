const staticCacheName = 'v1::node-template'

this.addEventListener('install', event => {
  this.skipWaiting()

  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll([
        '/offline.html'
      ])
    })
  )
})

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    }).catch(() => {
      return caches.match('/offline.html')
    })
  )
})
