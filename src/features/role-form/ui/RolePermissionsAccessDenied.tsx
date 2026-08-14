import { useTranslation } from 'react-i18next';

import { AccessDeniedSection } from '@/shared/ui';

export function RolePermissionsAccessDenied() {
  const { t } = useTranslation('roles', { keyPrefix: 'accessDenied' });

  return (
    <AccessDeniedSection
      badge={t('badge')}
      title={t('title')}
      subtitle={t('subtitle')}
    />
  );
}
