import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

export default defineEventHandler(async () => {
  try {
    const { rows } = await query('SELECT * FROM last_projects ORDER BY position ASC', []);

    return getSuccessResponse(rows);
  } catch (error: any) {
    return getErrorResponse(error.message);
  }
});
