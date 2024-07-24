export async function GET(req, { params }) {
    const { appName } = params;

    // let { searchParams } = new URL(request.url);
    // let appName = searchParams.get('name') || 'Default App Name';
  
    let manifest = {
      name: appName,
      short_name: appName,
      start_url: `/${appName}/gem-runner?name=${appName}`,
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
  