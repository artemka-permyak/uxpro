import { getErrorResponse, getSuccessResponse, query } from '~/server/lib'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id

    const { rows } = await query('SELECT * FROM blocks WHERE project_id = $1 ORDER BY "order" ASC', [id])

    return getSuccessResponse(rows)
  } catch (error: any) {
    return getErrorResponse(error.message)
  }
});
