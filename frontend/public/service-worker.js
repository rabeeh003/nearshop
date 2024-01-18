const  CASH_NAME = 'version-1';
const urlsToCache = ["index.html", "offline.html"]

// install sw
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CASH_NAME).then(cache => {
            console.log("oppend cache");
            return cache.addAll(urlsToCache)
        })
    )
})


// Listen for requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(() => {
            return fetch(event.request)
             .catch(() => caches.match('offline.html'))
        })
    )
})

// active the sw
self.addEventListener('activate', event => {
    const cacheWhitelist = []
    cacheWhitelist.push(CASH_NAME)
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName!== CASH_NAME) {
                        console.log("delete cache");
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})