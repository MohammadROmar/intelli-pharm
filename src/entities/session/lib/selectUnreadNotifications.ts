export const selectUnreadNotifications = (state: RootState): number =>
  state.session.unreadNotifications ?? 0;
