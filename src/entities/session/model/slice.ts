import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { clearAuthHint, setAuthHint } from '../lib/authHint';

interface User {
  name: string;
  email: string;
  role: string;
}

interface SessionState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: SessionState = {
  accessToken: null,
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
      action: PayloadAction<{ accessToken: string; user: User }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;

      setAuthHint();
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;

      clearAuthHint();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } = sessionSlice.actions;
export default sessionSlice.reducer;
