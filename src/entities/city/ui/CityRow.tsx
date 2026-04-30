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
  onEdit: (city: CityDetail) => void;
};

export function CityRow({ city, onEdit, onDelete }: CityRowProps) {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground text-xs">{city.id}</TableCell>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">{city.name}</p>
      </TableCell>

      <TableActions
        item={city}
        itemId={city.id}
        onDelete={onDelete}
        path="/dashboard/cities"
      >
        <EditCityButton city={city} onEdit={onEdit} />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}

type Props = Omit<CityRowProps, 'onDelete'>;

function EditCityButton({ city, onEdit }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'tableActions',
  });

  return (
    <DropdownMenuItem
      onClick={() => onEdit(city)}
      className="w-full cursor-pointer"
    >
      <Pencil className="size-4" />
      <span>{t('update')}</span>
    </DropdownMenuItem>
  );
}
