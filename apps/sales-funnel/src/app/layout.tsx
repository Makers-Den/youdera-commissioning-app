import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Younergy - sales funnel app',
  description: 'Younergy - sales funnel app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html lang="en">{children}</html>;
}
