import { CalendarSearch } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui';

type Props = { clearFilters: () => void };

export function MetricsFiltersRequired({ clearFilters }: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'filtersRequired' });

  return (
    <div className="grid h-full">
      <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
        <div className="relative">
          <div className="bg-primary/10 flex size-20 items-center justify-center rounded-2xl">
            <CalendarSearch className="text-primary size-10" />
          </div>
          <div className="bg-primary/20 absolute -inset-2 -z-10 rounded-3xl blur-xl" />
        </div>

        <div className="max-w-sm space-y-2">
          <h2 className="text-foreground text-xl font-bold tracking-tight">
            {t('title')}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t('description')}
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={clearFilters}>
          {t('clearFilters')}
        </Button>
      </div>
    </div>
  );
}
