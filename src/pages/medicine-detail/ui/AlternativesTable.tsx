import { PackageSearch, Repeat2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { formatPrice } from '../../../shared/lib/formatPrice';
import type { Alternative } from '../model/medicineDetailTypes';
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
} from '@/shared/ui';

interface Props {
  alternatives: Alternative[];
}

export function AlternativesTable({ alternatives }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.detail',
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <Repeat2 className="size-4" />
              {t('alternativesTitle')}
            </CardTitle>
            <CardDescription>{t('alternativesSubtitle')}</CardDescription>
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
            <p className="text-sm">{t('noAlternatives')}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('altName')}</TableHead>
                <TableHead>{t('altPrice')}</TableHead>
                <TableHead>{t('altImported')}</TableHead>
                <TableHead className="max-w-xs">{t('altNote')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alternatives.map((alt) => (
                <TableRow key={alt.id}>
                  <TableCell className="font-medium">{alt.name}</TableCell>
                  <TableCell className="tabular-nums">
                    {formatPrice(alt.price, i18n.language)}
                  </TableCell>
                  <TableCell>
                    {alt.is_imported ? (
                      <Badge variant="outline" className="font-normal">
                        {t('imported')}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate text-sm">
                    {alt.pivot.note || '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
