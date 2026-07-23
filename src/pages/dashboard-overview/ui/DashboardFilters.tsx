import { CalendarDays, CalendarRange, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { RegionSelector } from '@/entities/region';
import { Separator, ToggleGroup, ToggleGroupItem } from '@/shared/ui';

import type { DashboardRange } from '../model/types';

type DashboardFiltersProps = {
  range: DashboardRange;
  onRangeChange: (range: DashboardRange) => void;
  areaId: number | null;
  onAreaIdChange: (areaId: number | null) => void;
};

export function DashboardFilters({
  range,
  onRangeChange,
  areaId,
  onAreaIdChange,
}: DashboardFiltersProps) {
  const { t } = useTranslation('dashboard-overview', { keyPrefix: 'range' });

  return (
    <div className="bg-card flex w-full flex-col gap-3 rounded-lg border p-2 shadow-sm sm:w-fit sm:flex-row sm:items-center">
      <ToggleGroup
        type="single"
        variant="outline"
        value={range}
        onValueChange={(value) => {
          if (value) onRangeChange(value as DashboardRange);
        }}
        className="w-full sm:w-auto"
      >
        <ToggleGroupItem value="today" className="flex-1 sm:flex-none">
          <Clock className="size-4" />
          {t('today')}
        </ToggleGroupItem>
        <ToggleGroupItem value="7d" className="flex-1 sm:flex-none">
          <CalendarDays className="size-4" />
          {t('7d')}
        </ToggleGroupItem>
        <ToggleGroupItem value="30d" className="flex-1 sm:flex-none">
          <CalendarRange className="size-4" />
          {t('30d')}
        </ToggleGroupItem>
      </ToggleGroup>

      <Separator orientation="vertical" className="hidden h-6 sm:block" />
      <Separator className="sm:hidden" />

      <div className="w-full sm:w-auto sm:min-w-48">
        <RegionSelector
          value={areaId ?? undefined}
          onValueChange={(value) =>
            onAreaIdChange((value as number | null) ?? null)
          }
          placeholder={t('regionsPlaceholder')}
        />
      </div>
    </div>
  );
}
