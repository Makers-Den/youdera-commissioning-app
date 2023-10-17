import { zodResolver } from '@hookform/resolvers/zod';
import { LayoutContainer } from '@src/components/container/LayoutContainer';
import { BoxesRadioGroupField } from '@src/components/forms/BoxesRadioGroupField';
import { Form } from '@src/components/forms/Form';
import { BulbSvg } from '@src/components/svgs/BulbSvg';
import { ElectricalSvg } from '@src/components/svgs/ElectricalSvg';
import { FireSvg } from '@src/components/svgs/FireSvg';
import { HeatpumpSvg } from '@src/components/svgs/HeatpumpSvg';
import { FlowData, useFlowStore } from '@src/store/flow';
import Image from 'next/image';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { type Option as RadioGroupOption } from 'ui/radio-group/BoxesRadioGroup';
import { NoteText } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z } from 'zod';

import ConsumptionIllustration from '../../public/ConsumptionIllustration.webp';

const EnergyConsumptionSpaceSchema = z.object({
  primarySpaceHeating: z.enum(['electrical', 'heatpump', 'other']),
});

type EnergyConsumptionSpaceType = z.infer<typeof EnergyConsumptionSpaceSchema>;

export const EnergyConsumptionSpace = () => {
  const intl = useIntl();
  const { next, setData, back, data } = useFlowStore();

  const options: RadioGroupOption<FlowData['primarySpaceHeating']>[] = [
    {
      name: intl.formatMessage({ defaultMessage: 'Electrical' }),
      value: 'electrical',
      element: <ElectricalSvg />,
    },
    {
      name: intl.formatMessage({ defaultMessage: 'Heatpump' }),
      value: 'heatpump',
      element: <HeatpumpSvg />,
    },
    {
      name: intl.formatMessage({
        defaultMessage: 'Oil, Gas, Wood, Remote, Other',
      }),
      value: 'other',
      element: <FireSvg />,
    },
  ];

  const methods = useForm<EnergyConsumptionSpaceType>({
    resolver: zodResolver(EnergyConsumptionSpaceSchema),
    defaultValues: {
      primarySpaceHeating: data.primarySpaceHeating,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<EnergyConsumptionSpaceType> = async data => {
    const { primarySpaceHeating } = data;
    setData({ primarySpaceHeating });
    next();
  };

  return (
    <LayoutContainer
      clippedTitle
      leftSection={
        <Image
          fill
          className="object-cover object-right-bottom"
          alt={intl.formatMessage({ defaultMessage: 'Home with solar panels' })}
          sizes="50vw"
          src={ConsumptionIllustration.src}
        />
      }
      title={intl.formatMessage({ defaultMessage: 'Energy consumption' })}
    >
      <Form
        className="containerPadding container"
        onSubmit={handleSubmit(onSubmit)}
        {...methods}
      >
        <div className="z-10 flex flex-col gap-7">
          <BoxesRadioGroupField
            name="primarySpaceHeating"
            label={intl.formatMessage({
              defaultMessage: 'How do you primarily heat your house?',
            })}
            options={options}
          />
          <NoteText>
            {intl.formatMessage({
              defaultMessage: ` This helps us establish energy usage patterns as well as estimate
            kWh usage.`,
            })}
          </NoteText>
        </div>

        <div className="buttonContainer md:max-w-container">
          <Button variant="main-orange" className="px-10" type="submit">
            {intl.formatMessage({ defaultMessage: 'Next' })}
          </Button>
          <Button variant="additional-white" className="px-10" onClick={back}>
            {intl.formatMessage({ defaultMessage: 'Back' })}
          </Button>
        </div>
        <BulbSvg className={clsxm('absolute bottom-24 left-14')} />
      </Form>
    </LayoutContainer>
  );
};
