import { Container } from '@src/components/container/Container';
import { BulbSvg } from '@src/components/svgs/BulbSvg';
import { FivePersonSvg } from '@src/components/svgs/FivePersonSvg';
import { FourPersonSvg } from '@src/components/svgs/FourPersonSvg';
import { OnePersonSvg } from '@src/components/svgs/OnePersonSvg';
import { SixPersonSvg } from '@src/components/svgs/SixPersonSvg';
import { ThreePersonSvg } from '@src/components/svgs/ThreePersonSvg';
import { TwoPersonSvg } from '@src/components/svgs/TwoPersonSvg';
import { useFlowStore } from '@src/store/flow';
import Image from 'next/image';
import React from 'react';
import { Button } from 'ui/buttons/Button';
import {
  type Option as RadioGroupOption,
  CustomRadioGroup,
} from 'ui/radio-group/CustomRadioGroup';
import { NoteText } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

import ConsumptionIllustration from '../../public/ConsumptionIllustration.webp';

const options: RadioGroupOption[] = [
  { name: '1', value: '1', element: <OnePersonSvg /> },
  { name: '2', value: '2', element: <TwoPersonSvg /> },
  { name: '3', value: '3', element: <ThreePersonSvg /> },
  { name: '4', value: '4', element: <FourPersonSvg /> },
  { name: '5', value: '5', element: <FivePersonSvg /> },
  { name: '5+', value: '5+', element: <SixPersonSvg /> },
];

export const EnergyConsumptionPersons = () => {
  const { next, setData, back, data } = useFlowStore();

  const handleChange = (peopleInHousehold: string) => {
    setData({ peopleInHousehold });
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
          src={ConsumptionIllustration.src}
        />
      }
      title="Energy consumption"
    >
      <div className="z-10 flex flex-col gap-7">
        <CustomRadioGroup
          label="How many people live in your household?"
          options={options}
          onChange={handleChange}
        />
        <NoteText>This will help us estimate your kWh usage per year.</NoteText>
      </div>

      <div className="z-10 flex flex-col justify-between gap-4 md:flex-row-reverse">
        <Button
          variant="main-orange"
          className="px-10"
          onClick={next}
          disabled={!data.peopleInHousehold}
        >
          Next
        </Button>
        <Button variant="additional-white" className="px-10" onClick={back}>
          Back
        </Button>
      </div>

      <BulbSvg className={clsxm('absolute -left-12 bottom-24 ')} />
    </Container>
  );
};
