const AUTH_HINT_KEY = 'is_authenticated';

export const setAuthHint = () => localStorage.setItem(AUTH_HINT_KEY, 'true');
export const clearAuthHint = () => localStorage.removeItem(AUTH_HINT_KEY);
export const hasAuthHint = () => !!localStorage.getItem(AUTH_HINT_KEY);
