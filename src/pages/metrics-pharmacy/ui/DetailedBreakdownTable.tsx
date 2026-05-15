import { List } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { ScoreBadge } from './PharmacyScoreBadge';
import type { PharmacyMetrics } from '../model/pharmacyMetricsTypes';
import { formatDate } from '@/shared/lib';
import {
  DetailCard,
  Table,
  TableActions,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

type Props = { metrics: PharmacyMetrics[] };

export function DetailedBreakdownTable({ metrics }: Props) {
  const { t, i18n } = useTranslation('metrics', {
    keyPrefix: 'pharmacy.detailedBreakdown',
  });

  return (
    <DetailCard title={t('title')} subtitle={t('subtitle')} icon={List}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('colPharmacy')}</TableHead>
            <TableHead>{t('colScore')}</TableHead>
            <TableHead>{t('colRecencyScore')}</TableHead>
            <TableHead>{t('colOrders')}</TableHead>
            <TableHead>{t('colCompletion')}</TableHead>
            <TableHead>{t('colItems')}</TableHead>
            <TableHead>{t('colCalculatedAt')}</TableHead>
            <TableHead>{t('colActions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.id}>
              <TableCell>
                {t('pharmacy')} #{metric.pharmacy_id}
              </TableCell>
              <TableCell>
                <ScoreBadge score={metric.score} />
              </TableCell>
              <TableCell>
                <ScoreBadge score={metric.recency_score} />
              </TableCell>
              <TableCell>
                <span className="font-medium">{metric.completed_orders}</span>
                <span className="text-muted-foreground text-xs">
                  /{metric.total_orders}
                </span>
              </TableCell>
              <TableCell>
                {(+metric.completion_rate * 100).toFixed(1)}%
              </TableCell>
              <TableCell>
                <span>{metric.total_items}</span>{' '}
                <span className="text-muted-foreground text-xs">
                  ({t('avg')} {metric.avg_items_per_order})
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(metric.calculated_at, i18n.language, false)}
              </TableCell>
              <TableActions
                item={metric}
                itemId={metric.pharmacy_id}
                path="/dashboard/pharmacies"
              >
                <TableActions.Detail />
              </TableActions>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DetailCard>
  );
}
