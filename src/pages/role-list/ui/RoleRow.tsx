import { useTranslation } from 'react-i18next';

import type { RoleItem } from '@/entities/role';
import { formatDate } from '@/shared/lib';
import { TableRow, TableCell, TableActions } from '@/shared/ui';

export type RoleActionAccess = Readonly<{
  canManage: boolean;
  hasAnyRowAction: boolean;
}>;

type RoleRowProps = {
  role: RoleItem;
  actionAccess: RoleActionAccess;
  onDelete: (role: RoleItem) => void;
};

export function RoleRow({ role, actionAccess, onDelete }: RoleRowProps) {
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

      {actionAccess.hasAnyRowAction ? (
        <TableActions
          item={role}
          itemId={role.id}
          onDelete={onDelete}
          path="/dashboard/roles"
        >
          {actionAccess.canManage ? <TableActions.Detail /> : null}
          {actionAccess.canManage ? <TableActions.Update /> : null}
          {actionAccess.canManage ? <TableActions.Delete /> : null}
        </TableActions>
      ) : null}
    </TableRow>
  );
}
