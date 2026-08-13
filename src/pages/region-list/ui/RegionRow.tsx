import { memo } from 'react';

import type { RegionListItem } from '@/entities/region';
import { TableActions, TableCell, TableRow } from '@/shared/ui';

type RegionRowActionAccess = Readonly<{
  canUpdate: boolean;
  canDelete: boolean;
}>;

type RegionRowProps = {
  region: RegionListItem;
  actionAccess: RegionRowActionAccess;
  onDelete: (region: RegionListItem) => void;
};

export const RegionRow = memo(function RegionRow({
  region,
  actionAccess,
  onDelete,
}: RegionRowProps) {
  return (
    <TableRow>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">{region.name}</p>
      </TableCell>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">{region.city.name}</p>
      </TableCell>

      <TableActions
        item={region}
        itemId={region.id}
        onDelete={onDelete}
        path="/dashboard/regions"
      >
        <TableActions.Detail />
        {actionAccess.canUpdate && <TableActions.Update />}
        {actionAccess.canDelete && <TableActions.Delete />}
      </TableActions>
    </TableRow>
  );
});
