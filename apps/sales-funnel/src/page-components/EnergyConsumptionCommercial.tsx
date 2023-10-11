import { Container } from '@src/components/container/Container';
import { BulbSvg } from '@src/components/svgs/BulbSvg';
import { FlowData, useFlowStore } from '@src/store/flow';
import Image from 'next/image';
import React from 'react';
import { Button } from 'ui/buttons/Button';
import { Input } from 'ui/inputs/Input';
import { BodyText, NoteText } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

import ConsumptionIllustration from '../../public/ConsumptionIllustration.webp';

export const EnergyConsumptionCommercial = () => {
  const { next, setData, back, data } = useFlowStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const yearlyConsumption: FlowData['yearlyConsumption'] = e.target.value;
    setData({ yearlyConsumption });
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
        <BodyText>
          Please fill in the yearly kWh consumption of your commercial property.
        </BodyText>
        <Input
          label="Yearly kWh consumption"
          units="kWh"
          type="number"
          className="max-w-xs"
          onChange={handleChange}
          value={data?.yearlyConsumption}
        />
        <NoteText>
          For properties with consumption larger than 2 mWh
          <br />
          we suggest reaching out to sales directly.
        </NoteText>
      </div>

      <div className="z-10 flex flex-col justify-between gap-4 md:flex-row-reverse">
        <Button
          variant="main-orange"
          className="px-10"
          onClick={next}
          disabled={!data.yearlyConsumption}
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
