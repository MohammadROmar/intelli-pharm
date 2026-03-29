import type { RegionListItem } from '../model/regionTypes';
import { TableActions, TableCell, TableRow } from '@/shared/ui';

type RegionRowProps = {
  region: RegionListItem;
  onDelete: (region: RegionListItem) => void;
};

export function RegionRow({ region, onDelete }: RegionRowProps) {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{region.id}</TableCell>
      <TableCell>{region.name}</TableCell>
      <TableCell className="text-muted-foreground">{region.city_id}</TableCell>

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
