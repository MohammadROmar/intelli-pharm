import { useTranslation } from 'react-i18next';
import { PackageSearch } from 'lucide-react';
import { Button } from '@/shared/ui';
import { useSearchParams } from 'react-router-dom';

export function MetricsEmptyState() {
  const [, setSearchParams] = useSearchParams();

  const { t } = useTranslation('translation', { keyPrefix: 'metricsPage' });

  return (
    <div className="grid h-full">
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <PackageSearch className="text-muted-foreground size-10" />
        <p className="text-foreground font-semibold">{t('emptyTitle')}</p>
        <p className="text-muted-foreground text-sm">{t('emptySubtitle')}</p>

        <Button size="sm" variant="outline" onClick={() => setSearchParams({})}>
          {t('clearSearch')}
        </Button>
      </div>
    </div>
  );
}
