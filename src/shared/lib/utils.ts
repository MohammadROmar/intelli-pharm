import { clsx, type ClassValue } from 'clsx';

type LastPageData = { page: number; totalPages: number };

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getNextPageParam(lastPageData: LastPageData) {
  const currentPage = lastPageData.page;
  const totalPages = lastPageData.totalPages;

  return currentPage < totalPages ? currentPage + 1 : undefined;
}
