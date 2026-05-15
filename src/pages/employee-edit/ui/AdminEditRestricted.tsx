import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, UserCircle } from 'lucide-react';

import { Card, CardContent } from '@/shared/ui';
import { buttonVariants } from '@/shared/lib';

export function AdminEditRestricted() {
  const { t } = useTranslation('employees', {
    keyPrefix: 'editRestricted',
  });

  return (
    <Card>
      <CardContent className="flex flex-col items-center py-14 text-center">
        <div className="bg-muted text-muted-foreground mb-6 flex size-16 items-center justify-center rounded-2xl">
          <ShieldCheck className="size-8" />
        </div>

        <h2 className="text-foreground mb-2 text-lg font-semibold">
          {t('title')}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-sm text-sm leading-relaxed">
          {t('message')}
        </p>

        <Link to="/dashboard/profile/edit" className={buttonVariants({})}>
          <UserCircle />
          {t('cta')}
        </Link>
      </CardContent>
    </Card>
  );
}
