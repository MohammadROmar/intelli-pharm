const LANGUAGE_STORAGE_KEY = 'i18nextLng';

export const LANGUAGE_CHANGE_EVENT = 'app:languageChanged';

function readStoredLanguage(): string | null {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function getInitialLng(): string {
  return readStoredLanguage() ?? navigator.language.split('-')[0];
}
