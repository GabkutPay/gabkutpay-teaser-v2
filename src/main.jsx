if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log("✅ ServiceWorker enregistré"))
      .catch(err => console.error("❌ Erreur ServiceWorker", err));
  });
}
