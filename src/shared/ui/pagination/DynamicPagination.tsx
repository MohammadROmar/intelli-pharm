import { useTranslation } from 'react-i18next';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

export interface DynamicPaginationProps {
  maxPages: number;
  currentPage: number;
  basePath: string;
  totalItems: number;
  itemsPerPage: number;
  maxVisiblePages?: number;
  extraParams?: Record<string, string>;
}

function buildUrl(
  basePath: string,
  page: number,
  extraParams?: Record<string, string>,
): string {
  const params = new URLSearchParams({ ...extraParams, page: String(page) });
  return `${basePath}?${params.toString()}`;
}

type PageItem = number | 'left-ellipsis' | 'right-ellipsis';

function siblingCountFromMax(maxVisiblePages: number): number {
  return Math.max(0, Math.floor((maxVisiblePages - 5) / 2));
}

function buildPageItems(
  currentPage: number,
  maxPages: number,
  siblingCount: number,
): PageItem[] {
  const totalSlots = siblingCount * 2 + 5;
  if (maxPages <= totalSlots) {
    return Array.from({ length: maxPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, maxPages - 1);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < maxPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + siblingCount * 2;
    const leftRange = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...leftRange, 'right-ellipsis', maxPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + siblingCount * 2;
    const rightRange = Array.from(
      { length: rightCount },
      (_, i) => maxPages - rightCount + 1 + i,
    );
    return [1, 'left-ellipsis', ...rightRange];
  }

  const middleRange = Array.from(
    { length: siblingCount * 2 + 1 },
    (_, i) => leftSiblingIndex + i,
  );
  return [1, 'left-ellipsis', ...middleRange, 'right-ellipsis', maxPages];
}

export function DynamicPagination({
  maxPages,
  currentPage,
  basePath,
  totalItems,
  itemsPerPage,
  maxVisiblePages = 7,
  extraParams,
}: DynamicPaginationProps) {
  const safePage = Math.max(1, Math.min(Number(currentPage), maxPages));

  const isFirst = safePage <= 1;
  const isLast = safePage >= maxPages;

  const siblingCount = siblingCountFromMax(Math.max(5, maxVisiblePages));
  const pageItems = buildPageItems(safePage, maxPages, siblingCount);

  const firstItem = (safePage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(safePage * itemsPerPage, totalItems);

  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 lg:flex-row lg:justify-between">
      <p className="text-muted-foreground text-sm">
        {t('pagination.showing')}{' '}
        <span className="text-foreground font-medium">{firstItem}</span>{' '}
        {t('pagination.to')}{' '}
        <span className="text-foreground font-medium">{lastItem}</span>{' '}
        {t('pagination.of')}{' '}
        <span className="text-foreground font-medium">{totalItems}</span>{' '}
      </p>

      <Pagination className="mx-0 block w-fit">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              label={t('pagination.prev')}
              to={isFirst ? '#' : buildUrl(basePath, safePage - 1, extraParams)}
              aria-disabled={isFirst}
              tabIndex={isFirst ? -1 : undefined}
              className={isFirst ? 'pointer-events-none opacity-50' : undefined}
            />
          </PaginationItem>

          {pageItems.map((item, index) => {
            if (item === 'left-ellipsis' || item === 'right-ellipsis') {
              return (
                <PaginationItem key={`${item}-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            const isActive = item === safePage;

            return (
              <PaginationItem key={item}>
                <PaginationLink
                  to={buildUrl(basePath, item, extraParams)}
                  isActive={isActive}
                  className="text-xs md:text-sm"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              label={t('pagination.next')}
              to={isLast ? '#' : buildUrl(basePath, safePage + 1, extraParams)}
              aria-disabled={isLast}
              tabIndex={isLast ? -1 : undefined}
              className={isLast ? 'pointer-events-none opacity-50' : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
