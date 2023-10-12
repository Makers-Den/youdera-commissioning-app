import { zodResolver } from '@hookform/resolvers/zod';
import { LayoutContainer } from '@src/components/container/LayoutContainer';
import { Form } from '@src/components/forms/Form';
import { InputField } from '@src/components/forms/InputField';
import { BulbSvg } from '@src/components/svgs/BulbSvg';
import { useFlowStore } from '@src/store/flow';
import Image from 'next/image';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'ui/buttons/Button';
import { BodyText, NoteText } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z } from 'zod';

import ConsumptionIllustration from '../../public/ConsumptionIllustration.webp';

const EnergyConsumptionYearlySchema = z.object({
  yearlyConsumption: z.string(),
});

type EnergyConsumptionYearlyType = z.infer<
  typeof EnergyConsumptionYearlySchema
>;

export const EnergyConsumptionYearly = () => {
  const { next, setData, back, data } = useFlowStore();

  const methods = useForm<EnergyConsumptionYearlyType>({
    resolver: zodResolver(EnergyConsumptionYearlySchema),
    defaultValues: {
      yearlyConsumption: data.yearlyConsumption,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<EnergyConsumptionYearlyType> = async data => {
    const { yearlyConsumption } = data;
    setData({ yearlyConsumption });
    next();
  };

  return (
    <LayoutContainer
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
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="container containerPadding"
        {...methods}
      >
        <div className="z-10 flex flex-col gap-7">
          <BodyText>
            We estimate your energy consumption to HARDCODED per year. If this
            not correct, please input it manually.
          </BodyText>
          <InputField
            name="yearlyConsumption"
            label="Yearly kWh consumption"
            units="kWh"
            type="number"
            className="max-w-xs"
          />
          <NoteText>Our estimate is HARDCODED kWh</NoteText>
        </div>

        <div className="buttonContainer">
          <Button variant="main-orange" className="px-10" type="submit">
            Next
          </Button>
          <Button variant="additional-white" className="px-10" onClick={back}>
            Back
          </Button>
        </div>
      </Form>
      <BulbSvg className={clsxm('absolute bottom-24 left-1/2')} />
    </LayoutContainer>
  );
};
