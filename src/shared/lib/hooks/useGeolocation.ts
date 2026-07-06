import { useCallback, useRef, useState } from 'react';

export type LatLng = { lat: number; lng: number };

type GeolocationState =
  | { status: 'idle'; coords?: null }
  | { status: 'loading'; coords?: null }
  | { status: 'success'; coords: LatLng }
  | { status: 'denied'; coords?: null }
  | { status: 'unavailable'; coords?: null }
  | { status: 'timeout'; coords?: null };

function getErrorStatus(code: number): 'denied' | 'timeout' | 'unavailable' {
  switch (code) {
    case GeolocationPositionError.PERMISSION_DENIED:
      return 'denied';
    case GeolocationPositionError.TIMEOUT:
      return 'timeout';
    default:
      return 'unavailable';
  }
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({ status: 'idle' });

  const isRequestingRef = useRef(false);

  const requestLocation = useCallback(() => {
    if (isRequestingRef.current) return;

    if (!navigator.geolocation) {
      setState({ status: 'unavailable' });
      return;
    }

    isRequestingRef.current = true;
    setState({ status: 'loading' });

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        isRequestingRef.current = false;
        setState({
          status: 'success',
          coords: { lat: coords.latitude, lng: coords.longitude },
        });
      },
      ({ code }) => {
        isRequestingRef.current = false;
        setState({ status: getErrorStatus(code) });
      },
      { timeout: 15_000, maximumAge: 60_000, enableHighAccuracy: true },
    );
  }, []);

  return { ...state, requestLocation };
}
