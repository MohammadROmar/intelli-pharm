export const nonNegativeNumber = () => (v: string) => {
  if (v === '' || v === null || v === undefined) return true;
  return (!isNaN(Number(v)) && Number(v) >= 0) || 'validNum';
};
