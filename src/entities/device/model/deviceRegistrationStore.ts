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

export function resetDeviceRegistrationState() {
  setDeviceRegistrationState('unregistered');
}
