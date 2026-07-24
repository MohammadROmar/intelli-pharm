import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';

import {
  Button,
  CardSectionHeader,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';
import { useTrackingIds, type TrackingFilter } from '@/entities/tracking';

import { TrackingRosterList } from './TrackingRosterList';

type Props = {
  filter: TrackingFilter;
  focusedUserId: number | null;
  onSelectUser: (userId: number) => void;
};

export function TrackingRosterPanel({
  filter,
  focusedUserId,
  onSelectUser,
}: Props) {
  const { t } = useTranslation('tracking', { keyPrefix: 'roster' });
  const ids = useTrackingIds(filter);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSelectAndClose = useCallback(
    (userId: number) => {
      onSelectUser(userId);
      setIsSheetOpen(false);
    },
    [onSelectUser],
  );

  return (
    <>
      <aside
        aria-label={t('title')}
        className="bg-card border-border hidden h-full w-72 shrink-0 flex-col overflow-hidden rounded-lg border lg:flex"
      >
        <div className="border-border flex items-center justify-between border-b px-3 py-2.5">
          <h2 className="text-foreground text-sm font-semibold">
            {t('title')}
          </h2>
          <span className="text-muted-foreground text-xs">
            {t('onlineCount', { count: ids.length })}
          </span>
        </div>
        <TrackingRosterList
          filter={filter}
          focusedUserId={focusedUserId}
          onSelectUser={onSelectUser}
        />
      </aside>

      <div className="absolute start-4 bottom-4 z-50 lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="gap-1.5 rounded-full shadow-md"
            >
              <Users className="size-3.5" aria-hidden />
              {t('onlineCount', { count: ids.length })}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="flex max-h-[70vh] flex-col">
            <SheetHeader>
              <CardSectionHeader
                title={t('title')}
                description={t('description')}
                icon={Users}
                aria-hidden
              />

              <SheetTitle className="sr-only">{t('title')}</SheetTitle>
              <SheetDescription className="sr-only">
                {t('description')}
              </SheetDescription>
            </SheetHeader>
            <TrackingRosterList
              filter={filter}
              focusedUserId={focusedUserId}
              onSelectUser={handleSelectAndClose}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
