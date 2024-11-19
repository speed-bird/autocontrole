const CACHE_NAME = 'autocontrole-cache-v1';
const FILES_TO_CACHE = [
  '/', // La page d'accueil
  '/index.html',
  '/static/js/bundle.js',
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js',
  '/static/css/main.chunk.css',
  '/static/media/logo.svg',
  // Ajoutez d'autres fichiers ou ressources que vous souhaitez mettre en cache ici
];

// Installation du service worker et mise en cache des fichiers statiques
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Ouvrir le cache et mettre en cache les fichiers');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

// Activation du service worker et suppression des anciens caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepter les requêtes et renvoyer les ressources depuis le cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Si la ressource est dans le cache, l'utiliser
        }

        // Si la ressource n'est pas dans le cache, la télécharger depuis le réseau
        return fetch(event.request);
      })
  );
});
