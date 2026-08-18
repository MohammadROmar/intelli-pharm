import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

import { chatQueryKeys } from '../model/chatQueryKeys';
import type { Conversation } from '../model/chatTypes';

type DeleteConversationModalProps = {
  conversation: Conversation | null;
  onClose: () => void;
  onDeleted?: (conversationId: number) => void;
};

export function DeleteConversationModal({
  conversation,
  onClose,
  onDeleted,
}: DeleteConversationModalProps) {
  const { t } = useTranslation('chat');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useDeleteEntity({
    item: 'conversations',
    module: 'llm',
    translationKey: 'conversation',
  });

  function handleConfirm() {
    if (!conversation) return;

    mutate(conversation.id, {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: chatQueryKeys.list(undefined),
        });
        onClose();
        onDeleted?.(conversation.id);
      },
    });
  }

  return (
    <DeleteModal
      hasItem={!!conversation}
      label={conversation?.title?.trim() || t('untitledConversation')}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
