import { zodResolver } from '@hookform/resolvers/zod';
import { LayoutContainer } from '@src/components/container/LayoutContainer';
import { Form } from '@src/components/forms/Form';
import { HorizontalSelectField } from '@src/components/forms/HorizontalSelectField';
import { InputField } from '@src/components/forms/InputField';
import { TimeRangeInputField } from '@src/components/forms/TimeRangeInputField';
import { BulbSvg } from '@src/components/svgs/BulbSvg';
import { FlowData, useFlowStore } from '@src/store/flow';
import Image from 'next/image';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'ui/buttons/Button';
import { type OptionType } from 'ui/select/HorizontalSelect';
import { BodyText, NoteText } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z } from 'zod';

import ConsumptionIllustration from '../../public/ConsumptionIllustration.webp';

const options: OptionType<FlowData["openingDays"][number]>[] = [
  {name:'M', value:'monday'},
  {name:'T', value:"tuesday"},
  {name:'W', value:"wednesday"},
  {name:'T', value:"thursday"},
  {name:'F', value:"friday"},
  {name:'S', value:"saturday"},
  {name:'S', value:"sunday"}
]

const EnergyConsumptionSchema = z.object({
  yearlyConsumption: z.string().min(1),
  openingDays: z.array(
    z.object({name: z.string(), value: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"])}))
  .min(1, {message: "Please select at least one day"}),
  openingTimes: z.object({
    from: z.number(),
    to: z.number()
  })
});

type EnergyConsumptionType = z.infer<typeof EnergyConsumptionSchema>;

export const EnergyConsumptionCommercial = () => {
  const { next, setData, back, data } = useFlowStore();
  const methods = useForm<EnergyConsumptionType>({
    resolver: zodResolver(EnergyConsumptionSchema),
    defaultValues: {
      yearlyConsumption: data.yearlyConsumption,
      openingDays: options.filter(option => data.openingDays?.includes(option.value)),
      openingTimes: {from: data.openingTimes?.from || 8, to:  data.openingTimes?.to || 16} 
    }
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<EnergyConsumptionType> = async (data) => {
    const {openingDays, openingTimes,yearlyConsumption} = data;
    setData({
      openingDays:openingDays.map(option => option.value),
      openingTimes,
      yearlyConsumption
    })    
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
      <Form className='container containerPadding' onSubmit={handleSubmit(onSubmit)} {...methods}>
      <div className="z-10 flex flex-col gap-7 md:max-w-container">
        <BodyText>
          Please fill in the yearly kWh consumption of your commercial property.
        </BodyText>
        <InputField
          name="yearlyConsumption"
          label="Yearly kWh consumption"
          units="kWh"
          type="number"
        />
        <NoteText>
          For properties with consumption larger than 2 mWh
          <br />
          we suggest reaching out to sales directly.
        </NoteText>
        <HorizontalSelectField name="openingDays" label="Regular opening days" options={options} />
        <TimeRangeInputField name="openingTimes" />
      </div>

      <div className="buttonContainer md:max-w-container">
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

      <BulbSvg className={clsxm('absolute bottom-24 left-1/2')} />
    </LayoutContainer>
  );
};
