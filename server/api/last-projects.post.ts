import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { is_nda = false, title, direction, deadline, tags, position } = body;

    if (!title || !direction || !deadline || !tags || !position) {
      return getErrorResponse('Все поля, кроме is_nda, обязательны');
    }

    // Проверяем, занята ли уже эта позиция
    const { rowCount } = await query('SELECT 1 FROM last_projects WHERE position = $1', [position]);

    if ((rowCount || 0) > 0) {
      return getErrorResponse(`Позиция ${position} уже занята`);
    }

    const { rows } = await query(
      `INSERT INTO last_projects (is_nda, title, direction, deadline, tags, position)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [is_nda, title, direction, deadline, tags, position]
    );

    return getSuccessResponse(rows[0]);
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
