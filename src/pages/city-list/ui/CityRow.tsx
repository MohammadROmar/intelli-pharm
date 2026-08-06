import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';

import type { CityDetail } from '@/entities/city';
import { getLocalized } from '@/shared/lib';
import {
  TableRow,
  TableCell,
  TableActions,
  DropdownMenuItem,
} from '@/shared/ui';

export type CityRowActionAccess = Readonly<{
  canUpdate: boolean;
  canDelete: boolean;
  hasAnyRowAction: boolean;
}>;

type CityRowProps = {
  city: CityDetail;
  actionAccess: CityRowActionAccess;
  onDelete: (city: CityDetail) => void;
  onEdit: (city: CityDetail) => void;
};

export function CityRow({
  city,
  actionAccess,
  onEdit,
  onDelete,
}: CityRowProps) {
  const { i18n } = useTranslation();
  const name = getLocalized(city.name, i18n.language);

  return (
    <TableRow>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">{name}</p>
      </TableCell>

      {actionAccess.hasAnyRowAction ? (
        <TableActions
          item={city}
          itemId={city.id}
          onDelete={onDelete}
          path="/dashboard/cities"
        >
          {actionAccess.canUpdate ? (
            <EditCityButton city={city} onEdit={onEdit} />
          ) : null}
          {actionAccess.canDelete ? <TableActions.Delete /> : null}
        </TableActions>
      ) : null}
    </TableRow>
  );
}

type Props = {
  city: CityDetail;
  onEdit: (city: CityDetail) => void;
};

function EditCityButton({ city, onEdit }: Props) {
  const { t } = useTranslation('common', {
    keyPrefix: 'tableActions',
  });

  return (
    <DropdownMenuItem
      onSelect={() => onEdit(city)}
      className="w-full cursor-pointer"
    >
      <Pencil className="size-4" />
      <span>{t('edit')}</span>
    </DropdownMenuItem>
  );
}
