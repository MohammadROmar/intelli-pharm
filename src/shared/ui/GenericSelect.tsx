/**
 * Based on react-generic-select
 * https://github.com/lemidb/react-generic-select
 * MIT License
 * Modified to fit the project's FSD (Feature-Sliced Design) structure
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';

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
import { useDebounce, cn } from '../lib';

const SEARCH_DEBOUNCE_MS = 300;
const POPOVER_MOUNT_DELAY_MS = 10;
const NEAR_BOTTOM_THRESHOLD_PX = 100;

const OPTION_ROW_INTRINSIC_SIZE_PX = 52;

export type GenericSingleSelectProps<T extends Record<string, unknown>> = {
  options: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  defaultValue?: Partial<T>;
  value?: T[keyof T] | null;
  onValueChange: (value: T[keyof T] | null) => void;
  onSearchChange?: (searchTerm: string) => void;
  onLoadMore?: () => void;
  displayClassName?: string;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  className?: string;
  placeholder?: string;
  hasMoreLabel?: boolean;
  invalid?: boolean;
  icon?: ElementType;
  disabled?: boolean;
};

function useLatest<Value>(value: Value) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}

type SelectListStatusLabels = {
  loadingMore: string;
  scrollToLoad: string;
  noMoreResults: string;
};

type SelectListStatusProps = {
  isLoading?: boolean;
  hasNextPage?: boolean;
  hasResults: boolean;
  showNoMoreResultsLabel: boolean;
  labels: SelectListStatusLabels;
};

function SelectListStatus({
  isLoading,
  hasNextPage,
  hasResults,
  showNoMoreResultsLabel,
  labels,
}: SelectListStatusProps) {
  if (isLoading) {
    return (
      <div className="text-muted-foreground flex items-center justify-center gap-2 p-2 py-5.5 text-center text-sm">
        <Loader2 className="text-primary size-4 animate-spin" />
        {labels.loadingMore}
      </div>
    );
  }

  if (hasNextPage) {
    return (
      <div className="text-muted-foreground p-2 text-center text-xs">
        {labels.scrollToLoad}
      </div>
    );
  }

  if (hasResults && showNoMoreResultsLabel) {
    return (
      <div className="text-muted-foreground p-2 text-center text-xs">
        {labels.noMoreResults}
      </div>
    );
  }

  return null;
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
  placeholder,
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
  const debouncedSearch = useDebounce(localSearch, SEARCH_DEBOUNCE_MS);

  const { t } = useTranslation('common', { keyPrefix: 'asyncSelect' });

  const hasNextPageRef = useLatest(hasNextPage);
  const isFetchingNextPageRef = useLatest(isFetchingNextPage);
  const isLoadingRef = useLatest(isLoading);
  const onLoadMoreRef = useLatest(onLoadMore);

  useEffect(() => {
    if (onSearchChange && isOpen) {
      onSearchChange(debouncedSearch);
    }
  }, [debouncedSearch, onSearchChange, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    let listenerCleanup: (() => void) | undefined;

    const timerId = setTimeout(() => {
      const container = scrollRef.current;
      if (!container) return;

      const handleScroll = () => {
        if (
          !hasNextPageRef.current ||
          isFetchingNextPageRef.current ||
          isLoadingRef.current ||
          !onLoadMoreRef.current
        )
          return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        const nearBottom =
          scrollTop + clientHeight >= scrollHeight - NEAR_BOTTOM_THRESHOLD_PX;
        if (nearBottom) onLoadMoreRef.current();
      };

      const stopPropagation = (e: Event) => e.stopPropagation();

      container.addEventListener('scroll', handleScroll, { passive: true });
      container.addEventListener('wheel', stopPropagation, { passive: true });
      container.addEventListener('touchmove', stopPropagation, {
        passive: true,
      });

      listenerCleanup = () => {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('wheel', stopPropagation);
        container.removeEventListener('touchmove', stopPropagation);
      };
    }, POPOVER_MOUNT_DELAY_MS);

    return () => {
      clearTimeout(timerId);
      listenerCleanup?.();
    };
  }, [
    isOpen,
    hasNextPageRef,
    isFetchingNextPageRef,
    isLoadingRef,
    onLoadMoreRef,
  ]);

  const selectedOption = useMemo(
    () => options.find((opt) => opt[valueKey] === value) ?? null,
    [options, valueKey, value],
  );

  const isExternallyFiltered = Boolean(onSearchChange);

  const filteredOptions = useMemo(() => {
    const trimmedSearch = debouncedSearch.trim();

    if (isExternallyFiltered || !trimmedSearch) {
      return options;
    }

    const term = trimmedSearch.toLowerCase();

    return options.filter((opt) => {
      const label = String(opt[labelKey] ?? '').toLowerCase();
      const key = String(opt[valueKey] ?? '').toLowerCase();
      return label.includes(term) || key.includes(term);
    });
  }, [isExternallyFiltered, options, debouncedSearch, labelKey, valueKey]);

  const defaultLabel =
    defaultValue?.[labelKey] != null ? String(defaultValue[labelKey]) : null;

  const displayLabel = selectedOption
    ? String(selectedOption[labelKey])
    : defaultLabel;

  const handleSelectOption = (option: T, isSelected: boolean) => {
    onValueChange(isSelected ? null : option[valueKey]);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-invalid={invalid}
          className={cn(
            'dark:bg-input/50 border-input bg-input/20 relative w-full justify-between!',
            invalid && 'border-destructive!',
            Icon && 'ltr:pl-9! rtl:pr-9!',
            className,
          )}
        >
          {Icon && <Icon className="input-icon" />}

          {displayLabel ? (
            <span className="truncate">{displayLabel}</span>
          ) : (
            <span className="text-muted-foreground">
              {placeholder ?? t('placeholder')}
            </span>
          )}

          <div className="flex gap-2 ltr:ml-2 rtl:mr-2">
            {isFetchingNextPage && <Loader2 className="size-4 animate-spin" />}
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0!">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={t('search')}
            value={localSearch}
            onValueChange={setLocalSearch}
          />
          <CommandList
            ref={scrollRef}
            className={cn(
              'thin-scrollbar max-h-75 w-full max-w-72 overflow-y-auto',
              displayClassName,
            )}
          >
            {filteredOptions.length === 0 && !isLoading ? (
              <CommandEmpty>{t('noResultsFound')}</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredOptions.map((opt) => {
                  const isSelected = opt[valueKey] === value;
                  return (
                    <CommandItem
                      key={String(opt[valueKey])}
                      value={String(opt[valueKey])}
                      onSelect={() => handleSelectOption(opt, isSelected)}
                    >
                      <Check
                        className={cn(
                          'size-4 ltr:mr-2 rtl:ml-2',
                          isSelected ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <span className="text-wrap">{String(opt[labelKey])}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}

            <SelectListStatus
              isLoading={isLoading}
              hasNextPage={hasNextPage}
              hasResults={filteredOptions.length > 0}
              showNoMoreResultsLabel={hasMoreLabel}
              labels={{
                loadingMore: t('loadingMore'),
                scrollToLoad: t('scrollToLoad'),
                noMoreResults: t('noMoreResults'),
              }}
            />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export type GenericMultiSelectOptionState = {
  isSelected: boolean;
};

export type GenericMultiSelectProps<T extends Record<string, unknown>> = {
  options: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  value: T[keyof T][];
  onValueChange: (value: T[keyof T][]) => void;
  defaultOptions?: T[];
  onSearchChange?: (searchTerm: string) => void;
  onLoadMore?: () => void;
  renderOption?: (option: T, state: GenericMultiSelectOptionState) => ReactNode;
  displayClassName?: string;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  className?: string;
  placeholder?: string;
  hasMoreLabel?: boolean;
  invalid?: boolean;
  icon?: ElementType;
  disabled?: boolean;
};

export function GenericMultiSelect<T extends Record<string, unknown>>({
  options,
  valueKey,
  labelKey,
  value,
  onValueChange,
  defaultOptions,
  onSearchChange,
  onLoadMore,
  renderOption,
  hasNextPage,
  isFetchingNextPage,
  placeholder,
  isLoading,
  className,
  displayClassName,
  invalid,
  hasMoreLabel = true,
  icon: Icon,
  disabled,
}: GenericMultiSelectProps<T>) {
  const [localSearch, setLocalSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(localSearch, SEARCH_DEBOUNCE_MS);

  const { t } = useTranslation('common', { keyPrefix: 'asyncSelect' });

  const hasNextPageRef = useLatest(hasNextPage);
  const isFetchingNextPageRef = useLatest(isFetchingNextPage);
  const isLoadingRef = useLatest(isLoading);
  const onLoadMoreRef = useLatest(onLoadMore);

  useEffect(() => {
    if (onSearchChange && isOpen) {
      onSearchChange(debouncedSearch);
    }
  }, [debouncedSearch, onSearchChange, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    let listenerCleanup: (() => void) | undefined;

    const timerId = setTimeout(() => {
      const container = scrollRef.current;
      if (!container) return;

      const handleScroll = () => {
        if (
          !hasNextPageRef.current ||
          isFetchingNextPageRef.current ||
          isLoadingRef.current ||
          !onLoadMoreRef.current
        )
          return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        const nearBottom =
          scrollTop + clientHeight >= scrollHeight - NEAR_BOTTOM_THRESHOLD_PX;
        if (nearBottom) onLoadMoreRef.current();
      };

      const stopPropagation = (e: Event) => e.stopPropagation();

      container.addEventListener('scroll', handleScroll, { passive: true });
      container.addEventListener('wheel', stopPropagation, { passive: true });
      container.addEventListener('touchmove', stopPropagation, {
        passive: true,
      });

      listenerCleanup = () => {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('wheel', stopPropagation);
        container.removeEventListener('touchmove', stopPropagation);
      };
    }, POPOVER_MOUNT_DELAY_MS);

    return () => {
      clearTimeout(timerId);
      listenerCleanup?.();
    };
  }, [
    isOpen,
    hasNextPageRef,
    isFetchingNextPageRef,
    isLoadingRef,
    onLoadMoreRef,
  ]);

  const [seenOptions, setSeenOptions] = useState<Map<T[keyof T], T>>(() => {
    const initialMap = new Map<T[keyof T], T>();
    for (const option of defaultOptions ?? []) {
      initialMap.set(option[valueKey], option);
    }
    for (const option of options) {
      initialMap.set(option[valueKey], option);
    }
    return initialMap;
  });

  const [prevOptionSources, setPrevOptionSources] = useState({
    options,
    defaultOptions,
  });

  if (
    prevOptionSources.options !== options ||
    prevOptionSources.defaultOptions !== defaultOptions
  ) {
    setPrevOptionSources({ options, defaultOptions });

    const next = new Map(seenOptions);
    let hasChanges = false;

    for (const option of defaultOptions ?? []) {
      if (next.get(option[valueKey]) !== option) {
        next.set(option[valueKey], option);
        hasChanges = true;
      }
    }
    for (const option of options) {
      if (next.get(option[valueKey]) !== option) {
        next.set(option[valueKey], option);
        hasChanges = true;
      }
    }

    if (hasChanges) {
      setSeenOptions(next);
    }
  }

  const selectedSet = useMemo(() => new Set(value), [value]);

  const selectedOptions = useMemo(
    () =>
      value
        .map((v) => seenOptions.get(v))
        .filter((option): option is T => option != null),
    [value, seenOptions],
  );

  const isExternallyFiltered = Boolean(onSearchChange);

  const filteredOptions = useMemo(() => {
    const trimmedSearch = debouncedSearch.trim();

    let base = options;
    if (!isExternallyFiltered && trimmedSearch) {
      const term = trimmedSearch.toLowerCase();
      base = options.filter((opt) => {
        const label = String(opt[labelKey] ?? '').toLowerCase();
        const key = String(opt[valueKey] ?? '').toLowerCase();
        return label.includes(term) || key.includes(term);
      });
    }

    return base.filter((opt) => !selectedSet.has(opt[valueKey]));
  }, [
    isExternallyFiltered,
    options,
    debouncedSearch,
    labelKey,
    valueKey,
    selectedSet,
  ]);

  const handleToggleOption = useCallback(
    (optionValue: T[keyof T]) => {
      const next = selectedSet.has(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onValueChange(next);
    },
    [value, selectedSet, onValueChange],
  );

  const renderRow = (option: T, isSelected: boolean) =>
    renderOption ? (
      renderOption(option, { isSelected })
    ) : (
      <>
        <Check
          className={cn(
            'size-4 ltr:mr-2 rtl:ml-2',
            isSelected ? 'opacity-100' : 'opacity-0',
          )}
        />
        <span className="text-wrap">{String(option[labelKey])}</span>
      </>
    );

  const hasAnyResults =
    selectedOptions.length > 0 || filteredOptions.length > 0;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-invalid={invalid}
          className={cn(
            'dark:bg-input/50 border-input bg-input/20 relative w-full justify-between!',
            invalid && 'border-destructive!',
            Icon && 'ltr:pl-9! rtl:pr-9!',
            className,
          )}
        >
          {Icon && <Icon className="input-icon" />}

          {value.length > 0 ? (
            <span className="truncate">
              {t('selectedCount', { count: value.length })}
            </span>
          ) : (
            <span className="text-muted-foreground">
              {placeholder ?? t('placeholder')}
            </span>
          )}

          <div className="flex gap-2 ltr:ml-2 rtl:mr-2">
            {isFetchingNextPage && <Loader2 className="size-4 animate-spin" />}
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0!">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={t('search')}
            value={localSearch}
            onValueChange={setLocalSearch}
          />
          <CommandList
            ref={scrollRef}
            className={cn(
              'thin-scrollbar max-h-96 w-full max-w-96 overflow-y-auto',
              displayClassName,
            )}
          >
            {!hasAnyResults && !isLoading ? (
              <CommandEmpty>{t('noResultsFound')}</CommandEmpty>
            ) : (
              <>
                {selectedOptions.length > 0 && (
                  <CommandGroup heading={t('selectedGroupLabel')}>
                    {selectedOptions.map((opt) => (
                      <CommandItem
                        key={String(opt[valueKey])}
                        value={String(opt[valueKey])}
                        onSelect={() => handleToggleOption(opt[valueKey])}
                        style={{
                          contentVisibility: 'auto',
                          containIntrinsicSize: `auto ${OPTION_ROW_INTRINSIC_SIZE_PX}px`,
                        }}
                      >
                        {renderRow(opt, true)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {filteredOptions.length > 0 && (
                  <CommandGroup>
                    {filteredOptions.map((opt) => (
                      <CommandItem
                        key={String(opt[valueKey])}
                        value={String(opt[valueKey])}
                        onSelect={() => handleToggleOption(opt[valueKey])}
                        style={{
                          contentVisibility: 'auto',
                          containIntrinsicSize: `auto ${OPTION_ROW_INTRINSIC_SIZE_PX}px`,
                        }}
                      >
                        {renderRow(opt, false)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}

            <SelectListStatus
              isLoading={isLoading}
              hasNextPage={hasNextPage}
              hasResults={filteredOptions.length > 0}
              showNoMoreResultsLabel={hasMoreLabel}
              labels={{
                loadingMore: t('loadingMore'),
                scrollToLoad: t('scrollToLoad'),
                noMoreResults: t('noMoreResults'),
              }}
            />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
