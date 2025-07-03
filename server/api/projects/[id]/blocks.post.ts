import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

export default defineEventHandler(async (event) => {
  try {
    const projectId = event.context.params?.id;
    const body = await readBody(event);
    const { type, review, reviewer_photo, reviewer_name, reviewer_job_title, title, description, dedicatedDescription, content, media, media_position, order } = body;

    const { rows: maxOrderRows } = await query(
      `SELECT COALESCE(MAX("order"), 0) AS max_order FROM blocks WHERE project_id = $1`,
      [projectId]
    );
    const maxOrder = maxOrderRows[0]?.max_order || 0;

    const { rows } = await query(
      `INSERT INTO blocks (project_id, type, review, reviewer_photo, reviewer_name, reviewer_job_title, title, description, dedicated_description,  content, media, media_position, "order")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [projectId, type, review, reviewer_photo, reviewer_name, reviewer_job_title, title, description, dedicatedDescription, JSON.stringify(content), JSON.stringify(media), media_position, order || maxOrder + 1]
    );

    return getSuccessResponse(rows[0]);
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
