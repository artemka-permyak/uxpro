import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

/**
 * @openapi
 * /api/projects/{projectId}/blocks:
 *   get:
 *     summary: Get blocks of a project
 *     description: Retrieves a list of all blocks for a specific project
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: The ID of the project
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of blocks
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
 *                       type:
 *                         type: string
 *                         example: 'review'
 *                       content:
 *                         type: object
 *                         example: { "review": "Great project!", "photo": "image.jpg", "name": "John", "jobTitle": "Developer" }
 */
export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id

    const { rows } = await query('SELECT * FROM blocks WHERE project_id = $1', [id])

    return getSuccessResponse(rows)
  } catch (error: any) {
    return getErrorResponse(error.message)
  }
});
