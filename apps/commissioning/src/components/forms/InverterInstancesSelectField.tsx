import { useInvertersQuery } from '@src/integrations/youdera/inverterApiHooks';
import { useMemo } from 'react';
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

  const options: SelectOption[] = useMemo(
    () =>
      (inverterQuery.data || []).map(
        ({ id, name, model_name, serial_number }) => ({
          key: id.toString(),
          selectedLabel: model_name,
          label: model_name || (
            //TODO somthing is up with react nodes as a options
            <>
              <Typography variant="body" weight="medium">
                {name} - {model_name}
              </Typography>
              <Typography variant="label">SN: {serial_number}</Typography>
            </>
          ),
        }),
      ),

    [inverterQuery.data],
  );

  return (
    <SelectField
      name="inverter"
      placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
      label={intl.formatMessage({ defaultMessage: 'Inverter' })}
      options={options}
    />
  );
}
