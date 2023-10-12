import { zodResolver } from '@hookform/resolvers/zod';
import { BoxesRadioGroupField } from '@src/components/forms/BoxesRadioGroupField';
import { LayoutContainer } from '@src/components/container/LayoutContainer';
import { Form } from '@src/components/forms/Form';
import { AgriculturalSvg } from '@src/components/svgs/AgriculturalSvg';
import { CommercialSvg } from '@src/components/svgs/CommercialSvg';
import { HomeSvg } from '@src/components/svgs/HomeSvg';
import { IndustrialSvg } from '@src/components/svgs/IndustrialSvg';
import { FlowData, useFlowStore, views } from '@src/store/flow';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'ui/buttons/Button';
import { type Option as RadioOption } from 'ui/radio-group/BoxesRadioGroup';
import clsxm from 'ui/utils/clsxm';
import { z } from 'zod';

import { SunSvg } from '../components/svgs/SunSvg';
import Illustration from '../../public/Illustration.webp';

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

const BuildingTypeSchema = z.object({
  buildingType: z.enum(['home', 'industrial', 'agricultural', 'commercial']),
});

type BuildingTypeType = z.infer<typeof BuildingTypeSchema>;

export const BuildingType = () => {
  const { next, setData, setViews, data } = useFlowStore();

  const methods = useForm<BuildingTypeType>({
    resolver: zodResolver(BuildingTypeSchema),
    defaultValues: {
      buildingType: data.buildingType,
    },
  });

  const { handleSubmit } = methods;

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
    <LayoutContainer
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
      <Form
        className="containerPadding container"
        onSubmit={handleSubmit(onSubmit)}
        {...methods}
      >
        <BoxesRadioGroupField
          name="buildingType"
          label="Start by telling us what sort of building it is you intend to install solar panels on."
          className="grid-cols-2"
          options={options}
          onChange={value => handleChange(value)}
        />
        <div className="buttonContainer">
          <Button type="submit" variant="main-orange" className="px-10">
            Next
          </Button>
        </div>
        <SunSvg
          className={clsxm('animate-spin-slow absolute -bottom-44 -right-32')}
        />
      </Form>
    </LayoutContainer>
  );
};
