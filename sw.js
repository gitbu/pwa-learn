self.importScripts('data/games.js');

// Files to cache
var cacheName = 'js13kPWA-v1';
var appShellFiles = [
  // '/pwa-learn/index.html',
  '/pwa-learn/app.js',
  '/pwa-learn/style.css',
  '/pwa-learn/fonts/graduate.eot',
  '/pwa-learn/fonts/graduate.ttf',
  '/pwa-learn/fonts/graduate.woff',
  '/pwa-learn/favicon.ico',
  '/pwa-learn/img/js13kgames.png',
  '/pwa-learn/img/bg.png',
  '/pwa-learn/icons/icon-32.png',
  '/pwa-learn/icons/icon-64.png',
  '/pwa-learn/icons/icon-96.png',
  '/pwa-learn/icons/icon-128.png',
  '/pwa-learn/icons/icon-168.png',
  '/pwa-learn/icons/icon-192.png',
  '/pwa-learn/icons/icon-256.png',
  '/pwa-learn/icons/icon-512.png'
];
var gamesImages = [];
for(var i=0; i<games.length; i++) {
  gamesImages.push('data/img/'+games[i].slug+'.jpg');
}
var contentToCache = appShellFiles.concat(gamesImages);

// Installing Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('----------startaaa----------');
  console.log('----------xxxxxxxxxxxxxxxxxxxx----------');
  e.waitUntil(Promise.resolve())
})


// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
  console.log('fetching')
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: ' + e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
