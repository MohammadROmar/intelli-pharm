import { useTranslation } from 'react-i18next';

import {
  useFormatDistance,
  useFormatDuration,
  type PlanSummary,
} from '@/entities/plan';
import { formatDate } from '@/shared/lib';
import { Badge, TableActions, TableCell, TableRow } from '@/shared/ui';

type Props = { plan: PlanSummary };

const REASON_VARIANT: Record<PlanSummary['reason'], 'muted' | 'info'> = {
  initiated: 'muted',
  replanning: 'info',
};

function formatPlanId(id: number) {
  return `PLN-${String(id).padStart(6, '0')}`;
}

export function PlanRow({ plan }: Props) {
  const { t, i18n } = useTranslation('plan', { keyPrefix: 'list' });

  const formatDistance = useFormatDistance();
  const formatDuration = useFormatDuration();

  return (
    <TableRow>
      <TableCell className="text-muted-foreground text-xs">
        {formatPlanId(plan.id)}
      </TableCell>

      <TableCell className="font-medium">{plan.user_name}</TableCell>

      <TableCell>{formatDate(plan.created_at, i18n.language, false)}</TableCell>

      <TableCell>
        <Badge variant={REASON_VARIANT[plan.reason]}>
          {t(`reason.${plan.reason}`)}
        </Badge>
      </TableCell>

      <TableCell>
        <span className="text-muted-foreground inline-flex items-center gap-1.5 text-sm">
          {formatDistance(plan.total_distance_m)}
        </span>
      </TableCell>

      <TableCell>
        <span className="text-muted-foreground inline-flex items-center gap-1.5 text-sm">
          {formatDuration(plan.total_duration_sec)}
        </span>
      </TableCell>

      <TableActions item={plan} itemId={plan.id} path="/dashboard/plans">
        <TableActions.Detail />
      </TableActions>
    </TableRow>
  );
}
