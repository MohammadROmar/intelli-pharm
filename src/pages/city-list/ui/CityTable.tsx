import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CityFiltersModal } from './CityFiltersModal';
import { useCityFilteres } from '../model/useCityFilters';
import { CityEditButton } from '@/features/city-edit';
import { AddCityButton } from '@/features/city-create';
import { DeleteCityModal } from '@/features/city-delete';
import { CityRow, type CitiesResponse, type CityDetail } from '@/entities/city';
import {
  FiltersTrigger,
  TableBody,
  TableCard,
  TableEmptyState,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

type Props = { data: CitiesResponse };

export function CitiesTable({ data }: Props) {
  const [cityToDelete, setCityToDelete] = useState<CityDetail | null>(null);
  const [cityToEdit, setCityToEdit] = useState<CityDetail | null>(null);

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
      <ItemsTable
        data={data}
        onEdit={setCityToEdit}
        onDelete={setCityToDelete}
      />
    </>
  );
}

type ItemsTableProps = Props & {
  onEdit: (city: CityDetail) => void;
  onDelete: (city: CityDetail) => void;
};

function ItemsTable({ data, onDelete, onEdit }: ItemsTableProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'citiesPage' });

  const cities = data.data;

  return (
    <TableCard
      title={t('list.all')}
      basePath="/dashboard/cities"
      itemsPerPage={data.meta.per_page}
      currItemsCount={cities.length}
      currentPage={data.meta.current_page}
      totalItems={data.meta.total}
      toolbar={
        <>
          <CityFilters />
          <AddCityButton />
        </>
      }
    >
      {cities.length > 0 ? (
        <>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-16 sm:table-cell">
                {t('list.id')}
              </TableHead>
              <TableHead>{t('list.name')}</TableHead>
              <TableHead>{t('list.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cities.map((city) => (
              <CityRow
                key={city.id}
                city={city}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </>
      ) : (
        <EmptyState />
      )}
    </TableCard>
  );
}

function EmptyState() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name');

  return (
    <TableEmptyState
      variant={name ? 'search' : 'empty'}
      onClearSearch={() => setSearchParams({})}
    />
  );
}

function CityFilters() {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    useCityFilteres();

  return (
    <>
      <FiltersTrigger onClick={() => setOpen(true)} activeCount={activeCount} />
      <CityFiltersModal
        open={open}
        onOpenChange={setOpen}
        defaultValues={filters}
        hasActiveFilters={hasActiveFilters}
        onApply={(v) => {
          applyFilters(v);
          setOpen(false);
        }}
        onClear={() => {
          clearFilters();
          setOpen(false);
        }}
      />
    </>
  );
}
