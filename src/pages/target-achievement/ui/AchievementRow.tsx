import { useTranslation } from 'react-i18next';

import type { TargetAchievement } from '@/entities/target';
import { formatDate, formatPrice } from '@/shared/lib';
import { TableRow, TableCell, Badge } from '@/shared/ui';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

type Props = { target: TargetAchievement };

export function AchievementRow({ target }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'targetsPage',
  });

  return (
    <TableRow>
      <TableCell>
        <Link
          to={`/dashboard/employees/${target.representative_id}`}
          className="hover:text-primary group flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
        >
          <span className="max-w-[20ch] truncate">
            {target.representative_name}
          </span>
          <ExternalLink className="text-muted-foreground size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
        <p className="text-muted-foreground font-mono text-[11px]">
          EMP-{String(target.representative_id).padStart(5, '0')}
        </p>
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
