import { useTranslation } from 'react-i18next';

import type { TargetAchievement } from '@/entities/target';
import { formatDate, formatPrice } from '@/shared/lib';
import { TableRow, TableCell, Badge, LabeledLink } from '@/shared/ui';

type Props = { target: TargetAchievement; canViewEmployee: boolean };

export function AchievementRow({ target, canViewEmployee }: Props) {
  const { t, i18n } = useTranslation('targets');

  return (
    <TableRow>
      <TableCell>
        <LabeledLink
          to={
            canViewEmployee
              ? `/dashboard/employees/${target.representative_id}`
              : undefined
          }
          label={target.representative_name}
        />
      </TableCell>

      <TableCell className="font-semibold tabular-nums">
        {formatPrice(target.achieved_value, i18n.language)}
      </TableCell>

      <TableCell>
        {target.achieved_at ? (
          <div className="space-y-0.5">
            <Badge variant="success" className="text-xs font-normal">
              {t('statusAchieved')}
            </Badge>
            <p className="text-muted-foreground text-[11px]">
              {formatDate(target.achieved_at, i18n.language)}
            </p>
          </div>
        ) : (
          <Badge variant="muted" className="text-xs font-normal">
            {t('statusPending')}
          </Badge>
        )}
      </TableCell>
    </TableRow>
  );
}
