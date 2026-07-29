export { updateFcmToken } from './api/deviceTokenApi';

export {
  getDeviceRegistrationSnapshot,
  resetDeviceRegistrationState,
  setDeviceRegistrationState,
  subscribeToDeviceRegistration,
  type DeviceRegistrationState,
} from './model/deviceRegistrationStore';
export {
  registerDeviceNotifications,
  syncDeviceRegistration,
} from './model/deviceRegistration';
export { useDeviceRegistration } from './model/useDeviceRegistration';
