import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';

export type ApiResponse<T> = {
  isSuccess: boolean;
  message: string;
  data: T | null;
  errors: null | string[];
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

export class ApiError extends Error {
  public readonly i18nKey: string;
  public readonly status?: number;
  public readonly config?: AxiosRequestConfig;

  constructor(
    i18nKey: string,
    status?: number,
    message?: string,
    config?: AxiosRequestConfig,
  ) {
    super(i18nKey);

    this.message = message ?? i18nKey;
    this.name = 'ApiError';
    this.i18nKey = i18nKey;
    this.status = status;
    this.config = config;
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

function assertSuccessfulResponse<T>(response: ApiResponse<T>): T {
  if (!response.isSuccess || response.data === null) {
    throw new ApiError(
      statusToI18nKey(response.statusCode),
      response.statusCode,
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
  <T = unknown>(config: AxiosRequestConfig): Promise<ApiResponse<T>>;
  <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>>;

  get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>>;
  put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>>;
  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
}

type ResponseError = AxiosError & {
  response?: { data?: { errors?: { message?: string } } };
};

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
}) as ApiInstance;

apiClient.interceptors.response.use(
  (res) => res.data,
  (error: ResponseError) => {
    if (import.meta.env.DEV) {
      console.log(error.response);
    }

    const responseError = error.response?.data?.errors?.message;
    const status = error.response?.status;

    return Promise.reject(
      new ApiError(
        statusToI18nKey(status),
        status,
        responseError,
        error.config,
      ),
    );
  },
);
