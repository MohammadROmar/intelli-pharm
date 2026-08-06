import { memo } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';

import type { LaboratoryListItem } from '@/entities/laboratory';
import {
  TableRow,
  TableCell,
  TableActions,
  DropdownMenuItem,
} from '@/shared/ui';

export type LaboratoryRowActionAccess = Readonly<{
  canUpdate: boolean;
  canDelete: boolean;
}>;

type LaboratoryRowProps = {
  laboratory: LaboratoryListItem;
  actionAccess: LaboratoryRowActionAccess;
  onDelete: (laboratory: LaboratoryListItem) => void;
};

export const LaboratoryRow = memo(function LaboratoryRow({
  laboratory,
  actionAccess,
  onDelete,
}: LaboratoryRowProps) {
  const { t } = useTranslation('common', { keyPrefix: 'tableActions' });

  return (
    <TableRow>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">{laboratory.name}</p>
      </TableCell>

      <TableActions
        item={laboratory}
        itemId={laboratory.id}
        onDelete={onDelete}
        path="/dashboard/laboratories"
      >
        <TableActions.Detail />
        {actionAccess.canUpdate ? (
          <EditLaboratoryButton id={laboratory.id} label={t('edit')} />
        ) : null}
        {actionAccess.canDelete ? <TableActions.Delete /> : null}
      </TableActions>
    </TableRow>
  );
});

type Props = { id: number; label: string };

function EditLaboratoryButton({ id, label }: Props) {
  return (
    <DropdownMenuItem asChild>
      <Link
        to={`/dashboard/laboratories/${id}?focus=edit`}
        className="cursor-pointer"
      >
        <Pencil className="size-4" />
        <span>{label}</span>
      </Link>
    </DropdownMenuItem>
  );
}
