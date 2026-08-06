import { memo } from 'react';

import type { RegionListItem } from '@/entities/region';
import { TableActions, TableCell, TableRow } from '@/shared/ui';

export type RegionRowActionAccess = Readonly<{
  canView: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  hasAnyRowAction: boolean;
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

      {actionAccess.hasAnyRowAction ? (
        <TableActions
          item={region}
          itemId={region.id}
          onDelete={onDelete}
          path="/dashboard/regions"
        >
          {actionAccess.canView ? <TableActions.Detail /> : null}
          {actionAccess.canUpdate ? <TableActions.Update /> : null}
          {actionAccess.canDelete ? <TableActions.Delete /> : null}
        </TableActions>
      ) : null}
    </TableRow>
  );
});
