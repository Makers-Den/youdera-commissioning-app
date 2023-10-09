import { Container } from '@src/components/container/Container';
import { AgriculturalSvg } from '@src/components/svgs/AgriculturalSvg';
import { CommercialSvg } from '@src/components/svgs/CommercialSvg';
import { HomeSvg } from '@src/components/svgs/HomeSvg';
import { IndustrialSvg } from '@src/components/svgs/IndustrialSvg';
import { useFlowStore, views } from '@src/store/flow';
import Image from 'next/image';
import { Button } from 'ui/buttons/Button';
import {
  type Option as RadioOption,
  CustomRadioGroup,
} from 'ui/radio-group/CustomRadioGroup';
import clsxm from 'ui/utils/clsxm';

import { SunSvg } from '../components/svgs/SunSvg';
import Illustration from '../../public/Illustration.webp';

const options: RadioOption[] = [
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

export const BuildingType = () => {
  const { next, setData, setViews, data } = useFlowStore();

  const handleChange = (buildingType: string) => {
    setData({ buildingType });
    //TODO type this
    if (buildingType === 'industrial') {
      setViews({
        buildingType: {
          next: 'contactSales',
          previous: null,
        },
      });
    } else {
      setViews({ buildingType: views.buildingType });
    }
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
      <CustomRadioGroup
        label="Start by telling us what sort of building it is you intend to install solar panels on."
        options={options}
        onChange={handleChange}
        className="grid-cols-2"
        defaultValue={data.buildingType as string | undefined}
      />
      <div className="z-10 flex flex-col justify-between gap-4 md:flex-row-reverse">
        <Button
          variant="main-orange"
          className="px-10"
          onClick={next}
          disabled={!data.buildingType}
        >
          Next
        </Button>
      </div>
      <SunSvg
        className={clsxm('animate-spin-slow absolute -bottom-44 -right-32')}
      />
    </Container>
  );
};
