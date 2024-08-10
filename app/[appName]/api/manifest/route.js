export async function GET(req, { params }) {
    let { appName } = params;
    let url = new URL(req.url, `http://${req.headers.host}`);
    let context = url.searchParams.get('context');
    let prompt = url.searchParams.get('prompt');
    let iconPath = url.searchParams.get('iconpath');
    let iconExtension = iconPath.split('.').pop();

    let manifest = {
      name: appName,
      short_name: appName,
      start_url: `/${appName}/app-runner?context=${encodeURIComponent(context)}&prompt=${encodeURIComponent(prompt)}&iconpath=${encodeURIComponent(iconPath)}`,
      display: "standalone",
      background_color: "#cccccc",
      description: `${appName} PWA`,
      icons: [
        {
          src: `${iconPath}`,
          sizes: "192x192 512x512",
          type: `image/${iconExtension}`
        }
      ]
    };
  
    return new Response(JSON.stringify(manifest), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  