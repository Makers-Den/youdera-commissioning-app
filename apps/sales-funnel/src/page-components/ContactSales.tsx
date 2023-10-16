import { LayoutContainer } from '@src/components/container/LayoutContainer';
import { ButtonLink } from '@src/components/link/ButtonLink';
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
        <div className="md:max-w-container flex flex-col items-center gap-20">
          <BodyText className="text-black">
            We’re not able to give you an automated offer for the given choice,
            but you can talk to us directly instead.
          </BodyText>
          <HandWithPhoneSvg className="mr-8" />
        </div>
        <div className="buttonContainer md:max-w-container">
          <ButtonLink
            href="https://calendly.com/"
            openInNewTab
            variant="main-gray"
          >
            Book a call with sales
          </ButtonLink>
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
