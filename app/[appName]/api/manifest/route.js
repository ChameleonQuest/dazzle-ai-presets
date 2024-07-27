export async function GET(req, { params }) {
    let { appName } = params;
    let url = new URL(req.url, `http://${req.headers.host}`);
    let context = url.searchParams.get('context');
    let prompt = url.searchParams.get('prompt');
  
    let manifest = {
      name: appName,
      short_name: appName,
      start_url: `/${appName}/gem-runner?context=${encodeURIComponent(context)}&prompt=${encodeURIComponent(prompt)}`,
      display: "standalone",
      background_color: "#cccccc",
      description: `${appName} PWA`,
      icons: [
        {
          src: "/images/dazzle-icon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/images/dazzle-icon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    };
  
    return new Response(JSON.stringify(manifest), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  