import { clsx, type ClassValue } from 'clsx';

type LastPageData = { page: number; totalPages: number };

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const required = () => (v: string | number | null) =>
  ((v ? String(v) : '') ?? '').trim().length > 0 || 'required';

export const fRequired = () => (v: string | number) => {
  return ((v ? String(v) : '') ?? '').trim().length > 0 || 'fRequired';
};

export const positiveNumber = () => (v: string) =>
  (!isNaN(Number(v)) && Number(v) > 0) || 'validNum';

export const isValidPhone = () => (v: string) =>
  /^09\d{8}$/.test(v.trim()) || 'invalidPhone';

export function getNextPageParam(lastPageData: LastPageData) {
  const currentPage = lastPageData.page;
  const totalPages = lastPageData.totalPages;

  return currentPage < totalPages ? currentPage + 1 : undefined;
}
