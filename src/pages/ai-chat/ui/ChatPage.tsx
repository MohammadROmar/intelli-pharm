import { useTranslation } from 'react-i18next';

import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import { useChat } from '../model/useChat';

export default function ChatPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });

  const { messages, isLoading, error, send } = useChat();

  const pageTitle = `${t('pageTitle')} - IntelliPharma`;

  return (
    <>
      <title>{pageTitle}</title>

      <div className="grid h-full grid-rows-[1fr_auto] overflow-y-hidden">
        <div className="thin-scrollbar mx-auto flex h-full min-h-0 w-full flex-col overflow-y-auto">
          <ChatMessageList
            messages={messages}
            isLoading={isLoading}
            error={error}
          />
        </div>

        <ChatInput onSend={send} isLoading={isLoading} />
      </div>
    </>
  );
}
