import { useTranslation } from 'react-i18next';

import type { LatLng } from '../lib';
import { Navigation } from 'lucide-react';

export function CoordinateDisplay({ position }: { position: LatLng }) {
  const { t } = useTranslation('pharmacies', {
    keyPrefix: 'form',
  });
  return (
    <div className="bg-muted/40 flex items-center justify-between gap-4 rounded-lg px-4 py-2.5">
      <div className="flex flex-col items-center gap-1.5 text-xs sm:flex-row">
        <div className="flex items-center gap-1.5">
          <Navigation className="text-muted-foreground size-3.5 shrink-0" />
          <span className="text-muted-foreground">{t('labelLatitude')}</span>
        </div>
        <span className="text-foreground font-mono font-medium tabular-nums">
          {position.lat.toFixed(6)}
        </span>
      </div>
      <div aria-hidden className="bg-border h-4 w-px" />
      <div className="flex flex-col items-center gap-1.5 text-xs sm:flex-row">
        <div className="flex items-center gap-1.5">
          <Navigation className="text-muted-foreground size-3.5 shrink-0 -rotate-90" />
          <span className="text-muted-foreground">{t('labelLongitude')}</span>
        </div>
        <span className="text-foreground font-mono font-medium tabular-nums">
          {position.lng.toFixed(6)}
        </span>
      </div>
    </div>
  );
}
