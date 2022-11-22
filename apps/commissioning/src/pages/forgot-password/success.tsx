import { useAuth } from '@src/api/youdera/hooks/auth/hooks';
import { LEGAL_NOTICE_URL, PRIVACY_POLICY_URL } from '@src/lib/constants';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { Layout } from 'ui/layout/Layout';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { BodyText, H2 } from 'ui/typography/Typography';

const ForgotPasswordSuccess = () => {
  const intl = useIntl();

  const router = useRouter();

  const [email, setEmail] = useState('');

  const { forgotPasswordMutation } = useAuth();

  useEffect(() => {
    if (router.isReady) {
      setEmail((router.query.email as string) || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const handleResendEmail = () => {
    if (email) {
      forgotPasswordMutation.mutate(email);
    }
  };

  const links = [
    {
      name: intl.formatMessage({ defaultMessage: 'Legal notice' }),
      href: LEGAL_NOTICE_URL,
    },
    {
      name: intl.formatMessage({ defaultMessage: 'Privacy Policy' }),
      href: PRIVACY_POLICY_URL,
    },
  ];

  return (
    <Layout footer={{ links }}>
      <div className="my-auto flex max-w-fit flex-col items-center">
        <SvgIcon name="Unlock" className="mb-10 h-16 w-16 fill-gray-400" />
        <H2 className="mb-2 font-medium">
          {intl.formatMessage({ defaultMessage: 'Check Your Email' })}
        </H2>
        <BodyText className="mb-1">
          {intl.formatMessage({
            defaultMessage: 'We sent a password reset link to',
          })}
        </BodyText>
        <BodyText className="font-medium">{email}</BodyText>
        <div className="my-8 w-24 rounded border-b-2 border-gray-400" />
        <BodyText className="mb-3">
          {intl.formatMessage({
            defaultMessage: "Didn't receive the email?",
          })}
        </BodyText>
        <Button
          variant="additional-gray"
          className="w-64"
          isLoading={forgotPasswordMutation.isLoading}
          onClick={handleResendEmail}
        >
          {intl.formatMessage({ defaultMessage: 'Click to resend' })}
        </Button>
      </div>
    </Layout>
  );
};

export default ForgotPasswordSuccess;
