export {
  AUTH_BROADCAST_CHANNEL,
  broadcastLogout,
  broadcastRefreshed,
  isOwnBroadcast,
  type AuthSyncMessage,
} from './lib/authBroadcast';
export { toSessionCredentials } from './lib/toSessionCredentials';
export { selectUnreadNotifications } from './lib/selectUnreadNotifications';
export { hasPermission } from './lib/hasPermission';

export {
  logout,
  setLoading,
  sessionSlice,
  setCredentials,
  setUnreadNotifications,
  incrementUnreadNotifications,
  decrementUnreadNotifications,
  default as sessionReducer,
} from './model/slice';

export {
  useHasPermission,
  useGrantedPermissions,
} from './model/useHasPermission';
