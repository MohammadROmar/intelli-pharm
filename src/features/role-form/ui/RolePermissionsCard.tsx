import { useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyRound } from 'lucide-react';

import type { Permission } from '@/shared/api';
import { PermissionPicker } from '@/entities/permission';
import type { RoleFormData } from '@/entities/role';
import {
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  Field,
} from '@/shared/ui';

type RolePermissionsCardProps = {
  permissions: readonly Permission[];
  isPending?: boolean;
};

export function RolePermissionsCard({
  permissions,
  isPending,
}: RolePermissionsCardProps) {
  const { control } = useFormContext<RoleFormData>();
  const { t: tPermissions } = useTranslation('permissions');
  const { t: tForm } = useTranslation('roles', { keyPrefix: 'form' });

  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({
    control,
    name: 'permissions',
    rules: {
      validate: (selected) => selected.length > 0 || 'selectAtLeastOne',
    },
  });

  const selected = useMemo(() => new Set(value), [value]);
  const permissionError = error?.message;

  const handleChange = useCallback(
    (nextPermissions: Permission[]) => {
      onChange(nextPermissions);
      onBlur();
    },
    [onBlur, onChange],
  );

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={KeyRound}
          title={tPermissions('permissionsCardTitle')}
          description={tPermissions('permissionsCardSubtitle')}
        />
      </CardHeader>

      <CardContent>
        <Field>
          <PermissionPicker
            permissions={permissions}
            selected={selected}
            disabled={isPending}
            onChange={handleChange}
          />

          {typeof permissionError === 'string' ? (
            <p className="text-destructive text-sm">{tForm(permissionError)}</p>
          ) : null}
        </Field>
      </CardContent>
    </Card>
  );
}
