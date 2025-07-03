import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { title, description, publishYear, appImage, tags, completedWorksTitles, previewImage, previewDescription, awards } = body;

    const { rows } = await query(
      `INSERT INTO projects (title, description, publish_year, app_image, tags, completed_works_titles, preview_image, preview_description, awards)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, description, publishYear, appImage, tags, completedWorksTitles, previewImage, previewDescription, awards]
    );

    return getSuccessResponse(rows[0])
  } catch (error: any) {
    return getErrorResponse(error.message)
  }
});
