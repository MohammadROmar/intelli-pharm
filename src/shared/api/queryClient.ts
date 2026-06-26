import { QueryClient } from '@tanstack/react-query';

import { getBackoffDelay } from '../lib';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: getBackoffDelay,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});
