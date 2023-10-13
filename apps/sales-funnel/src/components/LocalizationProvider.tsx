'use client';

import { IntlProvider, MessageFormatElement } from 'react-intl';

export function LocalizationProvider({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode;
  messages?: Record<string, string> | Record<string, MessageFormatElement[]>;
  locale: string;
}) {
  return (
    <IntlProvider locale={locale} messages={messages} onError={() => null}>
      {children}
    </IntlProvider>
  );
}
