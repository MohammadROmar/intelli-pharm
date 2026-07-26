import { Link } from 'react-router';
import { Route } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';

export function InitiatePlanButton() {
  const { t } = useTranslation('plan', { keyPrefix: 'initiate' });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm">
          <Route className="size-4 shrink-0" />
          <span className="sr-only sm:not-sr-only">{t('main')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to="/dashboard/plans/initiate" className="cursor-pointer">
            {t('rep')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/dashboard/plans/initiate-from-deliveries"
            className="cursor-pointer"
          >
            {t('delivery')}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
