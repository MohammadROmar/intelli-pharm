import { Link } from 'react-router';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';

export function AddOfferButton() {
  const { t } = useTranslation('offers');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm">
          <Plus className="size-4" />
          {t('addOffer')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            to="/dashboard/promotions/offers/new-percentage"
            className="cursor-pointer"
          >
            {t('addPercentageOffer')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/dashboard/promotions/offers/new-gifts"
            className="cursor-pointer"
          >
            {t('addGiftOffer')}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
