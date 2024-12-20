import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params || {};
    const { rows } = await query('SELECT * FROM projects WHERE id = $1', [id]);

    return getSuccessResponse(rows[0]);
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
