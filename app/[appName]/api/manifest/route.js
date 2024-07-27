export async function GET(req, { params }) {
    const { appName } = params;

    let manifest = {
      name: appName,
      short_name: appName,
      start_url: `/${appName}/gem-runner`,
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
  