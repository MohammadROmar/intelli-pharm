import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CityEditButton } from '@/features/city-edit';
import { AddCityButton } from '@/features/city-create';
import { DeleteCityModal } from '@/features/city-delete';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import type { CitiesResponse, CityDetail } from '@/entities/city';
import {
  TableHead,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

import { CityRow, type CityRowActionAccess } from './CityRow';
import { CityFiltersModal } from './CityFiltersModal';
import { useCityFilters } from '../model/useCityFilters';

type Props = { data: CitiesResponse };

export function CityTable({ data }: Props) {
  const { t } = useTranslation('cities');
  const grantedPermissions = useGrantedPermissions();

  const [cityToDelete, setCityToDelete] = useState<CityDetail | null>(null);
  const [cityToEdit, setCityToEdit] = useState<CityDetail | null>(null);

  const filtersState = useCityFilters();

  const canCreate = hasPermission(grantedPermissions, 'erp.cities.create');
  const canUpdate = hasPermission(grantedPermissions, 'erp.cities.update');
  const canDelete = hasPermission(grantedPermissions, 'erp.cities.delete');

  const actionAccess = useMemo<CityRowActionAccess>(
    () => ({
      canUpdate,
      canDelete,
      hasAnyRowAction: canUpdate || canDelete,
    }),
    [canDelete, canUpdate],
  );

  const handleDeleteModalClose = useCallback(() => {
    setCityToDelete(null);
  }, []);

  const handleEditModalClose = useCallback(() => {
    setCityToEdit(null);
  }, []);

  const renderRow = useCallback(
    (city: CityDetail) => (
      <CityRow
        key={city.id}
        city={city}
        actionAccess={actionAccess}
        onEdit={setCityToEdit}
        onDelete={setCityToDelete}
      />
    ),
    [actionAccess],
  );

  return (
    <>
      {canDelete ? (
        <DeleteCityModal city={cityToDelete} onClose={handleDeleteModalClose} />
      ) : null}

      {canUpdate ? (
        <CityEditButton
          cityToEdit={cityToEdit}
          onClose={handleEditModalClose}
        />
      ) : null}

      <EntityListTable
        data={data}
        title={t('list.all')}
        basePath="/dashboard/cities"
        toolbar={
          <>
            <EntityFiltersToolbar
              filtersState={filtersState}
              FiltersModal={CityFiltersModal}
            />
            {canCreate ? <AddCityButton /> : null}
          </>
        }
        columns={
          <>
            <TableHead>{t('list.name')}</TableHead>
            {actionAccess.hasAnyRowAction ? (
              <TableHead>{t('list.actions')}</TableHead>
            ) : null}
          </>
        }
        renderRow={renderRow}
        emptyState={
          <EntityEmptyState
            hasActiveFilters={filtersState.hasActiveFilters}
            clearFilters={filtersState.clearFilters}
          />
        }
      />
    </>
  );
}
