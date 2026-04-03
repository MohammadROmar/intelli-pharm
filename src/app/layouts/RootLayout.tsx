import { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Toaster } from '@/shared/ui';
import { apiClient } from '@/shared/api';
import '@/shared/config/i18n';

export default function RootLayout() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language) {
      apiClient.defaults.headers.common['Accept-Language'] = i18n.language;
    }

    const handleLanguageChange = (lng: string) => {
      apiClient.defaults.headers.common['Accept-Language'] = lng;
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <>
      <ScrollRestoration />
      <Toaster />
      <Outlet />
    </>
  );
}
