import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { IconName } from 'ui/svg-icons/SvgIcon';

export const useMeterTypeOptions = () => {
  const intl = useIntl();
  return useMemo(
    () => [
      {
        key: 'generation',
        label: intl.formatMessage({
          defaultMessage: 'Generation',
        }),
        icon: 'Industry' as IconName,
      },
      {
        key: 'import-export',
        label: intl.formatMessage({
          defaultMessage: 'Import/Export',
        }),
        icon: 'Download' as IconName,
      },
      {
        key: 'consumption',
        label: intl.formatMessage({
          defaultMessage: 'Consumption',
        }),
        icon: 'Plug' as IconName,
      },
      {
        key: 'own-consumption',
        label: intl.formatMessage({
          defaultMessage: 'Own consumption',
        }),
        icon: 'Lightbulb' as IconName,
      },
    ],
    [intl],
  );
};
