export const required = () => (v: string) =>
  ((v ? String(v) : '') ?? '').trim().length > 0 || 'required';

export const fRequired = () => (v: string) => {
  return ((v ? String(v) : '') ?? '').trim().length > 0 || 'fRequired';
};

export const positiveNumber = () => (v: string) =>
  (!isNaN(Number(v)) && Number(v) > 0) || 'validNum';
