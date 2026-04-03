import { useTranslation } from 'react-i18next';
import { PackageSearch, ScanBarcode } from 'lucide-react';

import { Button, Card, CardContent, CardFooter, Skeleton } from '@/shared/ui';

type NotFoundProps = {
  barcode: string;
  onRescan: () => void;
};

export function BarcodeNotFound({ barcode, onRescan }: NotFoundProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.scan',
  });

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-3">
          <div className="bg-muted text-muted-foreground mx-auto flex size-16 items-center justify-center rounded-2xl">
            <PackageSearch className="size-8" />
          </div>
          <div>
            <h2 className="text-foreground text-xl font-semibold">
              {t('notFoundTitle')}
            </h2>
            <p className="text-muted-foreground mt-1.5 text-sm">
              {t('notFoundMessage')}
            </p>
            <p className="text-muted-foreground mt-2 font-mono text-xs">
              {barcode}
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={onRescan} className="gap-2">
          <ScanBarcode className="size-4" />
          {t('scanAgain')}
        </Button>
      </div>
    </div>
  );
}

export function BarcodeScanSkeleton() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-3 w-16" />
        </div>

        <Card className="overflow-hidden">
          <div className="space-y-3 px-6 pt-6 pb-5">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          <Skeleton className="h-px w-full" />

          <CardContent className="grid grid-cols-2 gap-6 pt-5">
            <div className="space-y-2">
              <Skeleton className="h-2.5 w-12" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-2.5 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          </CardContent>

          <Skeleton className="mx-6 h-px" />

          <CardFooter className="pt-4 pb-5">
            <Skeleton className="h-9 w-full rounded-md" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
