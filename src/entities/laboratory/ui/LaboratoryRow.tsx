import type { LaboratoryListItem } from '../model/laboratoryTypes';
import { TableActions, TableCell, TableRow } from '@/shared/ui';

type LaboratoryRowProps = {
  laboratory: LaboratoryListItem;
  onDelete: (laboratory: LaboratoryListItem) => void;
};

export function LaboratoryRow({ laboratory, onDelete }: LaboratoryRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{laboratory.id}</TableCell>
      <TableCell>{laboratory.name}</TableCell>

      <TableActions
        item={laboratory}
        itemId={laboratory.id}
        onDelete={onDelete}
        path="/dashboard/laboratories"
      >
        <TableActions.Edit />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}
