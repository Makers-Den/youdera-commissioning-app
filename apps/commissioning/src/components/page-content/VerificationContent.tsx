
import { useGetSite } from '@src/integrations/youdera/sites/hooks/useGetSite';
import { Site } from '@src/integrations/youdera/sites/types';
import { useContactSiteProjectManagerMutation } from '@src/integrations/youdera/sites/useContactSiteProjectManagerMutation';
import { useEffect,useState } from 'react';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button } from 'ui/buttons/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'ui/dialogs/Dialog';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { BodyText, Label } from 'ui/typography/Typography';

import { LargeBox } from '../LargeBox';
import { VerificationList } from '../VerificationList';

export type VerificationContentProps = {
  siteId: number;
  registerContactProjectManagerHandler: (fn: () => void) => void;
};

type ContactProjectManagerDialogProps = {
  siteId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ContactProjectManagerDialog = ({ isOpen, siteId, onClose }: ContactProjectManagerDialogProps) => {
  const intl = useIntl();
  const contactSiteProjectManagerMutation = useContactSiteProjectManagerMutation(siteId);
  const [phoneNumber, setPhoneNumber] = useState<string>();

  return (
    <Dialog className="w-[400px]" open={isOpen} onClose={onClose}>
      <DialogHeader>
        <DialogTitle title={intl.formatMessage({ defaultMessage: 'Contact project manager' })} />
      </DialogHeader>
      <DialogContent>
        {!phoneNumber ?
          <>
            <BodyText>{intl.formatMessage({ defaultMessage: 'Email will be sent to a project manager' })}</BodyText>
            <div className="flex gap-5 mt-7">
              <Button className="flex-1" variant="additional-gray" onClick={onClose}>
                {intl.formatMessage({ defaultMessage: 'Cancel' })}
              </Button>
              <Button
                className="flex-1"
                variant="main-green"
                onClick={async () => {
                  try {
                    const phone = await contactSiteProjectManagerMutation.mutateAsync();
                    setPhoneNumber(phone);
                  } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error("Failed contacting pm", err);
                  }
                }}
                isLoading={contactSiteProjectManagerMutation.isLoading}
              >
                {intl.formatMessage({ defaultMessage: 'ok' })}
              </Button>
            </div>
          </> : 
          <div className="flex flex-col items-center">
            <Label className="w-full">{intl.formatMessage({ defaultMessage: 'Project manager phone number' })}</Label>
            <div className='w-full flex items-center gap-3 mt-2 bg-gray-100 border border-gray-400 rounded p-5'>
              <SvgIcon name='Phone' />
              <BodyText>{phoneNumber}</BodyText>
            </div>
            <Button className="mt-7 w-[160px]" variant="additional-gray" onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Close' })}
            </Button>
          </div>}
      </DialogContent>
    </Dialog>
  )
}

export function VerificationContent({ siteId, registerContactProjectManagerHandler }: VerificationContentProps) {
  const intl = useIntl();

  const { siteQuery } = useGetSite(siteId);
  const project = siteQuery.data as Site;

  const contactDialog = useDisclosure();

  useEffect(() => {
    registerContactProjectManagerHandler(contactDialog.onOpen);
  }, [registerContactProjectManagerHandler, contactDialog]);

  return (
    <LargeBox>
      <BoxHeader>
        <BoxTitle
          title={intl.formatMessage({ defaultMessage: 'Test and Verify' })}
        />
      </BoxHeader>
      <BoxContent>
        <VerificationList
          siteId={project.id}
          inverters={project.inverters}
          batteries={project.batteries}
          meters={project.meters}
        />
      </BoxContent>
      <ContactProjectManagerDialog
        isOpen={contactDialog.isOpen}
        onClose={contactDialog.onClose}
        siteId={siteId}
      />
    </LargeBox>
  );
}
