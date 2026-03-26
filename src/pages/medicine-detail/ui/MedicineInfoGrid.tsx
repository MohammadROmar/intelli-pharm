import { useTranslation } from 'react-i18next';
import {
  Activity,
  CalendarDays,
  Folders,
  Pill,
  RefreshCw,
  Truck,
} from 'lucide-react';

import type { Medicine } from '@/entities/medicine';
import { formatDate, formatPrice } from '@/shared/lib';
import {
  Card,
  CardContent,
  Badge,
  Separator,
  CardHeader,
  CardTitle,
  CardDescription,
  DetailCell,
} from '@/shared/ui';

type Props = { medicine: Medicine };

export function MedicineInfoGrid({ medicine }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.detail',
  });

  return (
    <Card className="h-fit lg:col-span-2">
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <Pill className="size-4" />
            {t('infoTitle')}
          </CardTitle>
          <CardDescription>{t('infoSubtitle')}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-6">
          <DetailCell label={t('labelId')}>{medicine.id}</DetailCell>
          <DetailCell label={t('labelCategory')}>
            <Badge variant="secondary" className="font-normal">
              <Folders className="mr-1 size-3" />
              {medicine.category.name}
            </Badge>
          </DetailCell>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-6">
          <DetailCell label={t('labelPrice')}>
            <span className="text-xl font-bold">
              {formatPrice(medicine.price, i18n.language)}
            </span>
          </DetailCell>
          <DetailCell label={t('labelStatus')}>
            <Badge
              variant={medicine.is_active ? 'default' : 'secondary'}
              className="font-normal"
            >
              <Activity className="mr-1 size-3" />
              {medicine.is_active ? t('active') : t('inactive')}
            </Badge>
          </DetailCell>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-6">
          <DetailCell label={t('labelImported')}>
            {medicine.is_imported ? (
              <Badge variant="outline" className="font-normal">
                <Truck className="mr-1 size-3" />
                {t('yes')}
              </Badge>
            ) : (
              <span className="font-normal">{t('no')}</span>
            )}
          </DetailCell>
          <DetailCell label={t('labelAlternatives')}>
            {medicine.alternatives.length > 0 ? (
              <Badge variant="secondary" className="font-normal">
                {medicine.alternatives.length}
              </Badge>
            ) : (
              <span className="font-normal">{t('none')}</span>
            )}
          </DetailCell>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-6">
          <DetailCell label={t('labelCreatedAt')}>
            <span className="flex items-center gap-1.5 font-normal">
              <CalendarDays className="text-muted-foreground size-3.5 shrink-0" />
              {formatDate(medicine.created_at, i18n.language)}
            </span>
          </DetailCell>
          <DetailCell label={t('labelUpdatedAt')}>
            <span className="flex items-center gap-1.5 font-normal">
              <RefreshCw className="text-muted-foreground size-3.5 shrink-0" />
              {formatDate(medicine.updated_at, i18n.language)}
            </span>
          </DetailCell>
        </div>

        {medicine.note && (
          <>
            <Separator />
            <DetailCell label={t('note')}>
              <span className="flex items-center gap-1.5 font-normal">
                {medicine.note}
              </span>
            </DetailCell>
          </>
        )}
      </CardContent>
    </Card>
  );
}
