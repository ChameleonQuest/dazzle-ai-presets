export async function GET(req, { params }) {
    const { appName } = params;
  
    const serviceWorkerScript = `
        self.addEventListener('fetch', (event) => {
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
          'Service-Worker-Allowed': `/${appName}`,
        },
      });
  }
  