import { memo } from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/shared/lib';

import type { PharmacyOption } from '../model/pharmacyTypes';

type Props = { pharmacy: PharmacyOption; selected: boolean };

function PharmacyOptionRowImpl({ pharmacy, selected }: Props) {
  return (
    <div className="flex w-full min-w-0 items-center gap-2.5">
      <Check
        aria-hidden
        className={cn(
          'size-4 shrink-0',
          selected ? 'opacity-100' : 'opacity-0',
        )}
      />

      <span className="flex min-w-0 flex-1 flex-col text-start">
        <span className="truncate text-sm font-medium">{pharmacy.name}</span>
        <span className="text-muted-foreground truncate text-xs">
          {pharmacy.region} · {pharmacy.pharmacist_name}
        </span>
      </span>
    </div>
  );
}

export const PharmacyOptionRow = memo(PharmacyOptionRowImpl);
