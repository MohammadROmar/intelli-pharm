import { lazy, Suspense } from 'react';
import type { TFunction } from 'i18next';
import { MapIcon } from 'lucide-react';

import type { PlanDetail } from '@/entities/plan';
import { ErrorBoundary } from '@/shared/lib';
import {
  DetailCard,
  SectionErrorFallback,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui';

import { MAP_LEGEND_ITEMS } from '../config/mapLegendItems';

const PlanRouteMap = lazy(() => import('./PlanRouteMap'));
const PlanRouteStepMap = lazy(() => import('./PlanRouteStepMap'));

type Props = {
  t: TFunction<'plan', 'detail'>;
  plan: PlanDetail;
  canViewPharmacy: boolean;
};

export function PlanRouteCard({ t, plan, canViewPharmacy }: Props) {
  return (
    <DetailCard
      title={t('map.title')}
      subtitle={t('map.subtitle')}
      icon={MapIcon}
    >
      <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-4 text-xs">
        {MAP_LEGEND_ITEMS.map(({ labelKey, color }) => (
          <span key={labelKey} className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="inline-block size-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            {t(labelKey)}
          </span>
        ))}
      </div>

      <Tabs defaultValue="full">
        <TabsList className="mb-3 w-full sm:w-fit">
          <TabsTrigger value="full">{t('map.tabs.full')}</TabsTrigger>
          <TabsTrigger value="steps">{t('map.tabs.steps')}</TabsTrigger>
        </TabsList>

        <TabsContent value="full">
          <ErrorBoundary FallbackComponent={SectionErrorFallback}>
            <Suspense
              fallback={<Skeleton className="h-105 w-full rounded-lg" />}
            >
              <PlanRouteMap
                paths={plan.paths}
                visits={plan.visits}
                canViewPharmacy={canViewPharmacy}
              />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="steps">
          <ErrorBoundary FallbackComponent={SectionErrorFallback}>
            <Suspense
              fallback={<Skeleton className="h-105 w-full rounded-lg" />}
            >
              <PlanRouteStepMap
                paths={plan.paths}
                visits={plan.visits}
                canViewPharmacy={canViewPharmacy}
              />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </DetailCard>
  );
}
