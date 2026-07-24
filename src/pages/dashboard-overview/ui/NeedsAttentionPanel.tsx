import { memo, useMemo, type ElementType } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock,
  XCircle,
} from 'lucide-react';

import { cn } from '@/shared/lib';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  CardTitle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';

import { RELATED_ENTITY_ROUTE } from '../model/constants';
import type { NeedsAttentionItem } from '../model/types';

const PREVIEW_ITEM_COUNT = 4;

const ICON_BY_TYPE: Record<NeedsAttentionItem['type'], ElementType> = {
  expiring_medicine: AlertTriangle,
  delivery_delayed: Clock,
  visit_failed: XCircle,
};

const ICON_CLASS_BY_SEVERITY: Record<NeedsAttentionItem['severity'], string> = {
  warning: 'text-warning',
  danger: 'text-destructive',
};

const ICON_BG_BY_SEVERITY: Record<NeedsAttentionItem['severity'], string> = {
  warning: 'bg-warning/10',
  danger: 'bg-destructive/10',
};

const SEVERITY_WEIGHT: Record<NeedsAttentionItem['severity'], number> = {
  danger: 0,
  warning: 1,
};

type NeedsAttentionPanelProps = { items: NeedsAttentionItem[] };

function headerBadgeVariant(
  items: NeedsAttentionItem[],
): 'destructive' | 'warning' | 'secondary' {
  if (items.some((item) => item.severity === 'danger')) return 'destructive';
  if (items.some((item) => item.severity === 'warning')) return 'warning';
  return 'secondary';
}

function getItemKey(item: NeedsAttentionItem, index: number) {
  return `${item.type}-${item.related_type}-${item.related_id ?? index}`;
}

export const NeedsAttentionPanel = memo(function NeedsAttentionPanel({
  items,
}: NeedsAttentionPanelProps) {
  const { t, i18n } = useTranslation('dashboard-overview', {
    keyPrefix: 'needsAttention',
  });

  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) => SEVERITY_WEIGHT[a.severity] - SEVERITY_WEIGHT[b.severity],
      ),
    [items],
  );
  const visibleItems = sortedItems.slice(0, PREVIEW_ITEM_COUNT);
  const hiddenCount = sortedItems.length - visibleItems.length;

  return (
    <Card className="gap-2!">
      <CardHeader className="flex! items-center! justify-between!">
        <CardTitle className="text-sm font-medium">{t('title')}</CardTitle>
        {items.length > 0 && (
          <Badge variant={headerBadgeVariant(items)}>{items.length}</Badge>
        )}
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <>
            <ul>
              {visibleItems.map((item, index) => (
                <NeedsAttentionRow
                  key={getItemKey(item, index)}
                  item={item}
                  messageClassName="line-clamp-1"
                />
              ))}
            </ul>

            {hiddenCount > 0 && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground mt-2 w-full"
                  >
                    {t('showAll', { count: items.length })}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side={i18n.dir() === 'rtl' ? 'left' : 'right'}
                  className="flex h-full w-full max-w-[85vw] flex-col gap-0 overflow-hidden p-0 sm:max-w-md"
                >
                  <SheetHeader className="shrink-0 border-b px-6 py-5 text-start">
                    <CardSectionHeader
                      title={t('title')}
                      description={t('sheetDescription', {
                        count: items.length,
                      })}
                      icon={CircleAlert}
                      aria-hidden
                    />
                    <SheetTitle className="sr-only">{t('title')}</SheetTitle>
                    <SheetDescription className="sr-only">
                      {t('sheetDescription', { count: items.length })}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="thin-scrollbar overflow-y-auto">
                    <ul className="space-y-1 px-5">
                      {sortedItems.map((item, index) => (
                        <NeedsAttentionRow
                          key={getItemKey(item, index)}
                          item={item}
                        />
                      ))}
                    </ul>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </>
        ) : (
          <div className="motion-safe:animate-in motion-safe:fade-in flex flex-col items-center gap-2 py-8 text-center motion-reduce:animate-none">
            <span className="bg-success/10 text-success flex size-10 items-center justify-center rounded-full">
              <CheckCircle2 className="size-5" aria-hidden />
            </span>
            <p className="text-muted-foreground text-sm">{t('empty')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

type NeedsAttentionRowProps = {
  item: NeedsAttentionItem;
  messageClassName?: string;
};

const NeedsAttentionRow = memo(function NeedsAttentionRow({
  item,
  messageClassName,
}: NeedsAttentionRowProps) {
  const Icon = ICON_BY_TYPE[item.type];
  const iconClass = ICON_CLASS_BY_SEVERITY[item.severity];
  const basePath = item.related_id
    ? RELATED_ENTITY_ROUTE[item.related_type]
    : undefined;
  const href = basePath ? `${basePath}/${item.related_id}` : undefined;

  const content = (
    <>
      <span
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full',
          ICON_BG_BY_SEVERITY[item.severity],
        )}
      >
        <Icon className={cn('size-4', iconClass)} aria-hidden />
      </span>
      <p
        className={cn(
          'text-foreground/90 min-w-0 flex-1 pt-1 text-sm leading-snug',
          messageClassName,
        )}
      >
        {item.related_type === 'delivery' && (
          <span className="text-muted-foreground font-mono ltr:pr-2 rtl:pl-2">
            #{item.related_id}
          </span>
        )}
        {item.message}
      </p>
      {href && (
        <ChevronRight
          className="text-muted-foreground mt-1.5 size-4 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          aria-hidden
        />
      )}
    </>
  );

  return (
    <li>
      {href ? (
        <Link
          to={href}
          className="group hover:bg-accent/60 flex items-center gap-3 rounded-lg p-2 transition-colors"
        >
          {content}
        </Link>
      ) : (
        <div className="flex items-center gap-3 rounded-lg p-2">{content}</div>
      )}
    </li>
  );
});
