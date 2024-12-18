import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

/**
 * @openapi
 * /api/projects/{projectId}/blocks/{blockId}:
 *   delete:
 *     summary: Delete a block for a project
 *     description: Deletes a specific block from a project by its ID
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: The ID of the project
 *         schema:
 *           type: integer
 *       - in: path
 *         name: blockId
 *         required: true
 *         description: The ID of the block to be deleted
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted block information
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
 *                   example: 'Block deleted successfully'
 */
export default defineEventHandler(async (event) => {
  try {
    const { id, blockId } = event.context.params || {};

    if (!id || !blockId) {
      return getErrorResponse('Project ID or Block ID is missing');
    }

    // Выполняем запрос на удаление блока
    const { rowCount } = await query(
      `DELETE FROM blocks WHERE project_id = $1 AND id = $2 RETURNING *`,
      [id, blockId]
    );

    if ((rowCount || 0) > 0) {
      return getSuccessResponse('Block deleted successfully');
    } else {
      return getErrorResponse('Block not found');
    }
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
