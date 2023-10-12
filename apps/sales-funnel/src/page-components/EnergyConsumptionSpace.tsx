import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@src/components/container/Container';
import { CustomRadioGroupField } from '@src/components/forms/CustomRadioGroupField';
import { Form } from '@src/components/forms/Form';
import { BulbSvg } from '@src/components/svgs/BulbSvg';
import { ElectricalSvg } from '@src/components/svgs/ElectricalSvg';
import { FireSvg } from '@src/components/svgs/FireSvg';
import { HeatpumpSvg } from '@src/components/svgs/HeatpumpSvg';
import { FlowData, useFlowStore } from '@src/store/flow';
import Image from 'next/image';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'ui/buttons/Button';
import {
  type Option as RadioGroupOption,
} from 'ui/radio-group/CustomRadioGroup';
import { NoteText } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z } from 'zod';

import ConsumptionIllustration from '../../public/ConsumptionIllustration.webp';

const options: RadioGroupOption<FlowData['primarySpaceHeating']>[] = [
  { name: 'Electrical', value: 'electrical', element: <ElectricalSvg /> },
  { name: 'Heatpump', value: 'heatpump', element: <HeatpumpSvg /> },
  {
    name: 'Oil, Gas, Wood, Remote, Other',
    value: 'other',
    element: <FireSvg />,
  },
];

const EnergyConsumptionSpaceSchema = z.object({
  primarySpaceHeating: z.enum(["electrical", "heatpump", "other"]),
});

type EnergyConsumptionSpaceType = z.infer<typeof EnergyConsumptionSpaceSchema>;

export const EnergyConsumptionSpace = () => {
  const { next, setData, back, data } = useFlowStore();

  const methods = useForm<EnergyConsumptionSpaceType>({
    resolver: zodResolver(EnergyConsumptionSpaceSchema),
    defaultValues: {
      primarySpaceHeating: data.primarySpaceHeating,
    }
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<EnergyConsumptionSpaceType> = async (data, e) => {
    const { primarySpaceHeating } = data;
    setData({ primarySpaceHeating });
    next();
  }

  return (
    <Container
      clippedTitle
      leftSection={
        <Image
          fill
          className="object-cover object-right-bottom"
          alt="Home with solar panels"
          sizes="50vw"
          src={ConsumptionIllustration.src}
        />
      }
      title="Energy consumption"
    >
      <Form className='flex flex-1 flex-col justify-between gap-16 bg-white' onSubmit={handleSubmit(onSubmit)} {...methods}>

      <div className="z-10 flex flex-col gap-7">
        <CustomRadioGroupField
          name="primarySpaceHeating"
          label="How do you primarily heat your house?"
          options={options}
        />
        <NoteText>
          This helps us establish energy usage patterns as well as estimate kWh
          usage.
        </NoteText>
      </div>

      <div className="z-10 flex flex-col justify-between gap-4 md:flex-row-reverse">
        <Button
          variant="main-orange"
          className="px-10"
          type="submit"
        >
          Next
        </Button>
        <Button variant="additional-white" className="px-10" onClick={back}>
          Back
        </Button>
      </div>
      </Form>

      <BulbSvg className={clsxm('absolute bottom-24 left-14')} />
    </Container>
  );
};
