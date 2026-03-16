/**
 * Based on react-generic-select
 * https://github.com/lemidb/react-generic-select
 * MIT License
 * Modified to fit the project's FSD (Feature-Sliced Design) structure
 */

import { useEffect, useRef, useState, type ElementType } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';

import { useDebounce, cn } from '../lib';
import { Button } from './Button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';

export interface GenericSingleSelectProps<T extends Record<string, unknown>> {
  options: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  value?: T[keyof T] | null;
  defaultValue?: Partial<T>;
  onValueChange: (value: T[keyof T] | null) => void;
  onSearchChange?: (searchTerm: string) => void;
  onLoadMore?: () => void;
  displayClassName?: string;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  className?: string;
  hasMoreLabel?: boolean;
  invalid?: boolean;
  icon?: ElementType;
  disabled?: boolean;
}

export function GenericSingleSelect<T extends Record<string, unknown>>({
  options,
  valueKey,
  labelKey,
  value,
  defaultValue,
  onValueChange,
  onSearchChange,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  className,
  displayClassName,
  invalid,
  hasMoreLabel = true,
  icon: Icon,
  disabled,
}: GenericSingleSelectProps<T>) {
  const [localSearch, setLocalSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(localSearch, 300);
  const isFetchingNextPageRef = useRef<boolean | undefined>(isFetchingNextPage);

  const { t } = useTranslation('translation', { keyPrefix: 'asyncSelect' });

  useEffect(() => {
    isFetchingNextPageRef.current = isFetchingNextPage;
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (onSearchChange && isOpen) {
      onSearchChange(debouncedSearch);
    }
  }, [debouncedSearch, onSearchChange, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalSearch('');
    }
  }, [isOpen]);

  // Infinite scroll effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      const container = scrollRef.current;
      if (!container || !onLoadMore) return;

      const handleScroll = () => {
        // Guard: do nothing if there is no next page or a next-page fetch is already in flight
        if (!hasNextPage || isFetchingNextPageRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 5;

        if (atBottom && !isLoading && !isFetchingNextPageRef.current) {
          onLoadMore();
        }
      };

      const handleWheel = (e: WheelEvent) => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 5;
        const atTop = scrollTop <= 5;

        if (
          (atBottom && e.deltaY > 0 && !hasNextPage) ||
          (atTop && e.deltaY < 0)
        ) {
          return; // Let event bubble for parent scrolling
        }

        e.preventDefault();
        container.scrollTop += e.deltaY;
        if (!isLoading) {
          handleScroll();
        }
      };

      container.addEventListener('scroll', handleScroll);
      container.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('wheel', handleWheel);
      };
    }, 10);

    return () => clearTimeout(timeout);
  }, [isOpen, hasNextPage, isFetchingNextPage, onLoadMore, isLoading]);

  const selectedOption = options.find((option) => option[valueKey] === value);

  // When onSearchChange is not provided, fall back to local client-side filtering
  const filteredOptions =
    onSearchChange || !debouncedSearch.trim()
      ? options
      : options.filter((option) => {
          const label = String(option[labelKey] ?? '');
          const optionValue = String(option[valueKey] ?? '');
          const term = debouncedSearch.toLowerCase().trim();
          return (
            label.toLowerCase().includes(term) ||
            optionValue.toLowerCase().includes(term)
          );
        });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className={cn(
            'relative w-full justify-between!',
            invalid && 'border-destructive!',
            Icon && 'ltr:pl-9! rtl:pr-9!',
            className,
          )}
        >
          {Icon && <Icon className="input-icon" />}
          {selectedOption ? (
            <span className="truncate">{String(selectedOption[labelKey])}</span>
          ) : defaultValue ? (
            <span className="truncate">{String(defaultValue[labelKey])}</span>
          ) : (
            <span className="text-muted-foreground">{t('placeholder')}</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0!">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={t('search')}
            value={localSearch}
            onValueChange={setLocalSearch}
            className="pl-8"
          />
          <CommandList
            ref={scrollRef}
            className={cn(
              `max-h-75 max-w-72 overflow-y-auto`,
              displayClassName,
            )}
          >
            {filteredOptions.length === 0 ? (
              <CommandEmpty>{t('noResultsFound')}</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredOptions.map((option) => {
                  const isSelected = option[valueKey] === value;
                  return (
                    <CommandItem
                      key={String(option[valueKey])}
                      value={String(option[valueKey])}
                      onSelect={() => {
                        onValueChange(isSelected ? null : option[valueKey]);
                        setIsOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 size-4',
                          isSelected ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <span className="text-wrap">
                        {String(option[labelKey])}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}

            {/* Infinite scroll indicators */}
            {isLoading ? (
              <div className="text-muted-foreground flex items-center justify-center gap-2 p-2 text-center text-xs">
                <Loader2 className="text-primary size-4 animate-spin" />
                Loading more...
              </div>
            ) : hasNextPage ? (
              <div className="text-muted-foreground p-2 text-center text-xs">
                Scroll to load more
              </div>
            ) : filteredOptions.length > 0 && hasMoreLabel ? (
              <div className="text-muted-foreground p-2 text-center text-xs">
                {t('noMoreResults')}
              </div>
            ) : null}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
