import { useCallback, useState, useSyncExternalStore } from 'react';

export type NotificationPermissionState =
  | 'unsupported'
  | 'default'
  | 'granted'
  | 'denied';

type UseNotificationPermissionReturn = {
  permission: NotificationPermissionState;
  requestPermission: () => Promise<NotificationPermissionState>;
  refreshPermission: () => void;
  isRequesting: boolean;
};

const listeners = new Set<() => void>();

let permissionState = readBrowserPermission();
let permissionStatus: PermissionStatus | null = null;
let permissionObserverPromise: Promise<void> | null = null;

function hasRequiredBrowserApis(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.isSecureContext &&
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
}

function readBrowserPermission(): NotificationPermissionState {
  if (!hasRequiredBrowserApis()) return 'unsupported';
  return Notification.permission;
}

function emitIfChanged(next: NotificationPermissionState): void {
  if (permissionState === next) return;

  permissionState = next;
  listeners.forEach((listener) => listener());
}

function handlePermissionChange(): void {
  emitIfChanged(readBrowserPermission());
}

async function observePermissionChanges(): Promise<void> {
  if (!hasRequiredBrowserApis() || !navigator.permissions || permissionStatus) {
    return;
  }

  try {
    const status = await navigator.permissions.query({
      name: 'notifications' as PermissionName,
    });

    if (listeners.size === 0) return;

    permissionStatus = status;
    permissionStatus.addEventListener('change', handlePermissionChange);
    handlePermissionChange();
  } catch {
    // Safari and older browsers can reject this query. The visibility
    // listener below still observes changes made through browser settings.
  }
}

function startObservers(): void {
  document.addEventListener('visibilitychange', handlePermissionChange);

  permissionObserverPromise ??= observePermissionChanges().finally(() => {
    permissionObserverPromise = null;
  });
}

function stopObservers(): void {
  document.removeEventListener('visibilitychange', handlePermissionChange);
  permissionStatus?.removeEventListener('change', handlePermissionChange);
  permissionStatus = null;
}

export function subscribeToNotificationPermission(
  listener: () => void,
): () => void {
  listeners.add(listener);

  if (listeners.size === 1) {
    startObservers();
    handlePermissionChange();
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) stopObservers();
  };
}

export function getNotificationPermissionSnapshot(): NotificationPermissionState {
  return permissionState;
}

function getServerPermissionSnapshot(): NotificationPermissionState {
  return 'unsupported';
}

export function refreshNotificationPermission(): void {
  handlePermissionChange();
}

export async function requestNotificationPermission(): Promise<NotificationPermissionState> {
  if (!hasRequiredBrowserApis()) {
    emitIfChanged('unsupported');
    return 'unsupported';
  }

  const permission =
    Notification.permission === 'default'
      ? await Notification.requestPermission()
      : Notification.permission;

  emitIfChanged(permission);
  return permission;
}

export function useNotificationPermission(): UseNotificationPermissionReturn {
  const permission = useSyncExternalStore(
    subscribeToNotificationPermission,
    getNotificationPermissionSnapshot,
    getServerPermissionSnapshot,
  );
  const [isRequesting, setIsRequesting] = useState(false);

  const requestPermission = useCallback(async () => {
    setIsRequesting(true);
    try {
      return await requestNotificationPermission();
    } finally {
      setIsRequesting(false);
    }
  }, []);

  return {
    permission,
    requestPermission,
    refreshPermission: refreshNotificationPermission,
    isRequesting,
  };
}
