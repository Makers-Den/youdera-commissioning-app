import { Container } from '@src/components/container/Container';
import { zodResolver } from '@hookform/resolvers/zod';
import { AgriculturalSvg } from '@src/components/svgs/AgriculturalSvg';
import { CommercialSvg } from '@src/components/svgs/CommercialSvg';
import { HomeSvg } from '@src/components/svgs/HomeSvg';
import { IndustrialSvg } from '@src/components/svgs/IndustrialSvg';
import { FlowData, useFlowStore, views } from '@src/store/flow';
import Image from 'next/image';
import { Button } from 'ui/buttons/Button';
import {
  type Option as RadioOption,
  CustomRadioGroup,
} from 'ui/radio-group/CustomRadioGroup';
import clsxm from 'ui/utils/clsxm';

import { SunSvg } from '../components/svgs/SunSvg';
import Illustration from '../../public/Illustration.webp';
import { Form } from '@src/components/forms/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CustomRadioGroupField } from '@src/components/forms/CustomRadioGroupField';

const options: RadioOption<FlowData['buildingType']>[] = [
  {
    name: 'Single or Multi-family home',
    value: 'home',
    element: <HomeSvg />,
  },
  {
    name: 'Industrial',
    value: 'industrial',
    element: <IndustrialSvg />,
  },
  {
    name: 'Agricultural',
    value: 'agricultural',
    element: <AgriculturalSvg />,
  },
  {
    name: 'Commercial',
    value: 'commercial',
    element: <CommercialSvg />,
  },
];

export const BuildingTypeSchema = z.object({
  buildingType: z.enum(["home" , "industrial" , "agricultural" , "commercial"]),
});

export type BuildingTypeType = z.infer<typeof BuildingTypeSchema>;



export const BuildingType = () => {
  const { next, setData, setViews, data } = useFlowStore();

  const methods = useForm<BuildingTypeType>({
    resolver: zodResolver(BuildingTypeSchema),
    // defaultValues
  });

  const { handleSubmit, formState, reset } = methods;
  

  const handleChange = (buildingType: FlowData['buildingType']) => {
    setData({ buildingType });
    if (buildingType === 'industrial') {
      setViews({
        buildingType: {
          next: 'contactSales',
          previous: null,
        },
      });
    } else {
      setViews({
        buildingType: views.buildingType,
      });
    }

    if (buildingType === 'commercial') {
      setViews({
        roofSummary: {
          previous: 'addressInput',
          next: 'energyConsumptionCommercial',
        },
      });
    } else {
      setViews({
        roofSummary: views.roofSummary,
      });
    }
  };

  const onSubmit: SubmitHandler<BuildingTypeType> = async (data, e) => {
    e?.preventDefault();
    const { buildingType } = data;

    setData({ buildingType });

    if (buildingType === 'industrial') {
      setViews({
        buildingType: {
          next: 'contactSales',
          previous: null,
        },
      });
    } else {
      setViews({
        buildingType: views.buildingType,
      });
    }

    if (buildingType === 'commercial') {
      setViews({
        roofSummary: {
          previous: 'addressInput',
          next: 'energyConsumptionCommercial',
        },
      });
    } else {
      setViews({
        roofSummary: views.roofSummary,
      });
    }

    next();
  };

  return (
    <Container
      clippedTitle
      leftSection={
        <Image
          fill
          className="object-cover object-right-bottom"
          alt="Home with solar panels"
          sizes="50vw"
          src={Illustration.src}
        />
      }
      title="Get an offer for solar
  panels in 5 minutes"
      subTitle="Estimate how much you can save by installing solar on your property."
    >
      {/* TODO do something with the fact that we have to reapply these on form ? */}
      <Form className='z-10 flex flex-col justify-between gap-16' onSubmit={handleSubmit(onSubmit)} {...methods}>
        <CustomRadioGroupField
          name="buildingType"
          label="Start by telling us what sort of building it is you intend to install solar panels on."
          className="grid-cols-2"
          options={options}
          onChange={value => handleChange(value)}
        />
        <div className="z-10 flex flex-col justify-between gap-4 md:flex-row-reverse">
          <Button
            type='submit'
            variant="main-orange"
            className="px-10"
          >
            Next
          </Button>
        </div>
      </Form>
      <SunSvg
        className={clsxm('animate-spin-slow absolute -bottom-44 -right-32')}
      />
    </Container>
  );
};
