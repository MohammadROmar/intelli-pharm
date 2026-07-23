import { memo } from 'react';
import { Pane } from 'react-leaflet';

import { LiveMarker } from './LiveMarker';
import type { TrackingFilter } from '../model/types';
import { useTrackingIds } from '../model/useTrackingIds';

type Props = {
  filter: TrackingFilter;
  focusedUserId?: number | null;
  onSelectUser?: (userId: number) => void;
};

export const TrackingMarkersLayer = memo(function TrackingMarkersLayer({
  filter,
  focusedUserId = null,
  onSelectUser,
}: Props) {
  const ids = useTrackingIds(filter);

  return (
    <Pane name="employeeMarkers" style={{ zIndex: 660 }}>
      {ids.map((id) => (
        <LiveMarker
          key={id}
          userId={id}
          isFocused={id === focusedUserId}
          onSelect={onSelectUser}
        />
      ))}
    </Pane>
  );
});
