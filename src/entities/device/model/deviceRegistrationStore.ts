import { readToken } from '@/shared/notifications';

export type DeviceRegistrationState =
  | 'registered'
  | 'unregistered'
  | 'registering'
  | 'error';

let state: DeviceRegistrationState = readToken()
  ? 'registered'
  : 'unregistered';
const listeners = new Set<() => void>();

export function setDeviceRegistrationState(next: DeviceRegistrationState) {
  state = next;
  listeners.forEach((listener) => listener());
}

export function subscribeToDeviceRegistration(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getDeviceRegistrationSnapshot() {
  return state;
}

/**
 * Resets the shared registration state back to 'unregistered'. Call this
 * on logout so a stale 'registered' value from the previous session
 * doesn't linger into the next login — the module state persists across
 * a client-side logout -> login navigation since there's no full page
 * reload in between to reset it naturally.
 */
export function resetDeviceRegistrationState() {
  setDeviceRegistrationState('unregistered');
}
