import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { ApiError } from '@/shared/api';
import { isEmptyAssistantResponseError } from './chatErrors';

const ERROR_TOAST_DURATION = 4_000;

export function useChatNotifications() {
  const { t } = useTranslation('chat');

  const showSendError = useCallback(
    (error: ApiError) => {
      const isEmptyResponse = isEmptyAssistantResponseError(error);

      toast.error(
        t(isEmptyResponse ? 'emptyResponseErrorTitle' : 'sendErrorTitle'),
        {
          description: t(
            isEmptyResponse
              ? 'emptyResponseErrorDescription'
              : 'sendErrorDescription',
          ),
          duration: ERROR_TOAST_DURATION,
        },
      );
    },
    [t],
  );

  const showConversationError = useCallback(() => {
    toast.error(t('conversationErrorTitle'), {
      description: t('conversationErrorDescription'),
      duration: ERROR_TOAST_DURATION,
    });
  }, [t]);

  return { showSendError, showConversationError };
}
