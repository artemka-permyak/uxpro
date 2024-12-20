import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

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
      return getErrorResponse('Проект не найден');
    }

    return getSuccessResponse(rows[0]);
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
