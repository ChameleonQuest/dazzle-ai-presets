// /app/api/service-worker/[appName]/route.js
export async function GET(req, { params }) {
    const { appName } = params;
  
    const serviceWorkerScript = `
      self.addEventListener('install', (event) => {
        console.log('Service Worker installing for ${appName}.');
      });
  
      self.addEventListener('activate', (event) => {
        console.log('Service Worker activating for ${appName}.');
      });
  
      self.addEventListener('fetch', (event) => {
        console.log('Fetching:', event.request.url);
  
        event.respondWith(
          caches.match(event.request).then((response) => {
            return response || fetch(event.request);
          })
        );
      });
    `;
  
    return new Response(serviceWorkerScript, {
        headers: {
          'Content-Type': 'application/javascript',
          'Service-Worker-Allowed': '/${appName}', // Set the allowed scope here
        },
      });
  }
  