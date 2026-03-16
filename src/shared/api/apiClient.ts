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

export class ApiError extends Error {
  public readonly i18nKey: string;
  public readonly status?: number;

  constructor(i18nKey: string, status?: number) {
    super(i18nKey);
    this.name = 'ApiError';
    this.i18nKey = i18nKey;
    this.status = status;
  }
}

const statusToI18nKey = (status?: number): string => {
  switch (status) {
    case 400:
      return 'errors.badRequest';
    case 401:
      return 'errors.unauthorized';
    case 403:
      return 'errors.forbidden';
    case 404:
      return 'errors.notFound';
    case 422:
      return 'errors.validationFailed';
    case 429:
      return 'errors.tooManyRequests';
    case 500:
      return 'errors.serverError';
    default:
      return 'errors.unknown';
  }
};

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

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
}) as ApiInstance;

apiClient.interceptors.response.use(
  (res) => res.data,
  (error: AxiosError) => {
    const status = error.response?.status;
    return Promise.reject(new ApiError(statusToI18nKey(status), status));
  },
);
