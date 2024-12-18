import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

/**
 * @openapi
 * /api/projects/{id}:
 *   get:
 *     tags:
 *       - Проекты
 *     summary: Get project by ID
 *     description: Retrieves a project by its ID from the projects table
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project
 *     responses:
 *       200:
 *         description: Project found
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
 *                       example: 'Project Title'
 *                     description:
 *                       type: string
 *                       example: 'Description of the project'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: 'Project not found'
 */
export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params || {};
    const { rows } = await query('SELECT * FROM projects WHERE id = $1', [id]);

    return getSuccessResponse(rows[0]);
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
