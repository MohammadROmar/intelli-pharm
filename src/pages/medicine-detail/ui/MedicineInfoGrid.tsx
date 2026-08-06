import { useTranslation } from 'react-i18next';
import {
  Activity,
  CalendarDays,
  Folders,
  Pill,
  FlaskConical,
  RefreshCw,
  Truck,
  Boxes,
  Dna,
} from 'lucide-react';

import type { MedicineDetail } from '@/entities/medicine';
import { formatPrice } from '@/shared/lib';
import {
  Badge,
  Separator,
  BadgeLink,
  DetailCell,
  DetailCard,
  SplitDateTime,
} from '@/shared/ui';

type Props = {
  medicine: MedicineDetail;
  canViewCategory: boolean;
  canViewLaboratory: boolean;
};

export function MedicineInfoGrid({
  medicine,
  canViewCategory,
  canViewLaboratory,
}: Props) {
  const { t, i18n } = useTranslation('medicines', {
    keyPrefix: 'detail',
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
          <BadgeLink
            label={medicine.category.name}
            to={
              canViewCategory
                ? `/dashboard/categories/${medicine.category.id}`
                : undefined
            }
            icon={Folders}
          />
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('scientificName')}>
          <span className="flex items-center gap-1.5 font-normal">
            <Dna className="text-muted-foreground size-3.5 shrink-0" />
            {medicine.scientific_name ?? '-'}
          </span>
        </DetailCell>
        <DetailCell label={t('availableQuantity')}>
          <span className="flex items-center gap-1.5 font-normal">
            <Boxes className="text-muted-foreground size-3.5 shrink-0" />
            {medicine.available_quantity}
          </span>
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
          <Badge variant={medicine.is_active ? 'success' : 'muted'}>
            <Activity />
            {medicine.is_active ? t('active') : t('inactive')}
          </Badge>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelImported')}>
          <span className="flex items-center gap-1.5 font-normal">
            <Truck className="text-muted-foreground size-3.5" />
            {medicine.is_imported ? t('yes') : t('no')}
          </span>
        </DetailCell>
        <DetailCell label={t('labelLaboratories')}>
          {medicine.laboratory ? (
            <BadgeLink
              label={medicine.laboratory.name}
              to={
                canViewLaboratory
                  ? `/dashboard/laboratories/${medicine.laboratory.id}`
                  : undefined
              }
              icon={FlaskConical}
            />
          ) : (
            <span className="font-normal">-</span>
          )}
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelCreatedAt')}>
          <SplitDateTime date={medicine.created_at} icon={CalendarDays} />
        </DetailCell>

        <DetailCell label={t('labelUpdatedAt')}>
          <SplitDateTime date={medicine.updated_at} icon={RefreshCw} />
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
