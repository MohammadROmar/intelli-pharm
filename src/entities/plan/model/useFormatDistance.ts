import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export function useFormatDistance() {
  const { t } = useTranslation('plan');

  return useCallback(
    (meters: number | string) => {
      const m = typeof meters === 'string' ? parseFloat(meters) : meters;

      if (m < 1000) {
        return t('distance.meters', { value: Math.round(m) });
      }

      const km = m / 1000;
      return t('distance.kilometers', { value: km.toFixed(km < 10 ? 2 : 1) });
    },
    [t],
  );
}
