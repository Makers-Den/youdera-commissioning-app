import { useIntl } from "react-intl";
import { SelectOption } from "ui/select/Select";

export const useMeterTypeOptions = (): SelectOption[] => {
  const intl = useIntl();
  return [
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
  ]
}