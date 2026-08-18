import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';

export type ApiValidationErrors = Record<string, string[]>;

export type ApiErrors =
  | Record<string, string | string[] | undefined>
  | string[];

export type ApiResponse<T> = {
  isSuccess: boolean;
  message: string;
  data: T | null;
  errors: ApiErrors | null;
  statusCode: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

export type PaginatedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};

export type RequestConfig = AxiosRequestConfig & { skipAuthRefresh?: boolean };

export class ApiError extends Error {
  public readonly i18nKey: string;
  public readonly status?: number;
  public readonly config?: RequestConfig;
  public readonly validationErrors?: ApiValidationErrors;
  public readonly errors?: ApiErrors;

  constructor(
    i18nKey: string,
    status?: number,
    message?: string,
    config?: RequestConfig,
    validationErrors?: ApiValidationErrors,
    errors?: ApiErrors,
  ) {
    super(i18nKey);

    this.message = message ?? i18nKey;
    this.name = 'ApiError';
    this.i18nKey = i18nKey;
    this.status = status;
    this.config = config;
    this.validationErrors = validationErrors;
    this.errors = errors;
  }
}

export const statusToI18nKey = (status?: number): string => {
  switch (status) {
    case 400:
      return 'badRequest.message';
    case 401:
      return 'unauthorized';
    case 403:
      return 'forbidden';
    case 404:
      return 'notFound';
    case 422:
      return 'validationFailed';
    case 429:
      return 'tooManyRequests';
    case 500:
      return 'serverError';
    default:
      return 'unknown';
  }
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeValidationErrors(
  errors: unknown,
): ApiValidationErrors | undefined {
  if (!isRecord(errors)) return undefined;

  const validationErrors: ApiValidationErrors = {};

  for (const [field, messages] of Object.entries(errors)) {
    if (
      Array.isArray(messages) &&
      messages.every(
        (message): message is string => typeof message === 'string',
      )
    ) {
      validationErrors[field] = messages;
    }
  }

  return Object.keys(validationErrors).length > 0
    ? validationErrors
    : undefined;
}

function getResponseErrorMessage(data: unknown): string | undefined {
  if (!isRecord(data)) return undefined;

  const errors = data.errors;
  if (isRecord(errors) && typeof errors.message === 'string') {
    return errors.message;
  }

  return typeof data.message === 'string' ? data.message : undefined;
}

function assertSuccessfulResponse<T>(response: ApiResponse<T>): T {
  if (!response.isSuccess || response.data === null) {
    throw new ApiError(
      statusToI18nKey(response.statusCode),
      response.statusCode,
      response.message,
      undefined,
      normalizeValidationErrors(response.errors),
      response.errors ?? undefined,
    );
  }

  return response.data;
}

export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  return assertSuccessfulResponse(response);
}

export function unwrapPaginatedApiResponse<T>(
  response: ApiResponse<PaginatedResponse<T>>,
): PaginatedResult<T> {
  const data = assertSuccessfulResponse(response);
  const totalPages = Math.max(
    Math.ceil(data.meta.total / data.meta.per_page),
    1,
  );

  return {
    items: data.data,
    page: data.meta.current_page,
    pageSize: data.meta.per_page,
    totalPages,
    totalCount: data.meta.total,
  };
}

interface ApiInstance extends Omit<
  AxiosInstance,
  'get' | 'post' | 'put' | 'patch' | 'delete'
> {
  <T = unknown>(config: RequestConfig): Promise<ApiResponse<T>>;
  <T = unknown>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>;

  get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>;
  post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>>;
  put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>>;
  patch<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>>;
  delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>;
}

type ApiErrorResponse = {
  message?: string;
  errors?: ApiErrors;
  statusCode?: number;
};

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
}) as ApiInstance;

apiClient.interceptors.response.use(
  (res) => res.data,
  (error: AxiosError<ApiErrorResponse>) => {
    if (import.meta.env.DEV) {
      console.warn('[api] request failed:', error.response);
    }

    const responseData = error.response?.data;
    const status = error.response?.status ?? responseData?.statusCode;

    return Promise.reject(
      new ApiError(
        statusToI18nKey(status),
        status,
        getResponseErrorMessage(responseData),
        error.config,
        normalizeValidationErrors(responseData?.errors),
        responseData?.errors,
      ),
    );
  },
);
