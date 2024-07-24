export default function AppPage({ params }) {
    const { appName } = params;
  
    return (
      <html>
        <head>
          <title>{appName} PWA</title>
          <link rel="manifest" href={`/api/manifest/${appName}`} />
        </head>
        <body>
          <h1>Welcome to {appName} PWA</h1>
          <a  href={`/api/manifest/${appName}`} > try my manifest </a>
        </body>
      </html>
    );
  }
  