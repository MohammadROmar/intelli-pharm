import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Permission } from '@/shared/api';

export type SessionUser = {
  name: string;
  email: string;
  phone_number: string | null;
};

export type SessionCredentials = {
  accessToken: string;
  roles: string[];
  permissions: Permission[];
  user: SessionUser;
  unread_notifications_count: number;
};

export type SessionState = {
  accessToken: string | null;
  roles: string[] | null;
  permissions: Permission[];
  user: SessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  unreadNotifications: number | null;
};

function createInitialState(isLoading: boolean): SessionState {
  return {
    accessToken: null,
    roles: null,
    permissions: [],
    user: null,
    isAuthenticated: false,
    isLoading,
    unreadNotifications: null,
  };
}

const initialState = createInitialState(true);

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SessionCredentials>) => {
      state.accessToken = action.payload.accessToken;
      state.roles = action.payload.roles;
      state.permissions = action.payload.permissions;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.unreadNotifications = Math.max(
        0,
        action.payload.unread_notifications_count,
      );
    },

    incrementUnreadNotifications: (state) => {
      state.unreadNotifications = (state.unreadNotifications ?? 0) + 1;
    },

    decrementUnreadNotifications: (state) => {
      if (state.unreadNotifications !== null && state.unreadNotifications > 0) {
        state.unreadNotifications -= 1;
      }
    },

    setUnreadNotifications: (state, action: PayloadAction<number>) => {
      state.unreadNotifications = Math.max(0, action.payload);
    },

    logout: () => createInitialState(false),

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCredentials,
  logout,
  setLoading,
  setUnreadNotifications,
  incrementUnreadNotifications,
  decrementUnreadNotifications,
} = sessionSlice.actions;
export default sessionSlice.reducer;
