'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState, useEffect } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    // Force dark mode
    const html = document.documentElement;
    html.classList.add('dark');
    html.style.colorScheme = 'dark';
    console.log('Dark mode applied:', html.classList.contains('dark'));
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
} 