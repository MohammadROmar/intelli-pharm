import { List } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { MedicineMetric } from '../model/medicineMetricsTypes';
import {
  Badge,
  DetailCard,
  Table,
  TableActions,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

type Props = { metrics: MedicineMetric[] };

export function DetailedBreakdownTable({ metrics }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'metricsPage.medicine.detailedBreakdown',
  });

  return (
    <DetailCard title={t('title')} subtitle={t('subtitle')} icon={List}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('colMedicine')}</TableHead>
            <TableHead>{t('colPeriod')}</TableHead>
            <TableHead>{t('colTotalOrders')}</TableHead>
            <TableHead>{t('colAcceptanceRate')}</TableHead>
            <TableHead>{t('colAlternativesUsed')}</TableHead>
            <TableHead>{t('colActions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.id}>
              <TableCell className="">
                {t('medicine')} #{metric.medicine_id}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {metric.quarter} {metric.year}
                </Badge>
              </TableCell>
              <TableCell>{metric.total_orders}</TableCell>
              <TableCell>
                {(metric.alternative_acceptance_rate * 100).toFixed(1)}%
              </TableCell>
              <TableCell>{metric.alternative_used_count}</TableCell>

              <TableActions
                item={metric}
                itemId={metric.medicine_id}
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
