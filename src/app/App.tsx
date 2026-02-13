import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { DirectionProvider } from '@radix-ui/react-direction';

import { useDocumentDirection } from '@/shared/lib';
import ThemeProvider from './providers/ThemeProvider';
import AppRouter from './router/AppRouter';
import { queryClient } from '@/shared/api';
import { store } from './store/store';

import '@/shared/config/i18n';
import { AuthLoader } from './providers/AuthProvider';

function App() {
  const { dir } = useDocumentDirection();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <DirectionProvider dir={dir}>
            <AuthLoader>
              <AppRouter />
            </AuthLoader>
          </DirectionProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
