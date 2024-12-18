import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

/**
 * @openapi
 * /api/projects:
 *   get:
 *     tags:
 *       - Проекты
 *     summary: Get all projects
 *     description: Retrieves a list of all projects
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: 'Project Title'
 *                       description:
 *                         type: string
 *                         example: 'Description of the project'
 */
export default defineEventHandler(async () => {
  try {
    const { rows } = await query('SELECT * FROM projects', []);

    return getSuccessResponse(rows)
  } catch (error: any) {
    return getErrorResponse(error.message)
  }
});
