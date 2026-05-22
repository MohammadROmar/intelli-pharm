import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { DirectionProvider } from '@radix-ui/react-direction';

import { RootErrorFallback } from './error/RootErrorFallback';
import ThemeProvider from './providers/ThemeProvider';
import AppRouter from './providers/router/ui/AppRouter';
import { AuthLoader } from './providers/AuthProvider';
import { store } from './store/store';
import { ErrorBoundary, useDocumentDirection } from '@/shared/lib';
import { queryClient } from '@/shared/api';
import { Logo } from '@/shared/ui/index.initial';

function I18nLoader() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <Logo withColors className="size-12" />
    </div>
  );
}

function AppInner() {
  const { dir } = useDocumentDirection();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <DirectionProvider dir={dir}>
            <Suspense fallback={<I18nLoader />}>
              <AuthLoader>
                <AppRouter />
              </AuthLoader>
            </Suspense>
          </DirectionProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <AppInner />
    </ErrorBoundary>
  );
}

export default App;
