import { useInvertersQuery } from '@src/api/youdera/hooks/inverters/hooks';
import { useIntl } from 'react-intl';
import { SelectOption } from 'ui/select/Select';
import { Typography } from 'ui/typography/Typography';

import { SelectField } from './SelectField';

export type InverterInstancesSelectFieldProps = {
  siteId: number;
};

export function InverterInstancesSelectField({
  siteId,
}: InverterInstancesSelectFieldProps) {
  const intl = useIntl();

  const inverterQuery = useInvertersQuery(siteId);

  return (
    <SelectField
      name="inverter"
      placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
      label={intl.formatMessage({ defaultMessage: 'Inverter' })}
      compareValueBy="id"
    >
      {(inverterQuery.data || []).map(value => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { name, model_name, serial_number } = value;
        return (
          <SelectOption value={{ ...value, label: `${name} - ${model_name}` }}>
            {() => (
              <>
                <Typography variant="body" weight="medium">
                  {name} - {model_name}
                </Typography>
                <Typography variant="label">SN: {serial_number}</Typography>
              </>
            )}
          </SelectOption>
        );
      })}
    </SelectField>
  );
}
