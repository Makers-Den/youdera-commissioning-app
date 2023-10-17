import { zodResolver } from '@hookform/resolvers/zod';
import { LayoutContainer } from '@src/components/container/LayoutContainer';
import { CheckboxGroupField } from '@src/components/forms/CheckboxGroupField';
import { Form } from '@src/components/forms/Form';
import { BulbSvg } from '@src/components/svgs/BulbSvg';
import { FlowData, useFlowStore } from '@src/store/flow';
import Image from 'next/image';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { type OptionType as CheckboxOption } from 'ui/checkboxes/CheckboxGroup';
import { NoteText } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z } from 'zod';

import ConsumptionIllustration from '../../public/ConsumptionIllustration.webp';

const EnergyConsumptionBigConsumersSchema = z.object({
  bigEnergyConsumers: z
    .array(
      z.object({
        name: z.string(),
        value: z.enum([
          'sauna',
          'pool',
          'air conditioning',
          'electric vehicle',
        ]),
      }),
    )
    .min(1, { message: 'Please select at least one day' }),
});

type EnergyConsumptionBigConsumersType = z.infer<
  typeof EnergyConsumptionBigConsumersSchema
>;

export const EnergyConsumptionBigConsumers = () => {
  const intl = useIntl();
  const { next, setData, back, data } = useFlowStore();

  const options: CheckboxOption<FlowData['bigEnergyConsumers'][number]>[] = [
    {
      name: intl.formatMessage({ defaultMessage: 'Sauna' }),
      value: 'sauna',
    },
    {
      name: intl.formatMessage({ defaultMessage: 'Indoor Pool' }),
      value: 'pool',
    },
    {
      name: intl.formatMessage({ defaultMessage: 'Air Conditioning' }),
      value: 'air conditioning',
    },
    {
      name: intl.formatMessage({ defaultMessage: 'Electric Vehicle' }),
      value: 'electric vehicle',
    },
  ];

  const methods = useForm<EnergyConsumptionBigConsumersType>({
    resolver: zodResolver(EnergyConsumptionBigConsumersSchema),
    defaultValues: {
      bigEnergyConsumers: options.filter(option =>
        data.bigEnergyConsumers?.includes(option.value),
      ),
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<
    EnergyConsumptionBigConsumersType
  > = async data => {
    const { bigEnergyConsumers } = data;
    setData({
      bigEnergyConsumers: bigEnergyConsumers.map(option => option.value),
    });
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
          <CheckboxGroupField
            name="bigEnergyConsumers"
            options={options}
            label={intl.formatMessage({
              defaultMessage:
                'Do you have any of these big energy consumers in your household?',
            })}
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
      </Form>
      <BulbSvg className={clsxm('absolute bottom-24 left-1/2')} />
    </LayoutContainer>
  );
};
