import {
  CalendarDays,
  Pill,
  FlaskConical,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { LaboratoryDetail } from '@/entities/laboratory';
import { formatDate } from '@/shared/lib';
import { DetailCard, DetailCell, Separator } from '@/shared/ui';

type Props = { laboratory: LaboratoryDetail };

export function LaboratoryInfoGrid({ laboratory }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'laboratoriesPage.detail',
  });

  const activeMedicines = laboratory.medicines.filter(
    (m) => m.is_active,
  ).length;

  return (
    <DetailCard
      title={t('infoCardTilte')}
      subtitle={t('infoCardSubtilte')}
      icon={FlaskConical}
      itemsCount={0}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('statTotal')}>
          <span className="flex items-center gap-1.5 font-normal">
            <Pill className="text-muted-foreground size-4 shrink-0" />
            {laboratory.medicines.length}
          </span>
        </DetailCell>
        <DetailCell label={t('statActive')}>
          <span className="flex items-center gap-1.5 font-normal">
            <ShieldCheck className="text-muted-foreground size-4 shrink-0" />
            {activeMedicines}
          </span>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelId')}>
          <span>{laboratory.id}</span>
        </DetailCell>
        <DetailCell label={t('labelName')}>
          <span className="flex items-center gap-1.5">
            <FlaskConical className="text-muted-foreground size-4 shrink-0" />
            {laboratory.name}
          </span>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelCreatedAt')}>
          <span className="flex items-center gap-1.5 font-normal">
            <CalendarDays className="text-muted-foreground size-4 shrink-0" />
            {formatDate(laboratory.created_at, i18n.language)}
          </span>
        </DetailCell>
        <DetailCell label={t('labelUpdatedAt')}>
          <span className="flex items-center gap-1.5 font-normal">
            <RefreshCw className="text-muted-foreground size-4 shrink-0" />
            {formatDate(laboratory.updated_at, i18n.language)}
          </span>
        </DetailCell>
      </div>
    </DetailCard>
  );
}
