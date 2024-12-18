import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

/**
 * @openapi
 * /api/projects/{projectId}/blocks:
 *   post:
 *     summary: Create a new block for a project
 *     description: Adds a new block to the project by providing the block details
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: The ID of the project
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               review:
 *                 type: string
 *               photo:
 *                 type: string
 *               name:
 *                 type: string
 *               job_title:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: object
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *               ordinary_title:
 *                 type: string
 *               ordinary_content:
 *                 type: object
 *               images_mosaic:
 *                 type: string
 *                 enum: ['left', 'top']
 *     responses:
 *       200:
 *         description: The newly created block
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
 *                     type:
 *                       type: string
 *                       example: 'review'
 *                     content:
 *                       type: object
 *                       example: { "review": "Great project!", "photo": "image.jpg", "name": "John", "jobTitle": "Developer" }
 */
export default defineEventHandler(async (event) => {
  try {
    const projectId = event.context.params?.id;
    const body = await readBody(event);
    const { type, review, reviewer_photo, reviewer_name, reviewer_job_title, title, description, content, images, ordinary_title, ordinary_content, images_mosaic, order } = body;

    const { rows: maxOrderRows } = await query(
      `SELECT COALESCE(MAX("order"), 0) AS max_order FROM blocks WHERE project_id = $1`,
      [projectId]
    );
    const maxOrder = maxOrderRows[0]?.max_order || 0;

    const { rows } = await query(
      `INSERT INTO blocks (project_id, type, review, reviewer_photo, reviewer_name, reviewer_job_title, title, description, content, images, ordinary_title, ordinary_content, images_mosaic, "order")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [projectId, type, review, reviewer_photo, reviewer_name, reviewer_job_title, title, description, JSON.stringify(content), JSON.stringify(images), ordinary_title, JSON.stringify(ordinary_content), images_mosaic, maxOrder + 1]
    );

    return getSuccessResponse(rows[0]);
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
