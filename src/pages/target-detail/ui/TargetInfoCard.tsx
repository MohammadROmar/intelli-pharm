import { useTranslation } from 'react-i18next';
import {
  CalendarDays,
  CalendarRange,
  CircleDollarSign,
  RefreshCw,
  Target,
} from 'lucide-react';

import type { Target as TTarget } from '@/entities/target';
import { formatPrice } from '@/shared/lib';
import {
  Badge,
  DetailCard,
  DetailCell,
  Separator,
  SplitDateTime,
} from '@/shared/ui';

type Props = { target: TTarget };

export function TargetInfoCard({ target }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'targetsPage.detail',
  });
  const isMonthly = target.type === 'monthly';
  const TypeIcon = isMonthly ? CalendarDays : CalendarRange;

  const typeBadgeClass = isMonthly
    ? 'border-blue-500/30! bg-blue-500/10! text-blue-500!'
    : 'border-purple-500/30! bg-purple-500/10! text-purple-500!';

  return (
    <DetailCard
      title={t('cardTitle')}
      subtitle={t('cardSubtitle')}
      icon={Target}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelId')}>
          <span className="font-mono">
            TGT-{String(target.id).padStart(6, '0')}
          </span>
        </DetailCell>
        <DetailCell label={t('labelStatus')}>
          <Badge variant={target.is_active ? 'success' : 'muted'}>
            {target.is_active ? t('active') : t('inactive')}
          </Badge>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelType')}>
          <Badge variant="outline" className={typeBadgeClass}>
            <TypeIcon className="mr-1 size-3" />
            {t(`type.${target.type}`)}
          </Badge>
        </DetailCell>
        <DetailCell label={t('labelValue')}>
          <span className="flex items-center gap-1.5">
            <CircleDollarSign className="text-muted-foreground size-4 shrink-0" />
            <span className="text-foreground text-lg font-bold tabular-nums">
              {formatPrice(target.value, i18n.language)}
            </span>
          </span>
        </DetailCell>
      </div>

      <Separator />

      <DetailCell label={t('labelName')}>
        <span className="text-foreground font-medium">{target.name}</span>
      </DetailCell>

      <DetailCell label={t('labelDescription')}>
        <p className="text-foreground/80 text-sm leading-relaxed">
          {target.description}
        </p>
      </DetailCell>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelCreatedAt')}>
          <SplitDateTime date={target.created_at} icon={CalendarDays} />
        </DetailCell>

        <DetailCell label={t('labelUpdatedAt')}>
          <SplitDateTime date={target.updated_at} icon={RefreshCw} />
        </DetailCell>
      </div>
    </DetailCard>
  );
}
