export const UiStateType = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
  Empty: 'empty',
  Error: 'error'
} as const

export type UiState<TData, TError = string> =
  | { type: typeof UiStateType.Idle }
  | { type: typeof UiStateType.Loading }
  | { type: typeof UiStateType.Success; data: TData }
  | { type: typeof UiStateType.Error; error: TError }
  | { type: typeof UiStateType.Empty }

export const ScreenUiState = {
  idle: <TData, TError = string>(): UiState<TData, TError> => ({
    type: UiStateType.Idle
  }),

  loading: <TData, TError = string>(): UiState<TData, TError> => ({
    type: UiStateType.Loading
  }),

  success: <TData, TError = string>(data: TData): UiState<TData, TError> => ({
    type: UiStateType.Success,
    data
  }),

  error: <TData, TError = string>(error: TError): UiState<TData, TError> => ({
    type: UiStateType.Error,
    error
  }),

  empty: <TData, TError = string>(): UiState<TData, TError> => ({
    type: UiStateType.Empty
  })
}
