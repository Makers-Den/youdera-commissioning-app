import { Container } from '@src/components/container/Container';
import { BulbSvg } from '@src/components/svgs/BulbSvg';
import { ElectricalBoilerSvg } from '@src/components/svgs/ElectricalBoilerSvg';
import { FireSvg } from '@src/components/svgs/FireSvg';
import { HeatpumpBoilerSvg } from '@src/components/svgs/HeatpumpBoilerSvg';
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

const options: RadioGroupOption<FlowData['primaryWaterHeating']>[] = [
  {
    name: 'Electrical Boiler',
    value: 'electrical',
    element: <ElectricalBoilerSvg />,
  },
  {
    name: 'Heatpump Boiler',
    value: 'heatpump',
    element: <HeatpumpBoilerSvg />,
  },
  {
    name: 'Oil, Gas, Wood, Remote, Other',
    value: 'other',
    element: <FireSvg />,
  },
];

export const EnergyConsumptionWater = () => {
  const { next, setData, back, data } = useFlowStore();

  const handleChange = (
    primaryWaterHeating: FlowData['primaryWaterHeating'],
  ) => {
    setData({ primaryWaterHeating });
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
          label="How do you primarily heat your water?"
          options={options}
          onChange={handleChange}
          defaultValue={data?.primaryWaterHeating}
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
          disabled={!data.primaryWaterHeating}
        >
          Next
        </Button>
        <Button variant="additional-white" className="px-10" onClick={back}>
          Back
        </Button>
      </div>

      <BulbSvg
        className={clsxm('absolute bottom-24 left-1/2 -translate-x-1/2')}
      />
    </Container>
  );
};
