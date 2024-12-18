/**
 * Получить данные успешного ответа
 * @param data
 */
export function getSuccessResponse(data: any) {
  return {
    success: true,
    data,
  }
}

/**
 * Получить данные ошибочного ответа
 * @param error
 */
export function getErrorResponse(error: any) {
  return {
    success: false,
    error,
  }
}
