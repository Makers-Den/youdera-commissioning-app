import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@src/components/container/Container';
import { AutocompleteSelectField } from '@src/components/forms/AutocompleteSelectField';
import { Form } from '@src/components/forms/Form';
import { useFlowStore } from '@src/store/flow';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'ui/buttons/Button';
import { BodyText } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z } from 'zod';

import { SunSvg } from '../components/svgs/SunSvg';
import Illustration from '../../public/Illustration.webp';

const options = [
  { label: 'Address 1', key: 'address1' },
  { label: 'Address 2', key: 'address2' },
  { label: 'Address 3', key: 'address3' },
];

export const BuildingTypeSchema = z.object({
  streetAddress: z.object({ key: z.string(), label: z.string() }),
});

export type BuildingTypeType = z.infer<typeof BuildingTypeSchema>;

export const AddressInput = () => {
  const { next, setData, back, data } = useFlowStore();

  const methods = useForm<BuildingTypeType>({
    resolver: zodResolver(BuildingTypeSchema),
    defaultValues: {
      streetAddress: options.find(option => option.key === data.streetAddress),
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<BuildingTypeType> = async (data, e) => {
    const {
      streetAddress: { key: streetAddress },
    } = data;
    setData({ streetAddress });
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
      title="Address of building"
    >
      {/* TODO container */}
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-1 flex-col justify-between gap-16 overflow-hidden "
        {...methods}
      >
        <div className="flex flex-col gap-7">
          <BodyText>Enter the address of the building.</BodyText>
          <AutocompleteSelectField
            name="streetAddress"
            label="Street Address"
            options={options}
            placeholder="Address"
            noOptionsString="No address found"
          />
        </div>

        <div className="z-10 flex flex-col justify-between gap-4 md:flex-row-reverse">
          <Button type="submit" variant="main-orange" className="px-10">
            Next
          </Button>
          <Button variant="additional-white" className="px-10" onClick={back}>
            Back
          </Button>
        </div>
      </Form>
      <SunSvg
        className={clsxm('animate-spin-slow absolute -bottom-44 -right-32')}
      />
    </Container>
  );
};
