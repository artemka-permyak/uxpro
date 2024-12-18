import multer from 'multer';
import path from 'path';
import fs from 'fs';

/**
 * @openapi
 * /api/images/upload-image:
 *   post:
 *     tags:
 *       - Изображения
 *     summary: Загрузка изображений
 *     description: Позволяет загружать изображения на сервер
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Изображение для загрузки
 *     responses:
 *       '200':
 *         description: Изображение успешно загружено
 *       '400':
 *         description: Неверный тип файла
 *       '500':
 *         description: Внутренняя ошибка сервера
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default defineEventHandler((event) => {
  return new Promise((resolve, reject) => {
    upload.single('image')(event.node.req, event.node.res, (err) => {

      if (err) reject(err);

      resolve({ message: 'Image uploaded successfully!' });
    });
  });
});
