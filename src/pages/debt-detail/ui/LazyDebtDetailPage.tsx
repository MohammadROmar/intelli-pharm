import { lazy } from "react";

import { DebtDetailSkeleton } from "./DebtDetailSkeleton";
import { WithSuspense } from "@/shared/ui";

const DebtDetailPage = lazy(() => import("./DebtDetailPage"));

function LazyDebtDetailPage() {
  return (
    <WithSuspense loader={<DebtDetailSkeleton />}>
      <DebtDetailPage />
    </WithSuspense>
  );
}

export { LazyDebtDetailPage as Component };
