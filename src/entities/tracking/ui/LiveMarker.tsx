import { memo, useMemo } from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import { useTranslation } from 'react-i18next';

import { LabeledLink } from '@/shared/ui';

import { useLivePosition } from '../model/useLivePosition';
import { useTrackingTick } from '../model/useTrackingTick';
import { getPreviousPosition } from '../model/trackingStore';
import { bucketHeading, resolveHeading } from '../lib/bearing';
import { getLiveMarkerIcon } from '../lib/markerIcon';
import { getStalenessLevel } from '../lib/staleness';
import './tracking-marker.css';

type Props = { userId: number };

export const LiveMarker = memo(function LiveMarker({ userId }: Props) {
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

  const offsetX = i18n.language === 'ar' ? 36 : 0;

  if (!position || !icon) return null;

  return (
    <Marker position={[position.lat, position.lon]} icon={icon}>
      <Tooltip
        key={i18n.language}
        permanent
        direction="bottom"
        offset={[offsetX, 25]}
        opacity={1}
        interactive={false}
        className="tracking-marker-label font-cairo! z-10!"
      >
        <span className="bg-card/80 text-foreground border-border/60 rounded-full border px-2 py-0.5 text-[11px] leading-none font-medium whitespace-nowrap shadow-sm">
          {position.name}
        </span>
      </Tooltip>

      <Popup className="font-cairo z-20!">
        <div className="min-w-40 space-y-0.5!">
          <p className="text-card-foreground text-sm leading-snug font-semibold">
            {position.name}
          </p>
          <p className="text-muted-foreground text-xs">
            {position.r === 'rep' ? t('rep') : t('delivery')}
          </p>
          {position.tid != null && (
            <LabeledLink
              to={`/dashboard/plans/${position.tid}`}
              label={t('onTask', { id: position.tid })}
            />
          )}
        </div>
      </Popup>
    </Marker>
  );
});
