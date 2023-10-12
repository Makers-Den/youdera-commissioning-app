import { zodResolver } from '@hookform/resolvers/zod';
import { LayoutContainer } from '@src/components/container/LayoutContainer';
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

const AddressInputSchema = z.object({
  streetAddress: z.object({ key: z.string(), label: z.string() }),
});

type AddressInputType = z.infer<typeof AddressInputSchema>;

export const AddressInput = () => {
  const { next, setData, back, data } = useFlowStore();

  const methods = useForm<AddressInputType>({
    resolver: zodResolver(AddressInputSchema),
    defaultValues: {
      streetAddress: options.find(option => option.key === data.streetAddress),
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<AddressInputType> = async data => {
    const {
      streetAddress: { key: streetAddress },
    } = data;
    setData({ streetAddress });
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
      title="Address of building"
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="container containerPadding"
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
        <SunSvg
          className={clsxm('animate-spin-slow absolute -bottom-44 -right-32')}
        />
      </Form>
    </LayoutContainer>
  );
};
