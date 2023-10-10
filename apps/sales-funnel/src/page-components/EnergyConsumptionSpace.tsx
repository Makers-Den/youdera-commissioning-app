import { Container } from '@src/components/container/Container';
import { BulbSvg } from '@src/components/svgs/BulbSvg';
import { ElectricalSvg } from '@src/components/svgs/ElectricalSvg';
import { FireSvg } from '@src/components/svgs/FireSvg';
import { HeatpumpSvg } from '@src/components/svgs/HeatpumpSvg';
import { FlowData, useFlowStore } from '@src/store/flow';
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

const options: RadioGroupOption<FlowData['primarySpaceHeating']>[] = [
  { name: 'Electrical', value: 'electrical', element: <ElectricalSvg /> },
  { name: 'Heatpump', value: 'heatpump', element: <HeatpumpSvg /> },
  {
    name: 'Oil, Gas, Wood, Remote, Other',
    value: 'other',
    element: <FireSvg />,
  },
];

export const EnergyConsumptionSpace = () => {
  const { next, setData, back, data } = useFlowStore();

  const handleChange = (
    primarySpaceHeating: FlowData['primarySpaceHeating'],
  ) => {
    setData({ primarySpaceHeating });
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
          label="How do you primarily heat your house?"
          options={options}
          onChange={handleChange}
          defaultValue={data?.primarySpaceHeating}
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
          disabled={!data.primarySpaceHeating}
        >
          Next
        </Button>
        <Button variant="additional-white" className="px-10" onClick={back}>
          Back
        </Button>
      </div>

      <BulbSvg className={clsxm('absolute bottom-24 left-14')} />
    </Container>
  );
};
