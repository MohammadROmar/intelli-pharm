import { useCallback, useEffect, useState } from 'react';

export type NotificationPermissionState =
  | 'unsupported'
  | 'default'
  | 'granted'
  | 'denied';

type UseNotificationPermissionReturn = {
  permission: NotificationPermissionState;
  requestPermission: () => Promise<void>;
  isRequesting: boolean;
};

function resolveInitialPermission(): NotificationPermissionState {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

function toPermissionState(
  state: PermissionState,
): NotificationPermissionState {
  return state === 'prompt' ? 'default' : state;
}

export function useNotificationPermission(): UseNotificationPermissionReturn {
  const [permission, setPermission] = useState<NotificationPermissionState>(
    resolveInitialPermission,
  );

  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('Notification' in window)) return;
    if (!navigator.permissions) return;

    let mounted = true;
    let status: PermissionStatus | null = null;

    const handleChange = () => {
      if (!mounted || !status) return;
      setPermission(toPermissionState(status.state));
    };

    navigator.permissions
      .query({ name: 'notifications' as PermissionName })
      .then((ps) => {
        if (!mounted) return;
        status = ps;
        status.addEventListener('change', handleChange);
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
      status?.removeEventListener('change', handleChange);
    };
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if (!('Notification' in window)) return;

    setIsRequesting(true);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
    } finally {
      setIsRequesting(false);
    }
  }, []);

  return { permission, requestPermission, isRequesting };
}
