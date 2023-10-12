import { Container } from '@src/components/container/Container';
import { useFlowStore } from '@src/store/flow';
import { Button } from 'ui/buttons/Button';
import { BodyText } from 'ui/typography/Typography';

import { HandWithPhoneSvg } from '../components/svgs/HandWithPhoneSvg';

export const ContactSales = () => {
  const { back } = useFlowStore();
  return (
    <Container clippedTitle title="Consult with sales">
      <div className="container containerPadding">
        <div className="flex flex-col items-center gap-20">
          <BodyText className="text-black">
            We’re not able to give you an automated offer for the given choice,
            but you can talk to us directly instead.
          </BodyText>
          <HandWithPhoneSvg className="mr-8" />
        </div>
        <div className="flex flex-col gap-4">
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
    </Container>
  );
};
