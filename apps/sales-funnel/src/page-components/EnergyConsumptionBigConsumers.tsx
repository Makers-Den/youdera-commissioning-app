import { Container } from '@src/components/container/Container';
import { BulbSvg } from '@src/components/svgs/BulbSvg';
import { useFlowStore } from '@src/store/flow';
import Image from 'next/image';
import React from 'react';
import { Button } from 'ui/buttons/Button';
import { CheckboxGroup } from 'ui/checkboxes/CheckboxGroup';
import { type Option as RadioGroupOption } from 'ui/radio-group/CustomRadioGroup';
import { NoteText } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

import ConsumptionIllustration from '../../public/ConsumptionIllustration.webp';

const options: RadioGroupOption[] = [
  {
    name: 'Sauna',
    value: 'sauna',
  },
  {
    name: 'Indoor pool',
    value: 'indoor pool',
  },
  {
    name: 'Air Conditioning',
    value: 'air conditioning',
  },
  {
    name: 'Electric Vehicle',
    value: 'electric vehicle',
  },
];

export const EnergyConsumptionBigConsumers = () => {
  const { next, setData, back, data } = useFlowStore();

  const handleChange = (bigEnergyConsumers: string[]) => {
    setData({ bigEnergyConsumers });
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
        <CheckboxGroup
          options={options}
          onChange={handleChange}
          label="Do you have any of these big energy consumers in your household?"
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
          onClick={next}
          disabled={
            data.bigEnergyConsumers
              ? data.bigEnergyConsumers?.length <= 0
              : true
          }
        >
          Next
        </Button>
        <Button variant="additional-white" className="px-10" onClick={back}>
          Back
        </Button>
      </div>

      <BulbSvg className={clsxm('absolute bottom-24 left-1/2')} />
    </Container>
  );
};
