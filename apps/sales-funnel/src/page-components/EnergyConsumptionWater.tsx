import { zodResolver } from '@hookform/resolvers/zod';
import { LayoutContainer } from '@src/components/container/LayoutContainer';
import { BoxesRadioGroupField } from '@src/components/forms/BoxesRadioGroupField';
import { Form } from '@src/components/forms/Form';
import { BulbSvg } from '@src/components/svgs/BulbSvg';
import { ElectricalBoilerSvg } from '@src/components/svgs/ElectricalBoilerSvg';
import { FireSvg } from '@src/components/svgs/FireSvg';
import { HeatpumpBoilerSvg } from '@src/components/svgs/HeatpumpBoilerSvg';
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

const EnergyConsumptionWaterSchema = z.object({
  primaryWaterHeating: z.enum(['electrical', 'heatpump', 'other']),
});

type EnergyConsumptionWaterType = z.infer<typeof EnergyConsumptionWaterSchema>;

export const EnergyConsumptionWater = () => {
  const intl = useIntl();
  const { next, setData, back, data } = useFlowStore();

  const options: RadioGroupOption<FlowData['primaryWaterHeating']>[] = [
    {
      name: intl.formatMessage({ defaultMessage: 'Electrical Boiler' }),
      value: 'electrical',
      element: <ElectricalBoilerSvg />,
    },
    {
      name: intl.formatMessage({ defaultMessage: 'Heatpump Boiler' }),
      value: 'heatpump',
      element: <HeatpumpBoilerSvg />,
    },
    {
      name: intl.formatMessage({
        defaultMessage: 'Oil, Gas, Wood, Remote, Other',
      }),
      value: 'other',
      element: <FireSvg />,
    },
  ];

  const methods = useForm<EnergyConsumptionWaterType>({
    resolver: zodResolver(EnergyConsumptionWaterSchema),
    defaultValues: {
      primaryWaterHeating: data.primaryWaterHeating,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<EnergyConsumptionWaterType> = async data => {
    const { primaryWaterHeating } = data;
    setData({ primaryWaterHeating });
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
            name="primaryWaterHeating"
            label={intl.formatMessage({
              defaultMessage: 'How do you primarily heat your water?',
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
        <BulbSvg
          className={clsxm('absolute bottom-24 left-1/2 -translate-x-1/2')}
        />
      </Form>
    </LayoutContainer>
  );
};
