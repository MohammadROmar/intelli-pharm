import { apiClient } from '@/shared/api';

import type { ChannelAuthResponse } from './types';

const BROADCASTING_AUTH_PATH = '/broadcasting/auth';

type AuthorizerCallback = (
  error: Error | null,
  data: ChannelAuthResponse | null,
) => void;

type EchoChannelLike = { name: string };

export function createChannelAuthorizer() {
  return (channel: EchoChannelLike) => ({
    authorize(socketId: string, callback: AuthorizerCallback): void {
      const body = new URLSearchParams({
        socket_id: socketId,
        channel_name: `${channel.name}`,
      });

      apiClient
        .post(BROADCASTING_AUTH_PATH, body.toString(), {
          baseURL: import.meta.env.VITE_TRACKING_AUTH_ORIGIN,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .then((response) => {
          callback(null, response as unknown as ChannelAuthResponse);
        })
        .catch((error: unknown) => {
          callback(
            error instanceof Error
              ? error
              : new Error('Channel authorization failed'),
            null,
          );
        });
    },
  });
}
