import { lazy } from 'react';

const loadLocationStep = () =>
  import('./LocationStep').then((m) => ({ default: m.LocationStep }));

const loadConfigStep = () =>
  import('./ConfigStep').then((m) => ({ default: m.ConfigStep }));

export const LazyLocationStep = lazy(loadLocationStep);
export const LazyConfigStep = lazy(loadConfigStep);

export const preloadLocationStep = loadLocationStep;
export const preloadConfigStep = loadConfigStep;
