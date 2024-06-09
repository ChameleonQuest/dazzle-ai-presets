export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name') || 'Default App Name';
  
    const manifest = {
      name,
      short_name: name,
      start_url: "/gem-runner",
      display: "standalone",
      background_color: "#ffffff",
      description: "A dynamically named PWA",
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
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  