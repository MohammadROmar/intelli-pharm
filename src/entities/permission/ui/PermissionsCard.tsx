import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyRound, PackageSearch } from 'lucide-react';

import type { Permission } from '@/shared/api';
import { DetailCard } from '@/shared/ui';

import { ModuleSection } from './ModuleSection';
import { groupPermissionsByModule } from '../lib/permissionParser';

type Props = { permissions: Permission[] };

export function PermissionsCard({ permissions }: Props) {
  const { t } = useTranslation('permissions');

  const { byModule, modules } = useMemo(() => {
    const byModule = groupPermissionsByModule(permissions);
    return { byModule, modules: Array.from(byModule.keys()) };
  }, [permissions]);

  if (!permissions.length) {
    return (
      <DetailCard
        title={t('permissionsCardTitle')}
        subtitle={t('permissionsCardSubtitle')}
        icon={KeyRound}
      >
        <div className="text-muted-foreground flex flex-col items-center gap-2 py-8 text-center">
          <PackageSearch className="size-8" />
          <p className="text-sm">{t('noPermissions')}</p>
        </div>
      </DetailCard>
    );
  }

  return (
    <DetailCard
      title={t('permissionsCardTitle')}
      subtitle={t('permissionsCardSubtitle')}
      icon={KeyRound}
      itemsCount={permissions.length}
    >
      <div className="space-y-6">
        {modules.map((module, index) => (
          <ModuleSection
            key={module}
            module={module}
            groups={byModule.get(module)!}
            showSeparator={index < modules.length - 1}
            t={t}
          />
        ))}
      </div>
    </DetailCard>
  );
}
