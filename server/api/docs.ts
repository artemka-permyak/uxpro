import fs from 'fs'
import yaml from 'yaml';

export default defineEventHandler((event) => {
  const file = fs.readFileSync('./server/lib/swaggerDocs.yaml', 'utf8');
  const swaggerSpec = yaml.parse(file);

  setHeaders(event, {
    'Content-Type': 'text/html',
  });

  return `
      <html>
        <head>
          <meta charset="UTF-8">
          <title>API Documentation</title>
          <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
          <script defer src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
          <script defer src="https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js"></script>
        </head>
        <body>
          <div id="swagger-ui"></div>
          <script>
            window.onload = function() {
              SwaggerUIBundle({
                dom_id: '#swagger-ui',
                spec: ${JSON.stringify(swaggerSpec)},
              });
            };
          </script>
        </body>
      </html>
    `
});
