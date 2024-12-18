import { getErrorResponse, getSuccessResponse, query } from '~/server/lib';

/**
 * @openapi
 * /api/projects/{projectId}/blocks/{blockId}:
 *   put:
 *     summary: Edit a block for a project
 *     description: Updates a specific block of a project by providing the updated block data
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
 *         description: The ID of the block to be edited
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
 *         description: The updated block
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
 *                       example: { "review": "Updated project review!", "photo": "image.jpg", "name": "John", "jobTitle": "Developer" }
 */
export default defineEventHandler(async (event) => {
  try {
    const { id: projectId, blockId } = event.context.params || {};
    const body = await readBody(event);

    const { type, review, reviewer_photo, reviewer_name, reviewer_job_title, title, description, content, images, ordinary_title, ordinary_content, images_mosaic, order } = body;

    const setFields = [];
    const values = [];

    const { rows: existingRows } = await query(
      `SELECT type FROM blocks WHERE project_id = $1 AND id = $2`,
      [projectId, blockId]
    );

    if (existingRows.length === 0) {
      return getErrorResponse('Block not found');
    }

    const existingType = existingRows[0].type;

    if (type) {
      setFields.push('type = $' + (values.length + 1));
      values.push(type);
    } else {
      setFields.push('type = $' + (values.length + 1));
      values.push(existingType);
    }

    if (review) {
      setFields.push('review = $' + (values.length + 1));
      values.push(review);
    }
    if (reviewer_photo) {
      setFields.push('reviewer_photo = $' + (values.length + 1));
      values.push(reviewer_photo);
    }
    if (reviewer_name) {
      setFields.push('reviewer_name = $' + (values.length + 1));
      values.push(reviewer_name);
    }
    if (reviewer_job_title) {
      setFields.push('reviewer_job_title = $' + (values.length + 1));
      values.push(reviewer_job_title);
    }
    if (title) {
      setFields.push('title = $' + (values.length + 1));
      values.push(title);
    }
    if (description) {
      setFields.push('description = $' + (values.length + 1));
      values.push(description);
    }
    if (content) {
      setFields.push('content = $' + (values.length + 1));
      values.push(JSON.stringify(content));
    }
    if (images) {
      setFields.push('images = $' + (values.length + 1));
      values.push(JSON.stringify(images));
    }
    if (ordinary_title) {
      setFields.push('ordinary_title = $' + (values.length + 1));
      values.push(ordinary_title);
    }
    if (ordinary_content) {
      setFields.push('ordinary_content = $' + (values.length + 1));
      values.push(JSON.stringify(ordinary_content));
    }
    if (images_mosaic) {
      setFields.push('images_mosaic = $' + (values.length + 1));
      values.push(images_mosaic);
    }
    if (order) {
      setFields.push('"order" = $' + (values.length + 1));
      values.push(order);
    }

    setFields.push('updated_at = CURRENT_TIMESTAMP');

    if (setFields.length === 1) {
      return getErrorResponse('No fields to update');
    }

    const queryText = `
      UPDATE blocks
      SET ${setFields.join(', ')}
      WHERE project_id = $${values.length + 1} AND id = $${values.length + 2}
      RETURNING *`;

    values.push(projectId, blockId);

    const { rows } = await query(queryText, values);

    if (rows.length === 0) {
      return getErrorResponse('Block not found');
    }

    return getSuccessResponse(rows[0]);
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
