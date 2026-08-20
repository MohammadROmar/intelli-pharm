import type { LucideIcon } from 'lucide-react';
import {
  Ban,
  CheckCircle2,
  CircleDashed,
  CircleX,
  Phone,
  SkipForward,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { VisitDetail } from '@/entities/visit';
import {
  Badge,
  LabeledLink,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui';

type VisitStatusConfig = {
  icon: LucideIcon;
  variant: 'muted' | 'success' | 'destructive';
};

const VISIT_STATUS_CONFIG = {
  pending: { icon: CircleDashed, variant: 'muted' },
  completed: { icon: CheckCircle2, variant: 'success' },
  skipped: { icon: SkipForward, variant: 'muted' },
  failed: { icon: CircleX, variant: 'destructive' },
  blocked: { icon: Ban, variant: 'destructive' },
} satisfies Record<VisitDetail['status'], VisitStatusConfig>;

type Props = {
  visit: VisitDetail;
  canViewPharmacy: boolean;
};

export function VisitSheetHeader({ visit, canViewPharmacy }: Props) {
  const { t } = useTranslation('visit-detail', { keyPrefix: 'sheet' });

  const statusConfig = VISIT_STATUS_CONFIG[visit.status];
  const StatusIcon = statusConfig.icon;
  const isVisited = visit.visited === 1;
  const isUseful = visit.summary.deal_status === 'Closed';

  return (
    <SheetHeader className="border-b pb-5">
      <SheetTitle className="w-fit text-base">
        <LabeledLink
          to={
            canViewPharmacy
              ? `/dashboard/pharmacies/${visit.pharmacy.id}`
              : undefined
          }
          label={visit.pharmacy.name}
          className="leading-snug font-semibold"
        />
      </SheetTitle>

      <SheetDescription className="flex items-center gap-1.5">
        <Phone className="size-3" aria-hidden />
        {visit.pharmacy.phone_number}
      </SheetDescription>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <Badge
          variant={statusConfig.variant}
          className="flex items-center gap-1"
        >
          <StatusIcon className="size-3" aria-hidden />
          {t(`status.${visit.status}`)}
        </Badge>

        {isVisited && (
          <Badge
            variant={isUseful ? 'info' : 'muted'}
            className="flex items-center gap-1"
          >
            {isUseful ? (
              <ThumbsUp className="size-3" aria-hidden />
            ) : (
              <ThumbsDown className="size-3" aria-hidden />
            )}
            {t(isUseful ? 'useful' : 'notUseful')}
          </Badge>
        )}
      </div>
    </SheetHeader>
  );
}
