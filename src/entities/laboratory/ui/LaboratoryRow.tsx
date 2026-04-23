import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';

import type { LaboratoryListItem } from '../model/laboratoryTypes';
import {
  TableRow,
  TableCell,
  TableActions,
  DropdownMenuItem,
} from '@/shared/ui';

type LaboratoryRowProps = {
  laboratory: LaboratoryListItem;
  onDelete: (laboratory: LaboratoryListItem) => void;
};

export function LaboratoryRow({ laboratory, onDelete }: LaboratoryRowProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'tableActions',
  });

  return (
    <TableRow>
      <TableCell className="text-muted-foreground text-xs">
        {laboratory.id}
      </TableCell>
      <TableCell>{laboratory.name}</TableCell>

      <TableActions
        item={laboratory}
        itemId={laboratory.id}
        onDelete={onDelete}
        path="/dashboard/laboratories"
      >
        <TableActions.Detail />
        <EditLaboratoryButton id={laboratory.id} label={t('update')} />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}

type Props = { id: number; label: string };

function EditLaboratoryButton({ id, label }: Props) {
  return (
    <DropdownMenuItem asChild>
      <Link
        to={`/dashboard/laboratories/${id}?active=edit`}
        className="cursor-pointer"
      >
        <Pencil className="size-4" />
        <span>{label}</span>
      </Link>
    </DropdownMenuItem>
  );
}
