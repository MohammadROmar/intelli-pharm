import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';

import type { CityDetail } from '../model/cityTypes';
import {
  Button,
  TableActions,
  TableCell,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui';

type CityRowProps = {
  city: CityDetail;
  onDelete: (city: CityDetail) => void;
  onUpdate: (city: CityDetail) => void;
};

export function CityRow({ city, onUpdate, onDelete }: CityRowProps) {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{city.id}</TableCell>
      <TableCell>{city.name}</TableCell>

      <TableActions
        item={city}
        itemId={city.id}
        onDelete={onDelete}
        path="/dashboard/cities"
      >
        <EditCityButton city={city} onUpdate={onUpdate} />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}

type Props = Omit<CityRowProps, 'onDelete'>;

function EditCityButton({ city, onUpdate }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'tableActions',
  });

  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>
        <Button
          aria-label={t('update')}
          onClick={() => onUpdate(city)}
          size="sm"
          variant="ghost"
          className="p-0!"
        >
          <Pencil className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t('update')}</TooltipContent>
    </Tooltip>
  );
}
