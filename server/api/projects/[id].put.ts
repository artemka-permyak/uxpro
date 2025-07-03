import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params || {};
    const body = await readBody(event);

    const {
      title,
      description,
      publish_year,
      media,
      tags,
      completed_works_titles,
      preview_image,
      preview_description,
      awards
    } = body;

    const { rows } = await query(
      `UPDATE projects
       SET 
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         publish_year = COALESCE($3, publish_year),
         media = COALESCE($4, media),
         tags = COALESCE($5, tags),
         completed_works_titles = COALESCE($6, completed_works_titles),
         preview_image = COALESCE($7, preview_image),
         preview_description = COALESCE($8, preview_description),
         awards = COALESCE($9, awards),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [title, description, publish_year, JSON.stringify(media), tags, completed_works_titles, preview_image, preview_description, JSON.stringify(awards), id]
    );

    if (rows.length === 0) {
      return getErrorResponse('Проект не найден');
    }

    return getSuccessResponse(rows[0]);
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
