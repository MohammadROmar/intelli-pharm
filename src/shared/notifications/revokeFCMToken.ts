import { FCM_TOKEN_STORAGE_KEY, getMessagingInstance } from './messaging';

export async function revokeFCMToken(): Promise<void> {
  try {
    const [messaging, { deleteToken }] = await Promise.all([
      getMessagingInstance(),
      import('firebase/messaging'),
    ]);

    await deleteToken(messaging);
    localStorage.removeItem(FCM_TOKEN_STORAGE_KEY);
  } catch (err) {
    console.error('[FCM] deleteToken failed:', err);
  }
}
