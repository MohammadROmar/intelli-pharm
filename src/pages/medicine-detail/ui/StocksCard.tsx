import { useTranslation } from 'react-i18next';
import { Boxes } from 'lucide-react';

import { STATUS_CONFIG } from '../lib/statusConfig';
import type { MedicineStock } from '@/entities/medicine';
import { formatDate } from '@/shared/lib';
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DetailCard,
} from '@/shared/ui';

const TODAY = new Date();
const NINETY_DAYS = 1000 * 60 * 60 * 24 * 90;

type ExpiryStatus = 'expired' | 'expiring' | 'ok';

function getExpiryStatus(dateStr: string): ExpiryStatus {
  const expiry = new Date(dateStr);
  if (expiry < TODAY) return 'expired';
  if (expiry.getTime() - TODAY.getTime() < NINETY_DAYS) return 'expiring';
  return 'ok';
}

type Props = { stocks: MedicineStock[] };

export function StocksCard({ stocks }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.detail',
  });

  return (
    <DetailCard
      title={t('stocksTitle')}
      subtitle={t('stocksSubtitle')}
      itemsCount={stocks.length}
      icon={Boxes}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('stockWarehouse')}</TableHead>
            <TableHead className="tabular-nums">{t('stockQuantity')}</TableHead>
            <TableHead>{t('stockExpiry')}</TableHead>
            <TableHead>{t('stockStatus')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => {
            const status = getExpiryStatus(stock.expiry_date);
            const config = STATUS_CONFIG[status];

            return (
              <TableRow key={stock.id}>
                <TableCell className="font-medium">
                  {stock.warehouse_id}
                </TableCell>

                <TableCell className="tabular-nums">
                  {stock.quantity.toLocaleString()}
                </TableCell>

                <TableCell className={config.dateClassName}>
                  {formatDate(stock.expiry_date, i18n.language, false)}
                </TableCell>

                <TableCell>
                  <Badge variant={config.variant} className="font-normal">
                    {t(config.translationKey)}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </DetailCard>
  );
}
