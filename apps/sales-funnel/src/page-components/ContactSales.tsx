import { LayoutContainer } from '@src/components/container/LayoutContainer';
import { useFlowStore } from '@src/store/flow';
import Image from 'next/image';
import { Button } from 'ui/buttons/Button';
import { BodyText } from 'ui/typography/Typography';

import { HandWithPhoneSvg } from '../components/svgs/HandWithPhoneSvg';
import Illustration from '../../public/Illustration.webp';

export const ContactSales = () => {
  const { back } = useFlowStore();
  return (
    <LayoutContainer
      clippedTitle
      title="Consult with sales"
      leftSection={
        <Image
          fill
          className="object-cover object-right-bottom"
          alt="Home with solar panels"
          sizes="50vw"
          src={Illustration.src}
        />
      }
    >
      <div className="containerPadding container">
        <div className="flex flex-col items-center gap-20 md:max-w-container">
          <BodyText className="text-black">
            We’re not able to give you an automated offer for the given choice,
            but you can talk to us directly instead.
          </BodyText>
          <HandWithPhoneSvg className="mr-8" />
        </div>
        <div className="buttonContainer md:max-w-container">
          <Button className="font-medium">BOOK A CALL WITH SALES</Button>
          <Button
            variant="additional-white"
            className="font-medium"
            onClick={back}
          >
            BACK
          </Button>
        </div>
      </div>
    </LayoutContainer>
  );
};
