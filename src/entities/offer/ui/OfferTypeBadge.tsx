import { Badge } from '@/shared/ui';
import type { Offer } from '../model/offerTypes';
import { BadgePercent, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Props = { type: Offer['type'] };

export function OfferTypeBadge({ type }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'offersPage.types',
  });

  const isPercentage = type === 'percentage';

  return (
    <Badge
      variant="outline"
      className={
        isPercentage
          ? 'border-lime-500/30 bg-lime-500/10 px-1.5 py-0 text-xs font-normal text-lime-500'
          : 'border-purple-500/30 bg-purple-500/10 px-1.5 py-0 text-xs font-normal text-purple-500'
      }
    >
      {isPercentage ? (
        <BadgePercent className="size-3" />
      ) : (
        <Gift className="size-3" />
      )}
      {t(type)}
    </Badge>
  );
}
