import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

/**
 * @openapi
 * /api/projects/{id}:
 *   put:
 *     tags:
 *       - Проекты
 *     summary: Update a project
 *     description: Updates the details of an existing project
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the project to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               previewImage:
 *                 type: string
 *               previewDescription:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               publishYear:
 *                 type: string
 *               completedWorksTitles:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The updated project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 project:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: 'Updated Project Title'
 *                     description:
 *                       type: string
 *                       example: 'Updated project description'
 *                     previewImage:
 *                       type: string
 *                       example: 'imageBase64String'
 *                     previewDescription:
 *                       type: string
 *                       example: 'New preview description'
 *       400:
 *         description: Bad request if data is incomplete or invalid
 *       404:
 *         description: Project not found
 */
export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params || {};
    const body = await readBody(event);
    const { title, description, publishYear, appImage, tags, completedWorksTitles, previewImage, previewDescription } = body;

    const { rows } = await query(
      `UPDATE projects
       SET 
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         publish_year = COALESCE($3, publish_year),
         app_image = COALESCE($4, app_image),
         tags = COALESCE($5, tags),
         completed_works_titles = COALESCE($6, completed_works_titles),
         preview_image = COALESCE($7, preview_image),
         preview_description = COALESCE($8, preview_description)
       WHERE id = $9
       RETURNING *`,
      [title, description, publishYear, appImage, tags, completedWorksTitles, previewImage, previewDescription, id]
    );

    if (rows.length === 0) {
      return getErrorResponse('Project not found');
    }

    return getSuccessResponse(rows[0]);
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
