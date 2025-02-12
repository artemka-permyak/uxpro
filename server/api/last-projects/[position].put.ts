import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

export default defineEventHandler(async (event) => {
  try {
    const position = parseInt(event.context.params?.position || '', 10);
    const body = await readBody(event);
    const { is_nda, title, direction, deadline, tags } = body;

    if (isNaN(position) || position < 1 || position > 6) {
      return getErrorResponse('Некорректная позиция (должна быть от 1 до 6)');
    }

    // Проверяем, существует ли проект на этой позиции
    const { rowCount } = await query('SELECT 1 FROM last_projects WHERE position = $1', [position]);

    if ((rowCount || 0) === 0) {
      return getErrorResponse(`Проект на позиции ${position} не найден`);
    }

    // Обновляем проект
    const { rows } = await query(
      `UPDATE last_projects
       SET is_nda = COALESCE($1, is_nda),
           title = COALESCE($2, title),
           direction = COALESCE($3, direction),
           deadline = COALESCE($4, deadline),
           tags = COALESCE($5, tags)
       WHERE position = $6
       RETURNING *`,
      [is_nda, title, direction, deadline, tags, position]
    );

    return getSuccessResponse(rows[0]);
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
