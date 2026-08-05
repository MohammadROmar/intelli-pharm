import type { RegionListItem } from '@/entities/region';
import { TableActions, TableCell, TableRow } from '@/shared/ui';

type RegionRowProps = {
  region: RegionListItem;
  onDelete: (region: RegionListItem) => void;
};

export function RegionRow({ region, onDelete }: RegionRowProps) {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground text-xs">
        {region.id}
      </TableCell>
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
        <TableActions.Update />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}
