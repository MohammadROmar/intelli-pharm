import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

import { ErrorLayout } from './Error';
import { buttonVariants } from '@/shared/components/ui/button-variants';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <ErrorLayout>
      <p className="text-muted-foreground mb-3 flex items-center gap-3 text-sm font-semibold">
        404
      </p>

      <h1 className="mb-2 text-4xl font-bold">{t('notFoundPage.title')}</h1>
      <p className="text-muted-foreground">{t('notFoundPage.subtitle')}</p>
      <Link
        to="/dashboard"
        className={buttonVariants({
          className: 'mt-8 flex cursor-pointer items-center gap-2',
        })}
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        <span>{t('notFoundPage.action')}</span>
      </Link>
    </ErrorLayout>
  );
}
