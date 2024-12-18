import swaggerJSDoc from 'swagger-jsdoc'

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Документация API',
      version: '1.0.0',
      description: 'Документация API для UXPRO',
    },
  },
  apis: ['./server/api/**/*.ts'],
});

export default defineEventHandler((event) => {
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
