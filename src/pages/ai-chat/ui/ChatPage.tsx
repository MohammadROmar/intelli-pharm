import { useChat } from '../model/useChat';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';

export default function ChatPage() {
  const { messages, isLoading, error, send } = useChat();

  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto flex min-h-0 flex-1 flex-col">
        <ChatMessageList
          messages={messages}
          isLoading={isLoading}
          error={error}
        />
      </div>

      <ChatInput onSend={send} isLoading={isLoading} />
    </div>
  );
}
