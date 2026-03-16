const REFRESH_TOKEN_KEY = 'refresh_token';

export const setRefreshToken = (refreshToken: string) =>
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
export const clearRefreshToken = () =>
  localStorage.removeItem(REFRESH_TOKEN_KEY);
export const hasRefreshToken = () => !!localStorage.getItem(REFRESH_TOKEN_KEY);
