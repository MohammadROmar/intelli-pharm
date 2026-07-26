import { useTranslation } from 'react-i18next';

import type { PlanDetail, PlanReason } from '@/entities/plan';
import { Badge, PageTitle } from '@/shared/ui';

const REASON_VARIANT: Record<PlanReason, 'muted' | 'info'> = {
  initiated: 'muted',
  replanning: 'info',
};

export function PlanDetailHeader({ plan }: { plan: PlanDetail }) {
  const { t } = useTranslation('plan', { keyPrefix: 'detail' });

  const reasonVariant = REASON_VARIANT[plan.reason];

  return (
    <div className="flex items-center gap-2">
      <PageTitle title={`${t('title', { id: plan.id })}`} />
      <Badge variant={reasonVariant} className="capitalize">
        {t(`reason.${plan.reason}`, { defaultValue: plan.reason })}
      </Badge>
    </div>
  );
}
