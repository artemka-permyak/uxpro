import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

export default defineEventHandler(async () => {
  try {
    const { rows } = await query('SELECT * FROM projects ORDER BY id ASC', []);

    return getSuccessResponse(rows)
  } catch (error: any) {
    return getErrorResponse(error.message)
  }
});
