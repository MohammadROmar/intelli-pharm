import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export function useFormatDuration() {
  const { t } = useTranslation('plan');

  return useCallback(
    (seconds: number | string | null | undefined) => {
      const totalSecRaw =
        typeof seconds === 'string' ? parseFloat(seconds) : seconds;

      if (totalSecRaw == null || Number.isNaN(totalSecRaw)) {
        return t('duration.notAvailable');
      }

      const totalMin = Math.round(totalSecRaw / 60);

      if (totalMin < 1) return t('duration.lessThanMinute');

      const days = Math.floor(totalMin / 1440);
      const hours = Math.floor((totalMin % 1440) / 60);
      const mins = totalMin % 60;

      if (days > 0) {
        if (hours === 0) return t('duration.days', { count: days });
        return t('duration.daysAndHours', {
          days: t('duration.days', { count: days }),
          hours: t('duration.hours', { count: hours }),
        });
      }

      if (hours === 0) return t('duration.minutes', { count: mins });
      if (mins === 0) return t('duration.hours', { count: hours });

      return t('duration.hoursAndMinutes', {
        hours: t('duration.hours', { count: hours }),
        minutes: t('duration.minutes', { count: mins }),
      });
    },
    [t],
  );
}
