import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays } from 'lucide-react';

import {
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui';

export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

const QUARTERS: Quarter[] = ['Q1', 'Q2', 'Q3', 'Q4'];
const ALL_SELECTION = 'ALL';

function getYearOptions(): string[] {
  const current = new Date().getFullYear();
  return Array.from({ length: 7 }, (_, i) => String(current + 1 - i));
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
  const { t } = useTranslation('translation', {
    keyPrefix: 'metricsPage.yearQuarterPicker',
  });

  const yearOptions = useMemo(() => getYearOptions(), []);
  const isQuarterDisabled = disabled || !year;

  const handleYearChange = (value: string) => {
    const isClearing = value === ALL_SELECTION;
    const newYear = isClearing ? undefined : value;

    onChange({
      year: newYear,
      quarter: newYear ? (quarter as Quarter) : undefined,
    });
  };

  const handleQuarterChange = (value: string) => {
    const isClearing = value === ALL_SELECTION;

    onChange({
      year,
      quarter: isClearing ? undefined : (value as Quarter),
    });
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <div className="flex flex-col gap-1">
        <Select
          value={year ?? ALL_SELECTION}
          onValueChange={handleYearChange}
          disabled={disabled}
        >
          <SelectTrigger className="h-8 w-32 text-sm">
            <CalendarDays className="text-muted-foreground mr-2 size-3.5 shrink-0" />
            <SelectValue placeholder={t('yearPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_SELECTION}>{t('allYears')}</SelectItem>
            {yearOptions.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-block">
                <Select
                  value={quarter ?? ALL_SELECTION}
                  onValueChange={handleQuarterChange}
                  disabled={isQuarterDisabled}
                >
                  <SelectTrigger
                    className="h-8 w-24 text-sm"
                    data-disabled={isQuarterDisabled || undefined}
                  >
                    <SelectValue placeholder={t('quarterPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ALL_SELECTION}>
                      {t('allQuarters')}
                    </SelectItem>
                    {QUARTERS.map((q) => (
                      <SelectItem key={q} value={q}>
                        {q}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

      {(year || quarter) && (
        <Badge
          variant="secondary"
          className="h-8 self-start px-2.5 text-xs font-normal sm:self-auto"
        >
          {[year, quarter].filter(Boolean).join(' · ')}
        </Badge>
      )}
    </div>
  );
}
