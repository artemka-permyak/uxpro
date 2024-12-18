import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

/**
 * @openapi
 * /api/projects:
 *   post:
 *     tags:
 *       - Проекты
 *     summary: Create a new project
 *     description: Creates a new project by providing the necessary details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               previewDescription:
 *                 type: string
 *               description:
 *                 type: string
 *               publishYear:
 *                 type: string
 *               appImage:
 *                 type: string
 *               previewImage:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               completedWorksTitles:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The newly created project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: 'New Project Title'
 *                     description:
 *                       type: string
 *                       example: 'Description of the new project'
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { title, description, publishYear, appImage, tags, completedWorksTitles, previewImage, previewDescription } = body;

    const { rows } = await query(
      `INSERT INTO projects (title, description, publish_year, app_image, tags, completed_works_titles, preview_image, preview_description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, publishYear, appImage, tags, completedWorksTitles, previewImage, previewDescription]
    );

    return getSuccessResponse(rows[0])
  } catch (error: any) {
    return getErrorResponse(error.message)
  }
});
