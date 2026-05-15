import type { TFunction } from 'i18next';

export function getRoles(t: TFunction) {
  return [
    { value: 'distributor', label: t('roles.distributor') },
    { value: 'rep', label: t('roles.rep') },
  ];
}
