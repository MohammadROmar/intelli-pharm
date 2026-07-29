export type DeviceRegistrationState =
  | 'registered'
  | 'unregistered'
  | 'registering'
  | 'error';

let state: DeviceRegistrationState = 'unregistered';
const listeners = new Set<() => void>();

export function setDeviceRegistrationState(
  next: DeviceRegistrationState,
): void {
  if (state === next) return;

  state = next;
  listeners.forEach((listener) => listener());
}

export function subscribeToDeviceRegistration(
  listener: () => void,
): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getDeviceRegistrationSnapshot(): DeviceRegistrationState {
  return state;
}

export function resetDeviceRegistrationState(): void {
  setDeviceRegistrationState('unregistered');
}
