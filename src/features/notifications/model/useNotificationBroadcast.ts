import { useCallback, useEffect, useRef } from 'react';

import type { FCMNotificationData } from './types';

const NOTIFICATION_BROADCAST_CHANNEL = 'intelli-pharm:foreground-notifications';
const NOTIFICATION_BROADCAST_TYPE = 'intelli-pharm:foreground-notification';
const NOTIFICATION_STORAGE_KEY = 'intelli-pharm:foreground-notification-event';
const MAX_RECENT_BROADCASTS = 100;

export type NotificationBroadcastPayload = {
  messageId?: string;
  data: FCMNotificationData;
  fallbackBody?: string;
  fallbackTitle?: string;
};

type NotificationBroadcastMessage = {
  type: typeof NOTIFICATION_BROADCAST_TYPE;
  eventId: string;
  payload: NotificationBroadcastPayload;
};

type Options = {
  onNotification: (payload: NotificationBroadcastPayload) => void;
};

function parseNotificationBroadcastMessage(
  value: unknown,
): NotificationBroadcastMessage | null {
  let parsedValue = value;

  if (typeof value === 'string') {
    try {
      parsedValue = JSON.parse(value) as unknown;
    } catch {
      return null;
    }
  }

  if (!parsedValue || typeof parsedValue !== 'object') return null;

  const message = parsedValue as Partial<NotificationBroadcastMessage>;

  const isValid =
    message.type === NOTIFICATION_BROADCAST_TYPE &&
    typeof message.eventId === 'string' &&
    message.eventId.length > 0 &&
    !!message.payload &&
    typeof message.payload === 'object' &&
    !!message.payload.data &&
    typeof message.payload.data === 'object';

  return isValid ? (message as NotificationBroadcastMessage) : null;
}

function createEventId(): string {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function useNotificationBroadcast({
  onNotification,
}: Options): (payload: NotificationBroadcastPayload) => void {
  const onNotificationRef = useRef(onNotification);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const recentEventIdsRef = useRef(new Set<string>());

  useEffect(() => {
    onNotificationRef.current = onNotification;
  }, [onNotification]);

  useEffect(() => {
    function handleBroadcastMessage(value: unknown): void {
      const message = parseNotificationBroadcastMessage(value);
      if (!message || recentEventIdsRef.current.has(message.eventId)) return;

      recentEventIdsRef.current.add(message.eventId);

      if (recentEventIdsRef.current.size > MAX_RECENT_BROADCASTS) {
        const oldestEventId = recentEventIdsRef.current.values().next()
          .value as string | undefined;

        if (oldestEventId) {
          recentEventIdsRef.current.delete(oldestEventId);
        }
      }

      onNotificationRef.current(message.payload);
    }

    function handleChannelMessage(event: MessageEvent<unknown>): void {
      handleBroadcastMessage(event.data);
    }

    function handleStorageMessage(event: StorageEvent): void {
      if (event.key !== NOTIFICATION_STORAGE_KEY || !event.newValue) return;

      handleBroadcastMessage(event.newValue);
    }

    window.addEventListener('storage', handleStorageMessage);

    if (typeof BroadcastChannel === 'undefined') {
      return () => {
        window.removeEventListener('storage', handleStorageMessage);
      };
    }

    const channel = new BroadcastChannel(NOTIFICATION_BROADCAST_CHANNEL);
    channelRef.current = channel;
    channel.addEventListener('message', handleChannelMessage);

    return () => {
      channelRef.current = null;
      channel.removeEventListener('message', handleChannelMessage);
      channel.close();
      window.removeEventListener('storage', handleStorageMessage);
    };
  }, []);

  return useCallback((payload: NotificationBroadcastPayload) => {
    const message: NotificationBroadcastMessage = {
      type: NOTIFICATION_BROADCAST_TYPE,
      eventId: createEventId(),
      payload,
    };

    channelRef.current?.postMessage(message);

    try {
      localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(message));
      localStorage.removeItem(NOTIFICATION_STORAGE_KEY);
    } catch {
      // BroadcastChannel remains the primary transport when storage is blocked.
    }
  }, []);
}
