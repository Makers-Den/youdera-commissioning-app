import { Button } from 'ui/buttons/Button';
import { BodyText } from 'ui/typography/Typography';

import { MobileLayout } from '../components/layout/MobileLayout';
import { HandWithPhoneSvg } from '../components/svgs/HandWithPhoneSvg';

export default function Home() {
  return (
    <MobileLayout clipped title="Consult with sales">
      <div className="flex h-full flex-col  justify-between bg-white p-5">
        <div className="flex flex-col items-center gap-20">
          <BodyText className="text-black">
            We’re not able to give you an automated offer for the given choice,
            but you can talk to us directly instead.
          </BodyText>
          <HandWithPhoneSvg className="mr-8" />
        </div>
        <div className="flex flex-col gap-4">
          <Button>BOOK A CALL WITH SALES</Button>
          <Button variant="additional-white">BACK</Button>
        </div>
      </div>
    </MobileLayout>
  );
}
