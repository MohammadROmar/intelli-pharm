import type { RegionListItem } from '../model/regionTypes';
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
      <TableCell>{region.name}</TableCell>
      <TableCell>{region.city.name}</TableCell>

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
