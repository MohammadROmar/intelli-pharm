import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  clearRefreshToken,
  getRefreshToken,
  setRefreshToken,
} from '../lib/refreshToken';

type User = { name: string; email: string };

type SessionState = {
  accessToken: string | null;
  refreshToken: string | null;
  roles: string[] | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  unreadNotifications: number | null;
};

const initialState: SessionState = {
  accessToken: null,
  refreshToken: getRefreshToken(),
  roles: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  unreadNotifications: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        roles: string[];
        user: User;
        unread_notifications_count: number;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.roles = action.payload.roles;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.unreadNotifications = action.payload.unread_notifications_count;

      setRefreshToken(action.payload.refreshToken);
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
      state.unreadNotifications = action.payload;
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.roles = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.unreadNotifications = null;

      clearRefreshToken();
    },

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
