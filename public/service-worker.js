self.addEventListener('install', event => {
  console.log("✅ Service Worker installé");
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log("⚡ Service Worker activé");
});

self.addEventListener('fetch', event => {
  // Tu pourras ajouter du cache ici plus tard
});
