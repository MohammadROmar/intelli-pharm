import { useTranslation } from 'react-i18next';

import type { PharmacyTier } from '@/entities/metrics';
import { cn } from '@/shared/lib';

const tierStyles: Record<PharmacyTier, string> = {
  Gold: [
    'text-yellow-700 bg-yellow-50 border-yellow-200',
    'dark:text-yellow-400 dark:bg-yellow-950 dark:border-yellow-800',
  ].join(' '),
  Silver: [
    'text-slate-600 bg-slate-50 border-slate-200',
    'dark:text-slate-300 dark:bg-slate-900 dark:border-slate-700',
  ].join(' '),
  Bronze: [
    'text-orange-700 bg-orange-50 border-orange-200',
    'dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800',
  ].join(' '),
};

type Props = {
  tier: PharmacyTier;
  className?: string;
};

export function TierBadge({ tier, className }: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'pharmacy.tiers' });

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        tierStyles[tier],
        className,
      )}
    >
      {t(tier)}
    </span>
  );
}
