import { useTranslation } from 'react-i18next';
import { LockKeyhole } from 'lucide-react';

import type { RoleItem } from '@/entities/role';
import { formatDate } from '@/shared/lib';
import { Badge, TableActions, TableCell, TableRow } from '@/shared/ui';
import type { useRoleAccess } from '@/features/role-access';

type RoleRowAccess = ReturnType<typeof useRoleAccess>;
type RoleRowProps = {
  role: RoleItem;
  onDelete: (role: RoleItem) => void;
  access: RoleRowAccess;
};

export function RoleRow({ role, onDelete, access }: RoleRowProps) {
  const { t, i18n } = useTranslation('roles');

  const canUpdateRole = role.is_editable && access.canUpdate;
  const canDeleteRole = role.is_editable && access.canDelete;

  return (
    <TableRow>
      <TableCell>{t(`roleLabels.${role.name}`, role.name)}</TableCell>

      <TableCell>
        {!role.is_editable ? (
          <Badge variant="muted">
            <LockKeyhole aria-hidden />
            {t('shared.protected')}
          </Badge>
        ) : (
          <span className="sr-only">{t('shared.notProtected')}</span>
        )}
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
        {canUpdateRole && <TableActions.Update />}
        {canDeleteRole && <TableActions.Delete />}
      </TableActions>
    </TableRow>
  );
}
