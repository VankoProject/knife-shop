export type KnownProductErrorCode = 'PRODUCT_NOT_FOUND'
export type KnownAddCartErrorCode = 'BAD_QTY' | 'OUT_OF_STOCK'
export type KnownUpdateCartErrorCode = 'BAD_QTY' | 'PRICE_CHANGED'

export interface ApiErrorResponse<TCode extends string = string> {
  error: TCode | string
  message?: string
}

export interface ProductErrorResponse extends ApiErrorResponse<KnownProductErrorCode> {
  message: string
}

export interface AddCartErrorResponse extends ApiErrorResponse<KnownAddCartErrorCode> {}

export interface UpdateCartErrorResponse extends ApiErrorResponse<KnownUpdateCartErrorCode> {
  newPrice?: number
}

export function isErrorCode<TError extends { error: string }, TCode extends string>(
  error: TError,
  code: TCode,
): error is TError & { error: TCode } {
  return error.error === code
}
