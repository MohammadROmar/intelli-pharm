import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CityEditButton } from '@/features/city-edit';
import { AddCityButton } from '@/features/city-create';
import { DeleteCityModal } from '@/features/city-delete';
import type { CitiesResponse, CityDetail } from '@/entities/city';
import {
  TableHead,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

import { CityRow } from './CityRow';
import { CityFiltersModal } from './CityFiltersModal';
import { useCityFilters } from '../model/useCityFilters';

type Props = { data: CitiesResponse };

export function CityTable({ data }: Props) {
  const { t } = useTranslation('cities');

  const [cityToDelete, setCityToDelete] = useState<CityDetail | null>(null);
  const [cityToEdit, setCityToEdit] = useState<CityDetail | null>(null);

  const filtersState = useCityFilters();

  return (
    <>
      <DeleteCityModal
        city={cityToDelete}
        onClose={() => setCityToDelete(null)}
      />
      <CityEditButton
        cityToEdit={cityToEdit}
        onClose={() => setCityToEdit(null)}
      />

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
            <AddCityButton />
          </>
        }
        columns={
          <>
            <TableHead className="hidden w-16 sm:table-cell">
              {t('list.id')}
            </TableHead>
            <TableHead>{t('list.name')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </>
        }
        renderRow={(city) => (
          <CityRow
            key={city.id}
            city={city}
            onEdit={setCityToEdit}
            onDelete={setCityToDelete}
          />
        )}
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
