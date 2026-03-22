import { useTranslation } from 'react-i18next';
import { PackageCheck } from 'lucide-react';

import { MedicineDetailCard } from './MedicineDetailCard';
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
} from '@/shared/ui';

const TODAY = new Date();
const NINETY_DAYS = 1000 * 60 * 60 * 24 * 90;

function expiryStatus(dateStr: string): 'expired' | 'expiring' | 'ok' {
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
    <MedicineDetailCard
      title={t('stocksTitle')}
      subtitle={t('stocksSubtitle')}
      itemsCount={stocks.length}
      icon={PackageCheck}
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
            const status = expiryStatus(stock.expiry_date);

            return (
              <TableRow key={stock.id}>
                <TableCell className="font-medium">
                  {stock.warehouse_id}
                </TableCell>

                <TableCell className="tabular-nums">
                  {stock.quantity.toLocaleString()}
                </TableCell>

                <TableCell
                  className={
                    status === 'expired'
                      ? 'text-destructive font-medium'
                      : status === 'expiring'
                        ? 'font-medium text-yellow-600 dark:text-yellow-400'
                        : 'text-muted-foreground'
                  }
                >
                  {formatDate(stock.expiry_date, i18n.language, false)}
                </TableCell>

                <TableCell>
                  {status === 'expired' ? (
                    <Badge variant="destructive" className="font-normal">
                      {t('stockExpired')}
                    </Badge>
                  ) : status === 'expiring' ? (
                    <Badge
                      variant="outline"
                      className="border-yellow-500 font-normal text-yellow-600 dark:text-yellow-400"
                    >
                      {t('stockExpiringSoon')}
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="font-normal">
                      {t('stockOk')}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </MedicineDetailCard>
  );
}
