import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';

import type { CityDetail } from '../model/cityTypes';
import {
  TableRow,
  TableCell,
  TableActions,
  DropdownMenuItem,
} from '@/shared/ui';

type CityRowProps = {
  city: CityDetail;
  onDelete: (city: CityDetail) => void;
  onUpdate: (city: CityDetail) => void;
};

export function CityRow({ city, onUpdate, onDelete }: CityRowProps) {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground text-xs">{city.id}</TableCell>
      <TableCell>{city.name}</TableCell>

      <TableActions
        item={city}
        itemId={city.id}
        onDelete={onDelete}
        path="/dashboard/cities"
      >
        <EditCityButton city={city} onUpdate={onUpdate} />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}

type Props = Omit<CityRowProps, 'onDelete'>;

function EditCityButton({ city, onUpdate }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'tableActions',
  });

  return (
    <DropdownMenuItem
      onClick={() => onUpdate(city)}
      className="w-full cursor-pointer"
    >
      <Pencil className="size-4" />
      <span>{t('update')}</span>
    </DropdownMenuItem>
  );
}
