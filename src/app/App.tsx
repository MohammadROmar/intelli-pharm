import { QueryClientProvider } from '@tanstack/react-query';
import { DirectionProvider } from '@radix-ui/react-direction';

import { useDocumentDirection } from '@/shared/lib';
import ThemeProvider from './providers/ThemeProvider';
import AppRouter from './router/AppRouter';
import { queryClient } from '@/shared/api';

import '@/shared/config/i18n';

function App() {
  const { dir } = useDocumentDirection();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DirectionProvider dir={dir}>
          <AppRouter />
        </DirectionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
