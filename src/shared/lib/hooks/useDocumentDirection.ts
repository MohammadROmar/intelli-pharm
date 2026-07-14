import { useLayoutEffect, useState } from 'react';

import { LANGUAGE_CHANGE_EVENT, getInitialLng } from '../language';

const RTL_LANGUAGES = new Set(['ar']);

export function useDocumentDirection() {
  const [lng, setLng] = useState(getInitialLng);
  const dir = RTL_LANGUAGES.has(lng) ? 'rtl' : 'ltr';

  useLayoutEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === 'string' && detail.length > 0) {
        setLng(detail);
      }
    };
    window.addEventListener(LANGUAGE_CHANGE_EVENT, handler);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, handler);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lng);
  }, [dir, lng]);

  return { dir } as const;
}
