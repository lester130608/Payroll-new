"use client";

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';
import './globals.css'; // <-- IMPORTANTE, este es el punto clave

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {isAuthPage ? (
            <>{children}</>
          ) : (
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
