import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(
    resourcesToBackend(
      (lng: string, ns: string) => import(`./locales/${lng}/${ns}.json`),
    ),
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    defaultNS: 'common',
    ns: ['common'],
    returnObjects: true,
    interpolation: { escapeValue: false },
  });

i18n.on('languageChanged', (lng) => {
  window.dispatchEvent(new CustomEvent('app:languageChanged', { detail: lng }));
});

export default i18n;
