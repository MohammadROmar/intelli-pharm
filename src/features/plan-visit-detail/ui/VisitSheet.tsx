import type { VisitDetail } from '@/entities/visit';
import { Separator } from '@/shared/ui';

import { VisitDetailsSection } from './VisitDetailsSection';
import { VisitRecentNotesSection } from './VisitRecentNotesSection';
import { VisitSheetHeader } from './VisitSheetHeader';
import { VisitSummarySection } from './VisitSummarySection';

type Props = { visit: VisitDetail; canViewPharmacy: boolean };

export function VisitSheet({ visit, canViewPharmacy }: Props) {
  return (
    <>
      <VisitSheetHeader visit={visit} canViewPharmacy={canViewPharmacy} />

      <VisitDetailsSection visit={visit} />

      <VisitSummarySection summary={visit.summary} />

      <Separator />

      <VisitRecentNotesSection notes={visit.recent_notes} />
    </>
  );
}
