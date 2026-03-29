import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AddCityButton } from '@/features/city-create';
import { DeleteCityModal } from '@/features/city-delete';
import { CityRow, type CitiesResponse, type CityDetail } from '@/entities/city';
import {
  SearchField,
  TableBody,
  TableCard,
  TableEmptyState,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';
import { CityEditButton } from '@/features/city-edit';

type Props = { data: CitiesResponse };

export function CitiesTable({ data }: Props) {
  const [cityToDelete, setCityToDelete] = useState<CityDetail | null>(null);
  const [cityToUpdate, setCityToUpdate] = useState<CityDetail | null>(null);

  return (
    <>
      <DeleteCityModal
        city={cityToDelete}
        onClose={() => setCityToDelete(null)}
      />

      <CityEditButton
        cityToUpdate={cityToUpdate}
        onClose={() => setCityToUpdate(null)}
      />

      <ItemsTable
        data={data}
        onUpdate={setCityToUpdate}
        onDelete={setCityToDelete}
      />
    </>
  );
}

type ItemsTableProps = Props & {
  onUpdate: (city: CityDetail) => void;
  onDelete: (city: CityDetail) => void;
};

function ItemsTable({ data, onDelete, onUpdate }: ItemsTableProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'citiesPage',
  });

  const cities = data.data!;

  return (
    <TableCard
      title={t('list.all')}
      basePath="/dashboard/cities"
      itemsPerPage={10}
      currItemsCount={cities.length}
      header={
        <div className="flex w-full flex-col gap-2 lg:w-fit lg:flex-row lg:items-center">
          <SearchField placeholder={t('list.searchPlaceholder')} />
          <AddCityButton />
        </div>
      }
      currentPage={data.meta.current_page}
      totalItems={data.meta.total}
    >
      {cities.length > 0 ? (
        <>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">{t('list.id')}</TableHead>
              <TableHead>{t('list.name')}</TableHead>
              <TableHead>{t('list.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cities.map((city) => (
              <CityRow
                key={city.id}
                city={city}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </>
      ) : (
        <EmotyState />
      )}
    </TableCard>
  );
}

function EmotyState() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name');

  return (
    <TableEmptyState
      variant={name ? 'search' : 'empty'}
      onClearSearch={() => {
        setSearchParams(() => new URLSearchParams(), { replace: true });
      }}
    />
  );
}
