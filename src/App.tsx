import { QueryClientProvider } from '@tanstack/react-query';
import { DirectionProvider } from '@radix-ui/react-direction';

import { useDocumentDirection } from './shared/hooks/useDocumentDirection';
import ThemeProvider from './shared/context/ThemeProvider';
import Router from './core/router/Router';
import { queryClient } from './shared/api/queryClient';
import './core/i18n';

function App() {
  const { dir } = useDocumentDirection();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DirectionProvider dir={dir}>
          <Router />
        </DirectionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
