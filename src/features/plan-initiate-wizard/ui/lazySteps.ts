import { lazy } from 'react';

// Both wizards need these lazy — Location is step 1 in both, Config is step
// 2 in both. Defining the lazy() wrapping once here means both PlannerWizard
// shells import an already-lazy component instead of each writing the exact
// same `lazy(() => import(...).then(...))` boilerplate.
//
// The loaders are named instead of inlined into `lazy()` so the *same*
// dynamic import can also be triggered manually — see `preloadConfigStep`
// below. Calling `import()` again for a module that's already loading (or
// loaded) resolves from the module cache; it doesn't refetch.
const loadLocationStep = () =>
  import('./LocationStep').then((m) => ({ default: m.LocationStep }));

const loadConfigStep = () =>
  import('./ConfigStep').then((m) => ({ default: m.ConfigStep }));

export const LazyLocationStep = lazy(loadLocationStep);
export const LazyConfigStep = lazy(loadConfigStep);

// Lets a wizard shell warm the *next* step's chunk while the user is still
// filling out the current one, so by the time they advance, `lazy()` has
// something already in cache instead of suspending on a fresh fetch.
export const preloadLocationStep = loadLocationStep;
export const preloadConfigStep = loadConfigStep;
