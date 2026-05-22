export { getFirebaseApp } from './config';
export {
  FCM_TOKEN_STORAGE_KEY,
  FCM_BROADCAST_CHANNEL,
  requestPermissionAndGetToken,
  getFreshTokenSilently,
  onForegroundMessage,
  readToken,
  writeToken,
} from './messaging';
