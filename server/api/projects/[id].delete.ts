import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

/**
 * @openapi
 * /api/projects/{id}:
 *   delete:
 *     tags:
 *       - Проекты
 *     summary: Delete a project
 *     description: Deletes a project by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the project to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The project was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'Project successfully deleted'
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
 *                 message:
 *                   type: string
 *                   example: 'Project not found'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'An error occurred while deleting the project'
 */
export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params || {};

    const { rowCount } = await query(
      `DELETE FROM projects WHERE id = $1`,
      [id]
    );

    if (rowCount === 0) {
      return getErrorResponse('Project not found');
    }

    return getSuccessResponse({ message: 'Project successfully deleted' });
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
