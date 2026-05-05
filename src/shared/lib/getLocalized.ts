const SUPPORTED_LOCALES = ['ar', 'en'] as const;
export type SupportedLocales = (typeof SUPPORTED_LOCALES)[number];

export type Localized = Record<SupportedLocales, string>;

export function getLocalized(obj: Localized, lang: string) {
  const locale = SUPPORTED_LOCALES.includes(lang as SupportedLocales)
    ? (lang as SupportedLocales)
    : 'en';

  return obj[locale];
}
