import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  CalendarDays,
  Folders,
  Pill,
  Pipette,
  RefreshCw,
  Truck,
} from 'lucide-react';

import type { Medicine } from '@/entities/medicine';
import { formatDate, formatPrice } from '@/shared/lib';
import { Badge, Separator, DetailCell, DetailCard } from '@/shared/ui';

type Props = { medicine: Medicine };

export function MedicineInfoGrid({ medicine }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.detail',
  });

  return (
    <DetailCard
      title={t('infoTitle')}
      subtitle={t('infoSubtitle')}
      icon={Pill}
      className="lg:col-span-2"
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelId')}>{medicine.id}</DetailCell>
        <DetailCell label={t('labelCategory')}>
          <Badge asChild variant="secondary" className="font-normal">
            <Link to={`/dashboard/categories/${medicine.category.id}`}>
              <Folders className="mr-1 size-3" />
              {medicine.category.name}
            </Link>
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
          <Badge variant={medicine.is_active ? 'default' : 'secondary'}>
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
        <DetailCell label={t('labelLaboratories')}>
          {medicine.laboratory ? (
            <Badge asChild variant="secondary" className="font-normal">
              <Link to={`/dashboard/laboratories/${medicine.laboratory.id}`}>
                <Pipette className="mr-1 size-3" />
                {medicine.laboratory.name}
              </Link>
            </Badge>
          ) : (
            <span className="font-normal">-</span>
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
    </DetailCard>
  );
}
