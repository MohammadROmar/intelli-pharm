export const ARABIC_ONLY = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
export const ENGLISH_ONLY =
  /^[A-Za-z0-9 !@#$%^&*()_\-+=[\]{};:'",.<>?/\\|`~]+$/;

export const required = () => (v: string | number | null) =>
  ((v ? String(v) : '') ?? '').trim().length > 0 || 'required';

export const fRequired = () => (v: string | number) => {
  return ((v ? String(v) : '') ?? '').trim().length > 0 || 'fRequired';
};

export const positiveNumber = () => (v: string) =>
  (!isNaN(Number(v)) && Number(v) > 0) || 'validNum';

export const isValidPhone = () => (v: string) =>
  /^09\d{8}$/.test(v.trim()) || 'invalidPhone';

export function englishOnly(v: string) {
  return !v?.trim() || ENGLISH_ONLY.test(v.trim()) || 'form.errors.englishOnly';
}

export function arabicOnly(v: string) {
  return !v?.trim() || ARABIC_ONLY.test(v.trim()) || 'form.errors.arabicOnly';
}
