const comingSoonHTML = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>fragapitz.de – Coming Soon</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #0f172a;
      color: #f8fafc;
    }
    .container { text-align: center; padding: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; letter-spacing: -0.02em; }
    p { color: #94a3b8; font-size: 1.1rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>fragapitz.de</h1>
    <p>Hier entsteht etwas Neues. Bald mehr.</p>
  </div>
</body>
</html>`;

export default {
  async fetch(request: Request, env: { COMING_SOON?: string; ASSETS: Fetcher }): Promise<Response> {
    if (env.COMING_SOON === 'true') {
      return new Response(comingSoonHTML, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
