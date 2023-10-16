import { DialogContent, DialogHeader } from '@src/components/dialog/Dialog';
import { ButtonLink } from '@src/components/link/ButtonLink';
import { ThankYouSvg } from '@src/components/svgs/ThankYouSvg';
import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { BodyText, H1 } from 'ui/typography/Typography';

export const ThankYou = ({ onClose }: { onClose: () => void }) => {
  const intl = useIntl();
  return (
    <>
      <DialogHeader>
        <H1>
          {intl.formatMessage({
            defaultMessage: 'Thank You',
          })}
        </H1>
      </DialogHeader>
      <DialogContent className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col items-center gap-6">
          <BodyText>
            {intl.formatMessage({
              defaultMessage:
                'We’re emailing a link to your offer. If you want to discuss the offer go ahead and book a call with us!',
            })}
          </BodyText>
          <ThankYouSvg className="ml-3" />
        </div>
        <div className="mt-auto flex flex-col gap-3 pt-11">
          <ButtonLink
            href="https://calendly.com/"
            openInNewTab
            variant="main-gray"
          >
            {intl.formatMessage({
              defaultMessage: 'Book a call with sales',
            })}
          </ButtonLink>
          <Button type="button" onClick={onClose}>
            {intl.formatMessage({
              defaultMessage: 'Close',
            })}
          </Button>
        </div>
      </DialogContent>
    </>
  );
};
