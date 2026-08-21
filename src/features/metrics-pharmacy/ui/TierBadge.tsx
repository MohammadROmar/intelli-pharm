import { useTranslation } from 'react-i18next';

import type { PharmacyTier } from '@/entities/metrics';
import { cn } from '@/shared/lib';

const tierStyles: Record<PharmacyTier, string> = {
  Platinum: [
    'border-indigo-200/80 bg-indigo-50 text-indigo-700',
    'dark:border-indigo-400/25 dark:bg-indigo-400/10 dark:text-indigo-300',
  ].join(' '),

  Gold: [
    'border-amber-200/80 bg-amber-50 text-amber-700',
    'dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300',
  ].join(' '),

  Silver: [
    'border-slate-300/70 bg-slate-100/80 text-slate-600',
    'dark:border-slate-300/20 dark:bg-slate-300/10 dark:text-slate-300',
  ].join(' '),

  Bronze: [
    'border-orange-200/70 bg-orange-50/80 text-orange-800',
    'dark:border-orange-400/25 dark:bg-orange-400/10 dark:text-orange-300',
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
