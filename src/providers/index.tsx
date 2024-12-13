import { PropsWithChildren } from 'react';
import ReactQueryProvider from './ReactQueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <ReactQueryDevtools />
      {children}
    </ReactQueryProvider>
  );
}
