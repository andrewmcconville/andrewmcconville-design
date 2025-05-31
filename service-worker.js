// This is a basic service worker for Vite + Vue 3 PWA offline support
const CACHE_NAME = 'amc-design-cache-v1';
const ASSETS = [
  '/andrewmcconville-design/',
  '/andrewmcconville-design/index.html',
  '/andrewmcconville-design/manifest.json',
  '/andrewmcconville-design/assets/icons/favicon-32x32.png',
  '/andrewmcconville-design/assets/about/home-social-media.png',
  // Add more assets as needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        ASSETS.map(asset => fetch(asset).then(response => {
          if (response.ok) return cache.put(asset, response);
        }).catch(() => {/* ignore failed asset */}))
      )
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
