import type { Conversation } from './chatTypes';

export type ConversationGroupKey =
  | 'today'
  | 'yesterday'
  | 'previous7Days'
  | 'older';

export type ConversationGroup = {
  key: ConversationGroupKey;
  label: string;
  conversations: Conversation[];
};

type ConversationGroupLabels = Record<ConversationGroupKey, string>;

type BuildConversationGroupsOptions = {
  conversations: Conversation[];
  search: string;
  locale: string;
  labels: ConversationGroupLabels;
  untitledConversation: string;
};

const GROUP_ORDER: ConversationGroupKey[] = [
  'today',
  'yesterday',
  'previous7Days',
  'older',
];
const MILLISECONDS_PER_DAY = 86_400_000;

function getConversationGroup(dateValue: string): ConversationGroupKey {
  const updatedAt = new Date(dateValue);
  if (Number.isNaN(updatedAt.getTime())) return 'older';

  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const conversationDay = Date.UTC(
    updatedAt.getFullYear(),
    updatedAt.getMonth(),
    updatedAt.getDate(),
  );
  const daysAgo = Math.floor((today - conversationDay) / MILLISECONDS_PER_DAY);

  if (daysAgo <= 0) return 'today';
  if (daysAgo === 1) return 'yesterday';
  if (daysAgo < 7) return 'previous7Days';
  return 'older';
}

function getTimestamp(value: string) {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function buildConversationGroups({
  conversations,
  search,
  locale,
  labels,
  untitledConversation,
}: BuildConversationGroupsOptions): ConversationGroup[] {
  const normalizedSearch = search.trim().toLocaleLowerCase(locale);
  const grouped = new Map<ConversationGroupKey, Conversation[]>();
  const sortedConversations = [...conversations].sort(
    (a, b) => getTimestamp(b.updated_at) - getTimestamp(a.updated_at),
  );

  for (const conversation of sortedConversations) {
    const title = conversation.title?.trim() || untitledConversation;
    if (
      normalizedSearch &&
      !title.toLocaleLowerCase(locale).includes(normalizedSearch)
    ) {
      continue;
    }

    const key = getConversationGroup(conversation.updated_at);
    const existing = grouped.get(key);
    if (existing) existing.push(conversation);
    else grouped.set(key, [conversation]);
  }

  return GROUP_ORDER.flatMap((key) => {
    const items = grouped.get(key);
    return items ? [{ key, label: labels[key], conversations: items }] : [];
  });
}
