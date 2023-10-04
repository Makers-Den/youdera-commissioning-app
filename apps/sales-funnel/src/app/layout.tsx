import type { Metadata } from 'next';

import './globals.css';

import { Navbar } from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Younergy - sales funnel app',
  description: 'Younergy - sales funnel app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
