import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PackagePlus } from 'lucide-react';

import type { Medicine } from '../model/medicineTypes';
import { buttonVariants, formatDate } from '@/shared/lib';
import {
  Badge,
  TableActions,
  TableCell,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui';

type MedicineRowProps = {
  medicine: Medicine;
  onDelete: (medicine: Medicine) => void;
};

export function MedicineRow({ medicine, onDelete }: MedicineRowProps) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.list',
  });

  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{medicine.id}</TableCell>
      <TableCell>{medicine.name}</TableCell>
      <TableCell>
        <Badge variant={medicine.is_active ? 'default' : 'secondary'}>
          {medicine.is_active ? t('active') : t('inactive')}
        </Badge>
      </TableCell>
      <TableCell>{medicine.price}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(medicine.created_at, i18n.language, false)}
      </TableCell>

      <TableActions
        item={medicine}
        itemId={medicine.id}
        onDelete={onDelete}
        path="/dashboard/medicines"
      >
        <TableActions.Detail />
        <TableActions.Update />
        <Restock id={medicine.id} />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}

function Restock({ id }: { id: number }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.restock',
  });

  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>
        <Link
          to={`/dashboard/medicines/${id}/restock`}
          aria-label={t('update')}
          className={buttonVariants({
            size: 'sm',
            variant: 'ghost',
            className: 'p-0!',
          })}
        >
          <PackagePlus className="size-4" />
        </Link>
      </TooltipTrigger>
      <TooltipContent>{t('tooltipLabel')}</TooltipContent>
    </Tooltip>
  );
}
