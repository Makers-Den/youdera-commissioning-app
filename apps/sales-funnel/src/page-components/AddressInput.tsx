import { Container } from '@src/components/container/Container';
import { useFlowStore } from '@src/store/flow';
import Image from 'next/image';
import { Button } from 'ui/buttons/Button';
import { AutocompleteSelect } from 'ui/select/AutocompleteSelect';
import { BodyText } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

import { SunSvg } from '../components/svgs/SunSvg';
import Illustration from '../../public/Illustration.webp';

const options = [
  { label: 'Address 1', key: 'address1' },
  { label: 'Address 2', key: 'address2' },
  { label: 'Address 3', key: 'address3' },
];
export const AddressInput = () => {
  const { next, setData, back, data } = useFlowStore();

  const handleChange = (streetAddress: string) => {
    setData({ streetAddress });
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
      <div className="flex flex-col gap-7">
        <BodyText>Enter the address of the building.</BodyText>
        <AutocompleteSelect
          label="Street Address"
          options={options}
          placeholder="Address"
          noOptionsString="No address found"
          value={options.find(option => option.key === data.streetAddress)}
          onChange={addressInput => handleChange(addressInput?.key || '')}
        />
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
      <SunSvg
        className={clsxm('animate-spin-slow absolute -bottom-44 -right-32')}
      />
    </Container>
  );
};
