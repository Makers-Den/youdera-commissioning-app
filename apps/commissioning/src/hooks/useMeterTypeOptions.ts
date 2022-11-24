import { useMemo } from 'react';
import { useIntl } from 'react-intl';

export const useMeterTypeOptions = () => {
  const intl = useIntl();
  return useMemo(
    () => [
      {
        key: 'generation',
        label: intl.formatMessage({
          defaultMessage: 'Generation',
        }),
        icon: 'Industry',
      },
      {
        key: 'import-export',
        label: intl.formatMessage({
          defaultMessage: 'Import/Export',
        }),
        icon: 'Download',
      },
      {
        key: 'consumption',
        label: intl.formatMessage({
          defaultMessage: 'Consumption',
        }),
        icon: 'Plug',
      },
      {
        key: 'own-consumption',
        label: intl.formatMessage({
          defaultMessage: 'Own consumption',
        }),
        icon: 'Lightbulb',
      },
    ],
    [intl],
  );
};
