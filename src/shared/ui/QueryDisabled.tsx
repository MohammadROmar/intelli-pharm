import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Info, List } from 'lucide-react';

import { buttonVariants } from '../lib';

type Props = { path: string; isEdit?: boolean };

export function QueryDisabled({ path, isEdit = false }: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'queryDisabled' });

  const { id } = useParams<{ id: string }>();

  return (
    <div className="grid h-full">
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center py-20 text-center">
        <div className="bg-muted text-muted-foreground mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
          <Info className="size-8" />
        </div>

        <h2 className="text-foreground mb-1 text-xl font-semibold">
          {t(isEdit ? 'editTitle' : 'title')}
        </h2>

        <p className="text-muted-foreground mb-2 max-w-md text-sm leading-relaxed">
          {t('description')}
        </p>

        <p className="text-muted-foreground/80 mb-6 max-w-md text-xs">
          {t('receivedValue', { value: id })}
        </p>

        <Link to={path} className={buttonVariants()}>
          <List className="size-4" />
          {t('actions.openList')}
        </Link>
      </div>
    </div>
  );
}
