import { useTranslation } from 'react-i18next';

import type { RoleItem } from '@/entities/role';
import { formatDate } from '@/shared/lib';
import { TableRow, TableCell, TableActions } from '@/shared/ui';

type RoleRowProps = { role: RoleItem; onDelete: (role: RoleItem) => void };

export function RoleRow({ role, onDelete }: RoleRowProps) {
  const { t, i18n } = useTranslation('roles');

  return (
    <TableRow>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">
          {t(`roleLabels.${role.name}`, role.name)}
        </p>
      </TableCell>
      <TableCell>
        {t('shared.permissionsCount', { count: role.permissions.length })}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(role.updated_at, i18n.language, false)}
      </TableCell>

      <TableActions
        item={role}
        itemId={role.id}
        onDelete={onDelete}
        path="/dashboard/roles"
      >
        <TableActions.Detail />
        <TableActions.Update />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}
