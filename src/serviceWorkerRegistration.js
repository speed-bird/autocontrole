// serviceWorkerRegistration.js

// Si l'environnement est de production, enregistrez le service worker
export function register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log('Service Worker enregistré avec succès :', registration);
          })
          .catch((error) => {
            console.error('Erreur lors de l\'enregistrement du Service Worker :', error);
          });
      });
    }
  }
  