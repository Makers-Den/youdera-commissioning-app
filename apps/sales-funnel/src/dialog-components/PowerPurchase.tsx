import { DialogContent, DialogHeader } from '@src/components/dialog/Dialog';
import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { BodyText, H1 } from 'ui/typography/Typography';

export type PowerPurchaseProps = {
  onClose: () => void;
  // image: {src: string, alt: string}; ??
};

export const PowerPurchase = ({ onClose }: PowerPurchaseProps) => {
  const intl = useIntl();

  return (
    <>
      <DialogHeader>
        <H1>
          {intl.formatMessage({
            defaultMessage: 'Power Purchase',
          })}
        </H1>
      </DialogHeader>
      <DialogContent>
        <BodyText>
          {intl.formatMessage({
            defaultMessage:
              'With Power Purchase Younergy pays for the installation of Solar Panels on your roof and you buy electricity from Younergy at a lower price.',
          })}
        </BodyText>
        <BodyText className="mt-5">
          {intl.formatMessage({
            defaultMessage:
              'After a contract period of 20 years, you will own the solar panels and your price will go even lower as your financing obligations with Younergy ends.',
          })}
        </BodyText>

        <Button variant="main-gray" onClick={onClose} className="mt-5 w-full">
          {intl.formatMessage({ defaultMessage: 'Close' })}
        </Button>
      </DialogContent>
    </>
  );
};
