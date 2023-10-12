import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@src/components/container/Container';
import { CustomRadioGroupField } from '@src/components/forms/CustomRadioGroupField';
import { Form } from '@src/components/forms/Form';
import { BulbSvg } from '@src/components/svgs/BulbSvg';
import { FivePersonSvg } from '@src/components/svgs/FivePersonSvg';
import { FourPersonSvg } from '@src/components/svgs/FourPersonSvg';
import { OnePersonSvg } from '@src/components/svgs/OnePersonSvg';
import { SixPersonSvg } from '@src/components/svgs/SixPersonSvg';
import { ThreePersonSvg } from '@src/components/svgs/ThreePersonSvg';
import { TwoPersonSvg } from '@src/components/svgs/TwoPersonSvg';
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

const options: RadioGroupOption<FlowData['peopleInHousehold']>[] = [
  { name: '1', value: '1', element: <OnePersonSvg /> },
  { name: '2', value: '2', element: <TwoPersonSvg /> },
  { name: '3', value: '3', element: <ThreePersonSvg /> },
  { name: '4', value: '4', element: <FourPersonSvg /> },
  { name: '5', value: '5', element: <FivePersonSvg /> },
  { name: '5+', value: '5+', element: <SixPersonSvg /> },
];

const EnergyConsumptionPersonsSchema = z.object({
  peopleInHousehold: z.enum(["1", "2", "3", "4", "5", "5+"]),
});

type EnergyConsumptionPersonsType = z.infer<typeof EnergyConsumptionPersonsSchema>;

export const EnergyConsumptionPersons = () => {
  const { next, setData, back, data } = useFlowStore();

  const methods = useForm<EnergyConsumptionPersonsType>({
    resolver: zodResolver(EnergyConsumptionPersonsSchema),
    defaultValues: {
      peopleInHousehold: data.peopleInHousehold,
    }
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<EnergyConsumptionPersonsType> = async (data) => {
    const { peopleInHousehold } = data;
    setData({ peopleInHousehold });
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
      <Form  className='container containerPadding' onSubmit={handleSubmit(onSubmit)} {...methods}>
      <div className="z-10 flex flex-col gap-7">
        <CustomRadioGroupField
          name="peopleInHousehold"
          label="How many people live in your household?"
          options={options}
        />
        <NoteText>This will help us estimate your kWh usage per year.</NoteText>
      </div>

      <div className="buttonContainer">
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
      <BulbSvg className={clsxm('absolute -left-12 bottom-24 ')} />
    </Form>

    </Container>
  );
};
