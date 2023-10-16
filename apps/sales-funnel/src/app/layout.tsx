import { LocalizationProvider } from '@src/components/LocalizationProvider';
import { Navbar } from '@src/components/Navbar';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import './globals.css';

export const metadata: Metadata = {
  title: 'Younergy - sales funnel app',
  description: 'Younergy - sales funnel app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = 'en';

  let messages;

  try {
    messages = (await import(`../../content/compiled-locales/${locale}.json`))
      .default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className="flex min-h-screen flex-col bg-white">
        <LocalizationProvider messages={messages} locale={locale}>
          <Navbar />
          {children}
        </LocalizationProvider>
      </body>
    </html>
  );
}
