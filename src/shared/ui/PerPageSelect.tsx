import { useTranslation } from 'react-i18next';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { PER_PAGE_OPTIONS, usePerPage, type PerPageOption } from '../lib';

export function PerPageSelect() {
  const { t } = useTranslation();
  const { perPage, setPerPage } = usePerPage();

  return (
    <div className="flex items-center gap-2 lg:w-full lg:justify-end">
      <span className="text-muted-foreground shrink-0 text-sm">
        {t('common.rowsPerPage')}
      </span>
      <Select
        value={String(perPage)}
        onValueChange={(v) => setPerPage(Number(v) as PerPageOption)}
      >
        <SelectTrigger className="h-8 w-20 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PER_PAGE_OPTIONS.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
