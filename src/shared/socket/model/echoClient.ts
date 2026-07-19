import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

import { createChannelAuthorizer } from './authorizer';
import { setConnectionState } from './connectionStore';
import type { ConnectionState } from './types';

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

window.Pusher = Pusher;

type ReverbEcho = Echo<'reverb'>;

let echo: ReverbEcho | null = null;
let refCount = 0;

function createEcho(): ReverbEcho {
  const instance = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: Number(import.meta.env.VITE_REVERB_PORT),
    forceTLS: true,
    enabledTransports: ['ws', 'wss'],
    authorizer: createChannelAuthorizer(),
  }) as ReverbEcho;
  instance.connector.pusher.connection.bind(
    'state_change',
    (states: { current: ConnectionState }) => {
      if (import.meta.env.DEV) {
        console.log('[pusher state]', states);
      }

      setConnectionState(states.current);
    },
  );

  instance.connector.pusher.connection.bind('error', (err: Error) => {
    if (import.meta.env.DEV) {
      console.log('[pusher connection error]', err);
    }
  });

  return instance;
}

export function acquireEcho(): ReverbEcho {
  refCount += 1;
  if (!echo) {
    echo = createEcho();
  }
  return echo;
}

export function releaseEcho(): void {
  refCount = Math.max(0, refCount - 1);
  if (refCount === 0 && echo) {
    echo.disconnect();
    echo = null;
    setConnectionState('disconnected');
  }
}
