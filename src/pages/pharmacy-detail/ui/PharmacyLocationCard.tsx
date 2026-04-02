import { lazy, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Navigation } from 'lucide-react';

import type { PharmacyDetail } from '@/entities/pharmacy';
import {
  Button,
  Skeleton,
  Separator,
  DetailCard,
  DetailCell,
  ErrorBoundary,
  SectionErrorFallback,
} from '@/shared/ui';

const MapView = lazy(() =>
  import('./MapView').then((m) => ({ default: m.MapView })),
);

type Props = { pharmacy: PharmacyDetail };

export function PharmacyLocationCard({ pharmacy }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.detail',
  });

  const [mapVisible, setMapVisible] = useState(false);

  const position = {
    lat: Number(pharmacy.latitude),
    lng: Number(pharmacy.longitude),
  };

  return (
    <DetailCard
      title={t('locationCardTitle')}
      subtitle={t('locationCardSubtitle')}
      icon={MapPin}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelLatitude')}>
          <span className="flex items-center gap-1.5">
            <Navigation className="text-muted-foreground size-4 shrink-0" />
            <span className="font-mono tabular-nums">{pharmacy.latitude}</span>
          </span>
        </DetailCell>
        <DetailCell label={t('labelLongitude')}>
          <span className="font-mono tabular-nums">{pharmacy.longitude}</span>
        </DetailCell>
      </div>

      <Separator />

      {mapVisible ? (
        <Suspense fallback={<Skeleton className="h-64 w-full rounded-lg" />}>
          <ErrorBoundary FallbackComponent={SectionErrorFallback}>
            <MapView position={position} label={pharmacy.name} />
          </ErrorBoundary>
        </Suspense>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setMapVisible(true)}
        >
          <MapPin className="size-4" />
          {t('showOnMap')}
        </Button>
      )}
    </DetailCard>
  );
}
