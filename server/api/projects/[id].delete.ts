import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params || {};

    const { rowCount } = await query(
      `DELETE FROM projects WHERE id = $1`,
      [id]
    );

    if (rowCount === 0) {
      return getErrorResponse('Проект не найден');
    }

    return getSuccessResponse({ message: 'Проект был успешно удален' });
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
