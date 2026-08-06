import { useTranslation } from 'react-i18next';
import { LockKeyhole } from 'lucide-react';

import type { RoleItem } from '@/entities/role';
import { formatDate } from '@/shared/lib';
import { Badge, TableActions, TableCell, TableRow } from '@/shared/ui';

type RoleRowProps = { role: RoleItem; onDelete: (role: RoleItem) => void };

export function RoleRow({ role, onDelete }: RoleRowProps) {
  const { t, i18n } = useTranslation('roles');
  const canMutate = role.is_editable;

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
        {canMutate ? <TableActions.Update /> : null}
        {canMutate ? <TableActions.Delete /> : null}
      </TableActions>
    </TableRow>
  );
}
