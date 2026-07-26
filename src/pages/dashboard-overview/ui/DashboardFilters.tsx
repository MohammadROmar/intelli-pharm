import { useTranslation } from 'react-i18next';

import { RegionSelector } from '@/entities/region';
import { Separator, Tabs, TabsList, TabsTrigger } from '@/shared/ui';

import type { DashboardRange } from '../model/types';

type DashboardFiltersProps = {
  range: DashboardRange;
  onRangeChange: (range: DashboardRange) => void;
  areaId: number | null;
  onAreaIdChange: (areaId: number | null) => void;
};

export const TAB_OPTIONS = [
  'today',
  '7d',
  '30d',
] as const satisfies readonly DashboardRange[];

export function DashboardFilters({
  range,
  onRangeChange,
  areaId,
  onAreaIdChange,
}: DashboardFiltersProps) {
  const { t } = useTranslation('dashboard-overview', { keyPrefix: 'range' });

  return (
    <div className="bg-card flex w-full flex-col gap-3 rounded-lg border p-2 shadow-sm sm:w-fit sm:flex-row sm:items-center">
      <Tabs
        value={range}
        onValueChange={(value) => {
          if (value) onRangeChange(value as DashboardRange);
        }}
        className="w-full sm:w-auto"
      >
        <TabsList className="w-full sm:w-auto">
          {TAB_OPTIONS.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="w-full cursor-pointer sm:w-auto"
            >
              {t(tab)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

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
