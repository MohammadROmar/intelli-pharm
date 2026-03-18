import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';

import arLocale from './locales/ar.json';
import enLocale from './locales/en.json';

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    resources: {
      ar: { translation: arLocale },
      en: { translation: enLocale },
    },
    fallbackLng: 'en',
    returnObjects: true,
    interpolation: { escapeValue: false },
  });

i18n.on('languageChanged', (lng) => {
  window.dispatchEvent(new CustomEvent('app:languageChanged', { detail: lng }));
});
