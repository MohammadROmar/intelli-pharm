import { EntityFiltersToolbar } from '@/shared/ui';
import { CalendarRange } from 'lucide-react';

import { NotificationsFiltersModal } from './NotificationsFiltersModal';
import { useNotificationsFilters } from '../model/useNotificationsFilters';

export function NotificationsDateFilter({
  triggerLabel,
}: {
  triggerLabel: string;
}) {
  const filtersState = useNotificationsFilters();

  return (
    <EntityFiltersToolbar
      label={triggerLabel}
      icon={CalendarRange}
      triggerClassName="not-sr-only"
      filtersState={filtersState}
      FiltersModal={NotificationsFiltersModal}
    />
  );
}
