import { PackageSearch, Repeat2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Medicine } from '@/entities/medicine';
import { formatPrice } from '@/shared/lib';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  TableActions,
} from '@/shared/ui';

interface Props {
  alternatives: Medicine[];
}

export function AlternativesTable({ alternatives }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'medicinesPage',
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <Repeat2 className="size-4" />
              {t('detail.alternativesTitle')}
            </CardTitle>
            <CardDescription>
              {t('detail.alternativesSubtitle')}
            </CardDescription>
          </div>
          {alternatives.length > 0 && (
            <Badge variant="secondary">{alternatives.length}</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {alternatives.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center gap-2 py-10">
            <PackageSearch className="size-8" />
            <p className="text-sm">{t('detail.noAlternatives')}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('list.name')}</TableHead>
                <TableHead>{t('list.status')}</TableHead>
                <TableHead className="max-w-xs">{t('list.price')}</TableHead>
                <TableHead className="max-w-xs">{t('list.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alternatives.map((alt) => (
                <TableRow key={alt.id}>
                  <TableCell className="font-medium">{alt.name}</TableCell>
                  <TableCell>
                    {alt.is_active ? t('list.active') : t('list.inactive')}
                  </TableCell>
                  <TableCell className="tabular-nums">
                    {formatPrice(alt.price, i18n.language)}
                  </TableCell>
                  <TableActions
                    itemId={alt.id}
                    item={alt}
                    path="/dashboard/medicines"
                  >
                    <TableActions.Detail />
                  </TableActions>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
