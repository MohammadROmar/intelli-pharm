import { Suspense, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { QueryErrorBoundary, Sheet, SheetContent } from '@/shared/ui';

import { VisitSheet } from './VisitSheet';
import { VisitSheetSkeleton } from './VisitSheetSkeleton';
import { useGetVisitSuspense } from '../model/useGetVisitSuspense';

type Props = { id: number | null; onClose: () => void };

const VisitSheetContent = memo(function VisitSheetContent({
  id,
}: {
  id: number;
}) {
  const { data } = useGetVisitSuspense(id);

  return <VisitSheet visit={data.data!} />;
});

export default function VisitDetail({ id, onClose }: Props) {
  const { i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  const [prevId, setPrevId] = useState<number | null>(id);
  const [activeId, setActiveId] = useState<number | null>(id);

  if (id !== prevId) {
    setPrevId(id);
    if (id !== null) setActiveId(id);
  }

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) onClose();
    },
    [onClose],
  );

  return (
    <Sheet open={id !== null} onOpenChange={handleOpenChange}>
      <SheetContent
        side={isRtl ? 'left' : 'right'}
        className="thin-scrollbar overflow-y-auto sm:max-w-md"
      >
        {activeId !== null ? (
          <QueryErrorBoundary>
            <Suspense fallback={<VisitSheetSkeleton />}>
              <VisitSheetContent id={activeId} />
            </Suspense>
          </QueryErrorBoundary>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
