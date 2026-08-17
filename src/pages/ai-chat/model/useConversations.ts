import { useQuery } from '@tanstack/react-query';

import { getConversations } from './chatApi';
import { chatQueryKeys } from './chatQueryKeys';

export function useConversations() {
  return useQuery({
    queryKey: chatQueryKeys.list(undefined),
    queryFn: ({ signal }) => getConversations(signal),
    staleTime: 60_000,
  });
}
