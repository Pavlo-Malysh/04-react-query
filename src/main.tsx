import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './index.css'
import App from './components/App/App.tsx'
// Нормалізація стилів
import "modern-normalize";

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>

)
