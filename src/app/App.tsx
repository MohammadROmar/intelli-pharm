import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { DirectionProvider } from '@radix-ui/react-direction';

import ThemeProvider from './providers/ThemeProvider';
import AppRouter from './router/AppRouter';
import { AuthLoader } from './providers/AuthProvider';
import { store } from './store/store';
import { useDocumentDirection } from '@/shared/lib';
import { queryClient } from '@/shared/api';

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
