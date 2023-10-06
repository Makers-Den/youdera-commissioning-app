import { Container } from '@src/components/container/Container';
import { AgriculturalSvg } from '@src/components/svgs/AgriculturalSvg';
import { CommercialSvg } from '@src/components/svgs/CommercialSvg';
import { HomeSvg } from '@src/components/svgs/HomeSvg';
import { IndustrialSvg } from '@src/components/svgs/IndustrialSvg';
import Image from 'next/image';
import {
  type Option as RadioOption,
  CustomRadioGroup,
} from 'ui/radio-group/CustomRadioGroup';
import { BodyText } from 'ui/typography/Typography';
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

export const BuildingType = () => (
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
    <div className="relative flex flex-1 flex-col justify-between overflow-hidden bg-white p-5 md:px-24 md:py-7">
      <div className="z-10 flex flex-col items-center gap-20 md:items-start">
        <CustomRadioGroup
          label={`Start by telling us what sort of building it is you intend to install solar panels on.`}
          options={options}
          className="grid-cols-2"
        />
      </div>
      <SunSvg
        className={clsxm('animate-spin-slow absolute -bottom-44 -right-32')}
      />
    </div>
  </Container>
);
