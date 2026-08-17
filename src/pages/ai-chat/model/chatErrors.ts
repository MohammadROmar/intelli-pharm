import { ApiError } from '@/shared/api';

const EMPTY_GEMINI_RESPONSE_MESSAGE =
  'Gemini response did not contain any text.';
const EMPTY_ASSISTANT_RESPONSE_ERROR_KEY = 'chat.emptyAssistantResponse';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function hasEmptyAssistantResponsePayload(
  statusCode: number,
  errors: unknown,
) {
  return (
    statusCode === 500 &&
    isRecord(errors) &&
    errors.message === EMPTY_GEMINI_RESPONSE_MESSAGE
  );
}

export function normalizeSendMessageError(error: unknown): ApiError {
  if (
    error instanceof ApiError &&
    error.status === 500 &&
    error.message === EMPTY_GEMINI_RESPONSE_MESSAGE
  ) {
    return new ApiError(EMPTY_ASSISTANT_RESPONSE_ERROR_KEY, error.status);
  }

  return error instanceof ApiError ? error : new ApiError('unknown');
}

export function isEmptyAssistantResponseError(error: ApiError) {
  return error.i18nKey === EMPTY_ASSISTANT_RESPONSE_ERROR_KEY;
}

export function createEmptyAssistantResponseError(statusCode: number) {
  return new ApiError(EMPTY_ASSISTANT_RESPONSE_ERROR_KEY, statusCode);
}
