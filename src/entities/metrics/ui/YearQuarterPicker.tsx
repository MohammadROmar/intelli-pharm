import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  GenericSingleSelect,
} from '@/shared/ui';

export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

const QUARTERS: Quarter[] = ['Q1', 'Q2', 'Q3', 'Q4'];
const ALL_SELECTION = 'ALL';

type SelectOption = {
  value: string;
  label: string;
};

function getYearOptions(allLabel: string): SelectOption[] {
  const current = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => {
    const yearString = String(current + 1 - i);
    return { value: yearString, label: yearString };
  });

  return [{ value: ALL_SELECTION, label: allLabel }, ...years];
}

function getQuarterOptions(allLabel: string): SelectOption[] {
  const quarters = QUARTERS.map((q) => ({ value: q, label: q }));
  return [{ value: ALL_SELECTION, label: allLabel }, ...quarters];
}

export type YearQuarterValue = {
  year?: string;
  quarter?: Quarter;
};

type YearQuarterPickerProps = {
  year?: string;
  quarter?: Quarter | string;
  onChange: (value: YearQuarterValue) => void;
  disabled?: boolean;
};

export function YearQuarterPicker({
  year,
  quarter,
  onChange,
  disabled = false,
}: YearQuarterPickerProps) {
  const { t } = useTranslation('metrics', {
    keyPrefix: 'yearQuarterPicker',
  });

  const yearOptions = useMemo(() => getYearOptions(t('allYears')), [t]);
  const quarterOptions = useMemo(
    () => getQuarterOptions(t('allQuarters')),
    [t],
  );

  const isQuarterDisabled = disabled || !year;

  const handleYearChange = (value: string | null) => {
    const isClearing = !value || value === ALL_SELECTION;
    const newYear = isClearing ? undefined : value;

    onChange({
      year: newYear,
      quarter: newYear ? (quarter as Quarter) : undefined,
    });
  };

  const handleQuarterChange = (value: string | null) => {
    const isClearing = !value || value === ALL_SELECTION;

    onChange({
      year,
      quarter: isClearing ? undefined : (value as Quarter),
    });
  };

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      <div className="sm:col-span-2">
        <GenericSingleSelect
          options={yearOptions}
          valueKey="value"
          labelKey="label"
          value={year ?? ALL_SELECTION}
          onValueChange={handleYearChange}
          disabled={disabled}
          icon={CalendarDays}
          className="h-8 w-36 text-sm"
          placeholder={t('yearPlaceholder')}
          hasMoreLabel={false}
        />
      </div>

      <div className="flex flex-col gap-1">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-block">
                <GenericSingleSelect
                  options={quarterOptions}
                  valueKey="value"
                  labelKey="label"
                  value={quarter ?? ALL_SELECTION}
                  onValueChange={handleQuarterChange}
                  disabled={isQuarterDisabled}
                  className="h-8 w-32 text-sm"
                  placeholder={t('quarterPlaceholder')}
                  hasMoreLabel={false}
                />
              </span>
            </TooltipTrigger>
            {isQuarterDisabled && !disabled && (
              <TooltipContent side="bottom" className="text-xs">
                {t('quarterRequiresYear')}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        {isQuarterDisabled && !disabled && (
          <p className="text-muted-foreground text-[11px]">
            {t('quarterRequiresYearShort')}
          </p>
        )}
      </div>
    </div>
  );
}
