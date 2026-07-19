import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Shield } from 'lucide-react';

import { RegionSelector } from '@/entities/region';
import { useTrackingIds, type RoleFilter } from '@/entities/tracking';
import { Badge, Button, GenericSingleSelect } from '@/shared/ui';

import { useTrackingFilters } from '../model/useTrackingFilters';

const ROLE_OPTIONS: RoleFilter[] = ['rep', 'delivery'];

export function TrackingFiltersBar() {
  const { t } = useTranslation('tracking', { keyPrefix: 'filters' });
  const { filter, setRegion, setRole } = useTrackingFilters();

  const visibleIds = useTrackingIds(filter);

  const regionValue = useMemo(
    () => (filter.regionId === 'all' ? undefined : filter.regionId),
    [filter.regionId],
  );

  const roleSelectOptions = useMemo(
    () =>
      ROLE_OPTIONS.map((role) => ({
        value: role,
        label: t(`role.${role}`),
      })),
    [t],
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5">
        <div>
          <RegionSelector
            value={regionValue}
            onValueChange={(value) =>
              setRegion(value == null ? 'all' : Number(value))
            }
            placeholder={t('regionPlaceholder')}
          />
        </div>
        {filter.regionId !== 'all' && (
          <Button variant="secondary" onClick={() => setRegion('all')}>
            {t('clearRegion')}
          </Button>
        )}
      </div>

      <div>
        <GenericSingleSelect
          options={roleSelectOptions}
          valueKey="value"
          labelKey="label"
          icon={Shield}
          value={filter.role === 'all' ? null : filter.role}
          onValueChange={(value) => setRole((value as RoleFilter) ?? 'all')}
          placeholder={t('rolePlaceholder')}
          hasMoreLabel={false}
        />
      </div>

      <Badge variant="secondary" className="ms-auto gap-1.5">
        <Users className="size-3.5" />
        {t('onlineCount', { count: visibleIds.length })}
      </Badge>
    </div>
  );
}
