import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useDocumentDirection() {
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    document.documentElement.setAttribute('dir', i18n.dir());
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n]);

  return { dir: i18n.dir() };
}
