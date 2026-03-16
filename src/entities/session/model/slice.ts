import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  clearRefreshToken,
  getRefreshToken,
  setRefreshToken,
} from '../lib/refreshToken';

interface User {
  name: string;
  email: string;
}

interface SessionState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: SessionState = {
  accessToken: null,
  refreshToken: getRefreshToken(),
  user: null,
  isAuthenticated: false,
  isLoading: true,
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
        user: User;
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;

      setRefreshToken(action.payload.refreshToken);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;

      clearRefreshToken();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } = sessionSlice.actions;
export default sessionSlice.reducer;
