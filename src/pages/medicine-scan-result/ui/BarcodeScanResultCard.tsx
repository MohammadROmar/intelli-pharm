import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Activity, ArrowRight, Boxes, ScanBarcode, Truck } from 'lucide-react';

import type { BarcodeScanResult } from '@/entities/medicine';
import { buttonVariants, formatPrice } from '@/shared/lib';
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  DetailCell,
  Separator,
} from '@/shared/ui';

type Props = { result: BarcodeScanResult };

export function BarcodeScanResultCard({ result }: Props) {
  const { t, i18n } = useTranslation('medicines', { keyPrefix: 'scan' });

  return (
    <div className="grid h-full">
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ScanBarcode className="text-muted-foreground size-3.5" />
              <span className="text-muted-foreground font-mono text-xs leading-none">
                {result.barcode}
              </span>
            </div>
            <Link
              to="/dashboard/medicines/scan"
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              {t('scanAgain')}
            </Link>
          </div>

          <Card className="overflow-hidden">
            <div className="from-muted/60 to-muted/20 space-y-3 bg-linear-to-b px-6 pt-6 pb-5">
              <div className="flex flex-wrap gap-2">
                <Badge variant={result.is_active ? 'success' : 'muted'}>
                  <Activity />
                  {result.is_active ? t('active') : t('inactive')}
                </Badge>

                <Badge variant={result.in_stock ? 'info' : 'destructive'}>
                  <Boxes />
                  {result.in_stock ? t('inStock') : t('outOfStock')}
                </Badge>

                {result.is_imported && (
                  <Badge variant="outline">
                    <Truck />
                    {t('imported')}
                  </Badge>
                )}
              </div>

              <div>
                <h2 className="text-foreground text-xl leading-tight font-bold">
                  {result.commercial_name}
                </h2>
                <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                  {result.id}
                </p>
              </div>
            </div>

            <Separator />

            <CardContent className="grid grid-cols-2 gap-6 pt-5">
              <DetailCell label={t('labelPrice')}>
                <span className="text-lg font-bold tabular-nums">
                  {formatPrice(result.price, i18n.language)}
                </span>
              </DetailCell>

              <DetailCell label={t('labelAvailableQty')}>
                <span
                  className={
                    result.available_quantity === 0 ? 'text-destructive' : ''
                  }
                >
                  {result.available_quantity.toLocaleString()}{' '}
                  <span className="text-muted-foreground text-xs font-normal">
                    {t('units')}
                  </span>
                </span>
              </DetailCell>
            </CardContent>

            <Separator />

            <CardFooter className="pt-4 pb-5">
              <Link
                to={`/dashboard/medicines/${result.id}`}
                className={buttonVariants({ className: 'group w-full gap-2' })}
              >
                {t('viewFullDetails')}{' '}
                <div className="rtl:rotate-180">
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
