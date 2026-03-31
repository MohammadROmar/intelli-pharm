import { useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { LatLng } from '@/shared/lib';
import type { Pharmacy } from './pharmacyTypes';

type UseLocationPickerFormReturn = {
  position: LatLng;
  setPosition: (next: LatLng) => void;
};

export function useLocationPickerForm(): UseLocationPickerFormReturn {
  const { setValue, control } = useFormContext<Pharmacy>();

  const [lat, lng] = useWatch({
    control,
    name: ['latitude', 'longitude'],
  });

  const position: LatLng = { lat: +lat, lng: +lng };

  const setPosition = useCallback(
    (next: LatLng) => {
      setValue('latitude', next.lat, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('longitude', next.lng, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue],
  );

  return { position, setPosition };
}
