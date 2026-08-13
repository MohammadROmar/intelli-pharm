import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';

import type { RoleFormData } from '@/entities/role';
import {
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  Field,
  Input,
  Label,
} from '@/shared/ui';

const ROLE_NAME_ERROR_ID = 'role-name-error';

function validateRoleName(value: string): true | 'errors.nameRequired' {
  return value.trim().length > 0 ? true : 'errors.nameRequired';
}

type RoleBasicInfoCardProps = {
  isPending?: boolean;
};

export function RoleBasicInfoCard({ isPending }: RoleBasicInfoCardProps) {
  const { register } = useFormContext<RoleFormData>();
  const { errors } = useFormState<RoleFormData>({ name: ['name'] });
  const { t } = useTranslation('roles', { keyPrefix: 'form' });
  const nameError = errors.name?.message;

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={Shield}
          title={t('basicInfoTitle', { defaultValue: t('fields.name') })}
          description={t('basicInfoSubtitle', {
            defaultValue: t('fields.namePlaceholder'),
          })}
        />
      </CardHeader>

      <CardContent>
        <Field>
          <Label htmlFor="role-name">{t('fields.name')}</Label>
          <Input
            id="role-name"
            autoComplete="off"
            disabled={isPending}
            placeholder={t('fields.namePlaceholder')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={nameError ? ROLE_NAME_ERROR_ID : undefined}
            {...register('name', {
              validate: validateRoleName,
            })}
          />

          {typeof nameError === 'string' && (
            <p id={ROLE_NAME_ERROR_ID} className="text-destructive text-sm">
              {t(nameError)}
            </p>
          )}
        </Field>
      </CardContent>
    </Card>
  );
}
