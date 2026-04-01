import { useCallback, useState } from 'react';

export type LatLng = { lat: number; lng: number };

type GeolocationState =
  | { status: 'idle'; coords?: null }
  | { status: 'loading'; coords?: null }
  | { status: 'success'; coords: LatLng }
  | { status: 'denied'; coords?: null }
  | { status: 'unavailable'; coords?: null }
  | { status: 'timeout'; coords?: null };

type UseGeolocationReturn = GeolocationState & {
  requestLocation: () => void;
};

export function useGeolocation(): UseGeolocationReturn {
  const [state, setState] = useState<GeolocationState>({ status: 'idle' });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({ status: 'unavailable' });
      return;
    }

    setState({ status: 'loading' });

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setState({
          status: 'success',
          coords: { lat: coords.latitude, lng: coords.longitude },
        });
      },
      ({ code }) => {
        setState({
          status:
            code === GeolocationPositionError.PERMISSION_DENIED
              ? 'denied'
              : code === GeolocationPositionError.TIMEOUT
                ? 'timeout'
                : 'unavailable',
        });
      },
      { timeout: 10_000, maximumAge: 60_000, enableHighAccuracy: true },
    );
  }, []);

  return { ...state, requestLocation };
}
