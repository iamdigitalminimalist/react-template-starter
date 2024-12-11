import { PropsWithChildren } from 'react';
import ReactQueryProvider from './ReactQueryProvider';

export default function Providers({ children }: PropsWithChildren) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
