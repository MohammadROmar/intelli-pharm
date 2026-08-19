import { Clock, Route } from 'lucide-react';

import { LabeledLink } from '@/shared/ui';

import type { PharmacyMarker } from '../model/useDecodedRoute';

type Props = {
  marker: PharmacyMarker;
  stopLabel: string;
  canViewPharmacy: boolean;
};

export function PharmacyPopupContent({
  marker,
  stopLabel,
  canViewPharmacy,
}: Props) {
  const { visit, distanceLabel, durationLabel } = marker;

  return (
    <div className="min-w-45 space-y-0.5!">
      <div className="w-fit">
        <LabeledLink
          to={
            canViewPharmacy
              ? `/dashboard/pharmacies/${visit.pharmacy.id}`
              : undefined
          }
          label={visit.pharmacy.name}
          className="text-card-foreground! hover:text-primary! text-left! text-sm leading-snug font-semibold"
        />
      </div>

      <p className="text-muted-foreground text-xs">{visit.pharmacy.info}</p>
      <p className="text-muted-foreground mt-2! pt-1 text-xs leading-none">
        {stopLabel} #{visit.visit_order}
      </p>
      <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
        <span className="flex items-center gap-1">
          <Route className="size-3 shrink-0" />
          {distanceLabel}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="size-3 shrink-0" />
          {durationLabel}
        </span>
      </div>
    </div>
  );
}
