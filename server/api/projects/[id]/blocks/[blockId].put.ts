import { getErrorResponse, getSuccessResponse, query } from '~/server/lib';

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
      return getErrorResponse('Нет полей для обновления');
    }

    const queryText = `
      UPDATE blocks
      SET ${setFields.join(', ')}
      WHERE project_id = $${values.length + 1} AND id = $${values.length + 2}
      RETURNING *`;

    values.push(projectId, blockId);

    const { rows } = await query(queryText, values);

    if (rows.length === 0) {
      return getErrorResponse('Блок не найден');
    }

    return getSuccessResponse(rows[0]);
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
