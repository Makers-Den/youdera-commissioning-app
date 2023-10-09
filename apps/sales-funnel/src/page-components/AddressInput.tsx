import { Container } from '@src/components/container/Container';
import { useFlowStore } from '@src/store/flow';
import Image from 'next/image';
import { Button } from 'ui/buttons/Button';
import { AutocompleteSelect } from 'ui/select/AutocompleteSelect';
import clsxm from 'ui/utils/clsxm';

import { SunSvg } from '../components/svgs/SunSvg';
import Illustration from '../../public/Illustration.webp';

const options = [
  { label: 'Address 1', key: 'address1' },
  { label: 'Address 2', key: 'address2' },
  { label: 'Address 3', key: 'address3' },
];
export const AddressInput = () => {
  const { next, setData, back } = useFlowStore();

  const handleChange = (addressInput: string) => {
    setData({ addressInput });
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
      subTitle="Estimate how much you can save by installing solar on your property."
    >
      <AutocompleteSelect
        label="Street Address"
        options={options}
        placeholder="Address"
        noOptionsString="No address found"
        onChange={addressInput => handleChange(addressInput?.key || '')}
      />
      <Button variant="additional-white" className="z-10" onClick={back}>
        Back
      </Button>
      <SunSvg
        className={clsxm('animate-spin-slow absolute -bottom-44 -right-32')}
      />
    </Container>
  );
};
