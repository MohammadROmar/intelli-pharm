import { memo } from 'react';
import { Pane } from 'react-leaflet';

import { useTrackingIds } from '../model/useTrackingIds';
import type { TrackingFilter } from '../model/types';
import { LiveMarker } from './LiveMarker';

type Props = { filter: TrackingFilter };

export const TrackingMarkersLayer = memo(function TrackingMarkersLayer({
  filter,
}: Props) {
  const ids = useTrackingIds(filter);

  return (
    <Pane name="employeeMarkers" style={{ zIndex: 660 }}>
      {ids.map((id) => (
        <LiveMarker key={id} userId={id} />
      ))}
    </Pane>
  );
});
