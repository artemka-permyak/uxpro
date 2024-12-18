import path from 'path';
import fs from 'fs';

/**
 * @swagger
 * /api/images/{fileName}:
 *   get:
 *     tags:
 *        - Изображения
 *     summary: Get an image
 *     description: This endpoint allows users to retrieve images from the server.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         description: The name of the image to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image found and returned
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Image not found
 */
export default defineEventHandler(async (event) => {
  const { fileName } = event.context.params;

  const filePath = path.join(process.cwd(), 'uploads', fileName);

  console.log(fs.existsSync('/Users/artem/WebstormProjects/uxpro/uploads'));

  fs.readdir('/Users/artem/WebstormProjects/uxpro/uploads', (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  })
  if (fs.existsSync(filePath)) {
    setHeader(event, 'Content-Type', 'image/png');

    return send(event, filePath);
  } else {
    event.node.res.statusCode = 404;
    event.node.res.end('File not found');
  }
});
