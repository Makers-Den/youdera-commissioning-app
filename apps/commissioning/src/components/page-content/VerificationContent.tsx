
import { Site } from '@src/integrations/youdera/apiTypes';
import { useAuth } from '@src/integrations/youdera/auth/hooks/useAuth';
import { Role } from '@src/integrations/youdera/auth/types';
import { useGetSite } from '@src/integrations/youdera/sites/hooks/useGetSite';
import { useContactSiteProjectManagerMutation } from '@src/integrations/youdera/sites/useContactSiteProjectManagerMutation';
import { useExtractDevices } from '@src/utils/devices';
import { routes } from '@src/utils/routes';
import { every } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect,useMemo,useState } from 'react';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button, ButtonProps } from 'ui/buttons/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'ui/dialogs/Dialog';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { BodyText, Label } from 'ui/typography/Typography';

import { LargeBox } from '../LargeBox';
import { VerificationList } from '../VerificationList';

type ContactProjectManagerDialogProps = {
  siteId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ContactProjectManagerDialog = ({ siteId, isOpen, onClose }: ContactProjectManagerDialogProps) => {
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

export type VerificationContentProps = {
  siteId: number;
  setNextButtonProps: (value: (ButtonProps & { content: string }) | null) => void;
};

type NextButtonStatus = 'none' | 'contact_pm' | 'finish';

export function VerificationContent({ siteId, setNextButtonProps }: VerificationContentProps) {
  const intl = useIntl();
  const router = useRouter();
  const { userInfoQuery } = useAuth();
  const userRole = userInfoQuery.data?.role as Role;

  const { siteQuery } = useGetSite(siteId);
  const site = siteQuery.data as Site;
  const contactDialog = useDisclosure();
  const devices = useExtractDevices(site);

  const nextButtonStatus: NextButtonStatus = useMemo(() => {
    const latestVerificationStatuses = devices.map(d => d.verificationTestStatus);
    if (every(latestVerificationStatuses, status => status === 'success') || userRole === 'admin') {
      return 'finish';
    }

    if (every(latestVerificationStatuses, status => status === 'success' || status === 'warning')) {
      return 'contact_pm';
    }

    return 'none';
  }, [devices, userRole]);


  useEffect(() => {
    if (nextButtonStatus === 'none') {
      setNextButtonProps(null);
    } else if (nextButtonStatus === 'contact_pm') {
      setNextButtonProps({
        content: intl.formatMessage({
          defaultMessage: 'Contact project manager',
        }),
        variant: 'main-green',
        type: 'button',
        onClick: contactDialog.onOpen,
      });
    } else if (nextButtonStatus === 'finish') {
      setNextButtonProps({
        content: intl.formatMessage({
          defaultMessage: 'Finish',
        }),
        variant: 'main-green',
        type: 'button',
        onClick: () => {
          router.push(routes.electrician.completed(siteId));
        },
      });
    }
  }, [intl, contactDialog.onOpen, setNextButtonProps, nextButtonStatus, router, siteId]);

  return (
    <LargeBox>
      <BoxHeader>
        <BoxTitle
          title={intl.formatMessage({ defaultMessage: 'Test and Verify' })}
        />
      </BoxHeader>
      <BoxContent>
        <VerificationList
          siteId={site.id}
          devices={devices}
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
