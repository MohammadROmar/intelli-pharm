import { memo, useCallback, useMemo } from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import { useTranslation } from 'react-i18next';

import { useLivePosition } from '../model/useLivePosition';
import { useTrackingTick } from '../model/useTrackingTick';
import { getPreviousPosition } from '../model/trackingStore';
import { bucketHeading, resolveHeading } from '../lib/bearing';
import { getLiveMarkerIcon } from '../lib/markerIcon';
import { getStalenessLevel } from '../lib/staleness';
import './tracking-marker.css';
import { LabeledLink } from '@/shared/ui';
import { Gauge, Route } from 'lucide-react';

const FOCUSED_Z_INDEX_OFFSET = 1000;

type Props = {
  userId: number;
  isFocused?: boolean;
  onSelect?: (userId: number) => void;
};

export const LiveMarker = memo(function LiveMarker({
  userId,
  isFocused = false,
  onSelect,
}: Props) {
  const { t, i18n } = useTranslation('tracking', { keyPrefix: 'marker' });
  const position = useLivePosition(userId);
  useTrackingTick();

  const heading = useMemo(() => {
    if (!position) return null;
    return resolveHeading(position, getPreviousPosition(userId));
  }, [position, userId]);

  const role = position?.r;
  const headingBucket = heading ? bucketHeading(heading.degrees) : null;
  const staleness = position ? getStalenessLevel(position.ts) : 'critical';
  const hasTask = position?.tid != null;

  const icon = useMemo(() => {
    if (!role) return null;
    return getLiveMarkerIcon({ role, headingBucket, staleness, hasTask });
  }, [role, headingBucket, staleness, hasTask]);

  const handleClick = useCallback(() => {
    onSelect?.(userId);
  }, [onSelect, userId]);

  const eventHandlers = useMemo(
    () => (onSelect ? { click: handleClick } : undefined),
    [onSelect, handleClick],
  );

  if (!position || !icon) return null;

  return (
    <Marker
      position={[position.lat, position.lon]}
      icon={icon}
      zIndexOffset={isFocused ? FOCUSED_Z_INDEX_OFFSET : 0}
      eventHandlers={eventHandlers}
    >
      <Tooltip
        key={i18n.language}
        permanent
        direction="bottom"
        offset={[0, 25]}
        opacity={1}
        interactive={false}
        className="tracking-marker-label font-cairo! z-10!"
      >
        <span
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          className="bg-card/80 text-foreground border-border/60 rounded-full border px-2 py-0.5 text-[11px] leading-none font-medium whitespace-nowrap shadow-sm"
        >
          {position.name}
        </span>
      </Tooltip>

      <Popup className="font-cairo z-20!">
        <div
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          className="min-w-40 space-y-0.5!"
        >
          <LabeledLink
            to={`/dashboard/employees/${position.u}`}
            label={position.name}
            className="text-card-foreground! hover:text-primary! text-sm leading-snug font-semibold"
          />

          <p className="text-muted-foreground text-xs">
            {t(position.r, position.r)}
          </p>
          <div className="mt-2 flex items-center gap-3">
            {position.tid != null && (
              <div className="text-muted-foreground flex items-center gap-1">
                <Route className="size-3 shrink-0" />
                <LabeledLink
                  label={t('onTask', { id: position.tid })}
                  to={`/dashboard/plans/${position.tid}`}
                  withIcon={false}
                  className="text-muted-foreground! hover:text-primary! text-xs"
                />
              </div>
            )}

            <p className="text-muted-foreground m-0! flex items-center gap-1 text-xs">
              <Gauge className="size-3 shrink-0" />
              {position.s} {t('unitSpeed')}
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
});
