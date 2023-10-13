import { LocalizationProvider } from '@src/components/LocalizationProvider';
import { notFound } from 'next/navigation';

import '../globals.css';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const locale = params.locale || 'en';

  let messages;

  try {
    messages = (
      await import(`../../../content/compiled-locales/${locale}.json`)
    ).default;
  } catch (error) {
    notFound();
  }

  return (
    <LocalizationProvider messages={messages} locale={locale}>
      {children}
    </LocalizationProvider>
  );
}
