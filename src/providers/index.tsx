import type { PropsWithChildren } from 'react';
import ReactQueryProvider from './ReactQueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Providers({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <ReactQueryProvider>
      <ReactQueryDevtools />
      {children}
    </ReactQueryProvider>
  );
}
