import { useMemo } from 'react';

import { hasPermission, useGrantedPermissions } from '@/entities/session';

export function useNotificationsAccess() {
  const grantedPermissions = useGrantedPermissions();

  return useMemo(() => {
    return {
      canSendNotifications: hasPermission(
        grantedPermissions,
        'auth.notifications.send',
      ),
    };
  }, [grantedPermissions]);
}
