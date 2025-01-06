import { Toaster } from '@/components/ui/toaster';
import Providers from '@/providers';
import { Outlet } from 'react-router';
import { Navbar } from './Navbar';

export default function Layout(): JSX.Element {
  return (
    <Providers>
      <div className="flex flex-col prose mx-auto min-h-screen">
        <Navbar />
        <main className="p-5 flex-1">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </Providers>
  );
}
