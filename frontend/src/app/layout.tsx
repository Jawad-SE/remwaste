'use client';

import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
          <ToastContainer aria-label="Notification Messages" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
