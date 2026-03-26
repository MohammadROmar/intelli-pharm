import { buttonVariants, formatDate } from '@/shared/lib';
import type { LaboratoryListItem } from '../model/laboratoryTypes';
import {
  TableActions,
  TableCell,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';

type LaboratoryRowProps = {
  laboratory: LaboratoryListItem;
  onDelete: (laboratory: LaboratoryListItem) => void;
};

export function LaboratoryRow({ laboratory, onDelete }: LaboratoryRowProps) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'tableActions',
  });

  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{laboratory.id}</TableCell>
      <TableCell>{laboratory.name}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(laboratory.created_at, i18n.language, false)}
      </TableCell>

      <TableActions
        item={laboratory}
        itemId={laboratory.id}
        onDelete={onDelete}
        path="/dashboard/laboratories"
      >
        <TableActions.Detail />
        <EditLaboratoryButton id={laboratory.id} label={t('update')} />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}

type Props = { id: number; label: string };

function EditLaboratoryButton({ id, label }: Props) {
  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>
        <Link
          to={`/dashboard/laboratories/${id}?active=edit`}
          aria-label={label}
          className={buttonVariants({ size: 'sm', variant: 'ghost' })}
        >
          <Pencil className="size-4" />
        </Link>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
