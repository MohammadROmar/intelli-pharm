import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

import { createChannelAuthorizer } from './authorizer';
import { setConnectionState } from './connectionStore';
import type { ConnectionState } from './types';

type ReverbEcho = Echo<'reverb'>;

const DEFAULT_REVERB_PORT = 443;

let echo: ReverbEcho | null = null;
let refCount = 0;

function resolveReverbPort(): number {
  const parsed = Number(import.meta.env.VITE_REVERB_PORT);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_REVERB_PORT;
}

function warnIfReverbEnvMissing(): void {
  if (!import.meta.env.DEV) return;

  const missing = (['VITE_REVERB_APP_KEY', 'VITE_REVERB_HOST'] as const).filter(
    (key) => !import.meta.env[key],
  );

  if (missing.length > 0) {
    console.error(
      `[tracking] missing required env var(s): ${missing.join(', ')} — the Reverb connection cannot authenticate without them. Check your .env file.`,
    );
  }
}

function createEcho(): ReverbEcho {
  warnIfReverbEnvMissing();

  const reverbPort = resolveReverbPort();

  const instance = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: reverbPort,
    wssPort: reverbPort,
    forceTLS: true,
    enabledTransports: ['ws', 'wss'],
    authorizer: createChannelAuthorizer(),
    Pusher,
  }) as ReverbEcho;

  instance.connector.pusher.connection.bind(
    'state_change',
    (states: { current: ConnectionState }) => {
      if (import.meta.env.DEV) {
        console.log('[tracking] pusher state change', states);
      }
      setConnectionState(states.current);
    },
  );

  instance.connector.pusher.connection.bind('error', (err: Error) => {
    if (import.meta.env.DEV) {
      console.log('[tracking] pusher connection error', err);
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
