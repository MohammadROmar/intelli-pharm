import { useLayoutEffect, useState } from 'react';

const RTL_LANGUAGES = ['ar'];

function getInitialLng(): string {
  return localStorage.getItem('i18nextLng') ?? navigator.language.split('-')[0];
}

export function useDocumentDirection() {
  const [lng, setLng] = useState(getInitialLng);
  const dir = RTL_LANGUAGES.includes(lng) ? 'rtl' : 'ltr';

  useLayoutEffect(() => {
    const handler = (e: Event) => setLng((e as CustomEvent<string>).detail);
    window.addEventListener('app:languageChanged', handler);
    return () => window.removeEventListener('app:languageChanged', handler);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lng);
  }, [dir, lng]);

  return { dir } as const;
}
