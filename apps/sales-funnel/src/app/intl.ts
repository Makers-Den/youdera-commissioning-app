'server-only';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createIntl } from '@formatjs/intl';
import { currentLocale } from 'next-i18n-router';

export default async function getIntl() {
  const locale = currentLocale() || 'en';

  return createIntl({
    locale,
    messages: (await import(`../../content/compiled-locales/${locale}.json`))
      .default,
  });
}
