import { useSearchParams } from 'react-router-dom';
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
import { buildUrl } from '../../lib/buildUrl';
import { cn } from '@/shared/lib';

export type DynamicPaginationProps = {
  maxPages: number;
  currentPage: number;
  basePath: string;
  totalItems: number;
  itemsPerPage: number;
  maxVisiblePages?: number;
  extraParams?: Record<string, string>;
};

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
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= maxPages;

  const siblingCount = siblingCountFromMax(Math.max(5, maxVisiblePages));
  const pageItems = buildPageItems(currentPage, maxPages, siblingCount);

  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, totalItems);

  const isValidPage = currentPage <= maxPages;

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-3 lg:flex-row lg:justify-between',
        !isValidPage && 'lg:justify-end',
      )}
    >
      {isValidPage && (
        <p className="text-muted-foreground text-sm">
          {t('pagination.showing')}{' '}
          <span className="text-foreground font-medium">{firstItem}</span>{' '}
          {t('pagination.to')}{' '}
          <span className="text-foreground font-medium">{lastItem}</span>{' '}
          {t('pagination.of')}{' '}
          <span className="text-foreground font-medium">{totalItems}</span>{' '}
        </p>
      )}

      <Pagination className="block">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              label={t('pagination.prev')}
              to={
                isFirst
                  ? '#'
                  : buildUrl(
                      basePath,
                      currentPage - 1,
                      searchParams,
                      extraParams,
                    )
              }
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

            const isActive = item === currentPage;

            return (
              <PaginationItem key={item}>
                <PaginationLink
                  to={buildUrl(basePath, item, searchParams, extraParams)}
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
              to={
                isLast
                  ? '#'
                  : buildUrl(
                      basePath,
                      currentPage + 1,
                      searchParams,
                      extraParams,
                    )
              }
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
