import { lazy, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Navigation } from 'lucide-react';

import type { PharmacyDetail } from '@/entities/pharmacy';
import { getLocalized, ErrorBoundary } from '@/shared/lib';
import {
  Button,
  Skeleton,
  Separator,
  DetailCard,
  DetailCell,
  SectionErrorFallback,
} from '@/shared/ui';

const MapView = lazy(() =>
  import('./MapView').then((m) => ({ default: m.MapView })),
);

type Props = { pharmacy: PharmacyDetail };

export function PharmacyLocationCard({ pharmacy }: Props) {
  const { t, i18n } = useTranslation('pharmacies', {
    keyPrefix: 'detail',
  });

  const [mapVisible, setMapVisible] = useState(false);

  const position = {
    lat: Number(pharmacy.latitude),
    lng: Number(pharmacy.longitude),
  };

  const name = getLocalized(pharmacy.name, i18n.language);

  return (
    <DetailCard
      title={t('locationCardTitle')}
      subtitle={t('locationCardSubtitle')}
      icon={MapPin}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelLatitude')}>
          <span className="flex items-center gap-1.5">
            <Navigation className="text-muted-foreground size-3.5 shrink-0" />
            <span className="font-mono tabular-nums">{pharmacy.latitude}</span>
          </span>
        </DetailCell>
        <DetailCell label={t('labelLongitude')}>
          <span className="flex items-center gap-1.5">
            <Navigation className="text-muted-foreground size-3.5 shrink-0 -rotate-90" />
            <span className="font-mono tabular-nums">{pharmacy.longitude}</span>
          </span>
        </DetailCell>
      </div>

      <Separator />

      {mapVisible ? (
        <ErrorBoundary FallbackComponent={SectionErrorFallback}>
          <Suspense fallback={<Skeleton className="h-64 w-full rounded-lg" />}>
            <MapView position={position} label={name} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setMapVisible(true)}
        >
          <MapPin className="size-3.5" />
          {t('showOnMap')}
        </Button>
      )}
    </DetailCard>
  );
}
