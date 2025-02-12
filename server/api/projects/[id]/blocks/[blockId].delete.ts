import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

export default defineEventHandler(async (event) => {
  try {
    const { id, blockId } = event.context.params || {};

    if (!id || !blockId) {
      return getErrorResponse('Неправильные параметры запроса');
    }

    const { rowCount } = await query(
      `DELETE FROM blocks WHERE project_id = $1 AND id = $2 RETURNING *`,
      [id, blockId]
    );

    if ((rowCount || 0) > 0) {
      return getSuccessResponse('Блок был успешно удален');
    } else {
      return getErrorResponse('Блок не найден');
    }
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
