import { QueryClientProvider } from '@tanstack/react-query';

import ThemeProvider from './shared/context/ThemeProvider';
import Router from './core/router/Router';
import { queryClient } from './shared/api/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
