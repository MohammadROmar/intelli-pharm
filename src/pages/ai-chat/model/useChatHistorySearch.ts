import { useDeferredValue, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { buildConversationGroups } from './chatHistory';
import type { Conversation } from './chatTypes';

type UseChatHistorySearchOptions = {
  conversations: Conversation[];
};

export function useChatHistorySearch({
  conversations,
}: UseChatHistorySearchOptions) {
  const { t, i18n } = useTranslation('chat');
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const locale = i18n.language;

  const groupLabels = useMemo(
    () => ({
      today: t('historyGroups.today'),
      yesterday: t('historyGroups.yesterday'),
      previous7Days: t('historyGroups.previous7Days'),
      older: t('historyGroups.older'),
    }),
    [t],
  );
  const untitledConversation = t('untitledConversation');

  const groups = useMemo(
    () =>
      buildConversationGroups({
        conversations,
        search: deferredSearch,
        locale,
        labels: groupLabels,
        untitledConversation,
      }),
    [conversations, deferredSearch, groupLabels, locale, untitledConversation],
  );

  return {
    search,
    setSearch,
    isSearchPending: search !== deferredSearch,
    groups,
  };
}
