import { useCallback, useMemo, useRef, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '../lib';
import { Button } from './Button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from './command';

export type MultiSelectOption = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: MultiSelectOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  invalid?: boolean;
  renderValue?: (selectedValues: string[]) => React.ReactNode;
  className?: string;
};

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = 'Select options...',
  emptyText = 'No results found.',
  disabled = false,
  invalid = false,
  renderValue,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);

  const selectedSet = useMemo(() => new Set(value), [value]);
  const handleSelect = useCallback(
    (itemValue: string) => {
      const updatedValues = selectedSet.has(itemValue)
        ? value.filter((v) => v !== itemValue)
        : [...value, itemValue];
      onValueChange(updatedValues);
    },
    [selectedSet, value, onValueChange],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'bg-card hover:bg-card/90 flex w-full items-center justify-between px-3 font-normal transition-colors',
            !value.length && 'text-muted-foreground',
            invalid &&
              'border-destructive ring-destructive focus-visible:ring-destructive',
            className,
          )}
        >
          <span className="flex-1 truncate text-start">
            {value.length > 0
              ? renderValue
                ? renderValue(value)
                : `${value.length} selected`
              : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="p-0!"
        align="start"
        style={{ width: 'var(--radix-popover-trigger-width)' }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          commandRef.current?.focus();
        }}
      >
        <Command ref={commandRef} tabIndex={-1}>
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Check
                    className={cn(
                      'size-4 shrink-0 transition-opacity',
                      selectedSet.has(option.value)
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  <span className="flex-1 text-start">{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
