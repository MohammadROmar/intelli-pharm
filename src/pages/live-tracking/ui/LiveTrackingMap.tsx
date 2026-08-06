import { useCallback, useEffect, useRef, useState } from 'react';
import L, { type LatLngTuple } from 'leaflet';
import { useMap } from 'react-leaflet';

import {
  TrackingMarkersLayer,
  TrackingFocusRing,
  TrackingConnectionBanner,
  TrackingPermissionDenied,
  useTrackingConnection,
  useTrackingIds,
  useLivePosition,
  useTrackingHydrated,
  getPosition,
  type TrackingFilter,
} from '@/entities/tracking';
import { MapView } from '@/shared/map';

import { FollowChip } from './FollowChip';
import { FollowMapController } from './FollowMapController';

const DEFAULT_CENTER: [number, number] = [33.5138, 36.2765];
const OFFLINE_GRACE_PERIOD_MS = 4000;

type AutoFitControllerProps = { ids: number[] };

function AutoFitController({ ids }: AutoFitControllerProps) {
  const map = useMap();
  const lastFitSignatureRef = useRef<string | null>(null);

  useEffect(() => {
    const signature = ids.join(',');
    if (ids.length === 0 || lastFitSignatureRef.current === signature) return;
    lastFitSignatureRef.current = signature;

    const points: LatLngTuple[] = [];
    for (const id of ids) {
      const position = getPosition(id);
      if (position) points.push([position.lat, position.lon]);
    }

    if (points.length > 0) {
      map.fitBounds(L.latLngBounds(points), { padding: [48, 48], maxZoom: 15 });
    }
  }, [ids, map]);

  return null;
}

type Props = {
  filter: TrackingFilter;
  focusedUserId: number | null;
  onSelectUser: (userId: number) => void;
  canViewEmployee: boolean;
  canViewPlan: boolean;
};

type FocusedPosition = ReturnType<typeof useLivePosition>;

function useFocusedUserPresence(
  focusedUserId: number | null,
  focusedPosition: FocusedPosition,
  isHydrated: boolean,
  onOffline: Props['onSelectUser'],
) {
  const [lastKnownName, setLastKnownName] = useState<string | null>(null);
  const [prevFocusedUserId, setPrevFocusedUserId] = useState(focusedUserId);

  if (focusedUserId !== prevFocusedUserId) {
    setPrevFocusedUserId(focusedUserId);
    setLastKnownName(focusedPosition?.name ?? null);
  } else if (focusedPosition && focusedPosition.name !== lastKnownName) {
    setLastKnownName(focusedPosition.name);
  }

  const isOffline = focusedUserId !== null && !focusedPosition;

  useEffect(() => {
    if (focusedUserId === null || focusedPosition || !isHydrated) return;

    const delay = lastKnownName !== null ? OFFLINE_GRACE_PERIOD_MS : 0;
    const timer = setTimeout(() => onOffline(focusedUserId), delay);
    return () => clearTimeout(timer);
  }, [focusedUserId, focusedPosition, isHydrated, lastKnownName, onOffline]);

  return {
    isOffline,
    displayName: focusedPosition?.name ?? lastKnownName,
  };
}

export function LiveTrackingMap({
  filter,
  focusedUserId,
  onSelectUser,
  canViewEmployee,
  canViewPlan,
}: Props) {
  const { permissionDenied } = useTrackingConnection();
  const ids = useTrackingIds(filter);
  const focusedPosition = useLivePosition(focusedUserId);
  const isHydrated = useTrackingHydrated();

  const [isFollowing, setIsFollowing] = useState(true);
  const [resumeToken, setResumeToken] = useState(0);
  const sessionKey = `${focusedUserId}-${resumeToken}`;
  const [prevSessionKey, setPrevSessionKey] = useState(sessionKey);

  if (sessionKey !== prevSessionKey) {
    setPrevSessionKey(sessionKey);
    setIsFollowing(true);
  }

  const { isOffline, displayName: chipName } = useFocusedUserPresence(
    focusedUserId,
    focusedPosition,
    isHydrated,
    onSelectUser,
  );

  useEffect(() => {
    if (!focusedPosition) return;
    if (focusedUserId !== null && !ids.includes(focusedUserId)) {
      onSelectUser(focusedUserId);
    }
  }, [ids, focusedUserId, focusedPosition, onSelectUser]);

  const handleResumeFollowing = useCallback(() => {
    setResumeToken((n) => n + 1);
  }, []);

  const handleDragDetected = useCallback(() => {
    setIsFollowing(false);
  }, []);

  const handleStopFollowing = useCallback(() => {
    if (focusedUserId !== null) onSelectUser(focusedUserId);
  }, [focusedUserId, onSelectUser]);

  if (permissionDenied) {
    return <TrackingPermissionDenied className="h-140" />;
  }

  return (
    <div className="relative z-0 h-140 w-full overflow-hidden rounded-lg">
      <MapView center={DEFAULT_CENTER} zoom={12} className="z-0 h-full w-full">
        <TrackingMarkersLayer
          filter={filter}
          focusedUserId={focusedUserId}
          onSelectUser={onSelectUser}
          canViewEmployee={canViewEmployee}
          canViewPlan={canViewPlan}
        />

        {focusedUserId !== null && <TrackingFocusRing userId={focusedUserId} />}

        {focusedUserId === null ? (
          <AutoFitController ids={ids} />
        ) : (
          <FollowMapController
            userId={focusedUserId}
            isFollowing={isFollowing}
            sessionKey={sessionKey}
            onDragDetected={handleDragDetected}
          />
        )}
      </MapView>

      <TrackingConnectionBanner />

      {focusedUserId !== null && chipName && (
        <FollowChip
          key={focusedUserId}
          name={chipName}
          isFollowing={isFollowing}
          isOffline={isOffline}
          onResume={handleResumeFollowing}
          onStop={handleStopFollowing}
        />
      )}
    </div>
  );
}
