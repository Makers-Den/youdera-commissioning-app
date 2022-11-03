import Link from 'next/link';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { Input } from 'ui/inputs/Input';
import { Layout } from 'ui/layout/Layout';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { BodyText, H2 } from 'ui/typography/Typography';

const ForgottenPassword = () => {
  const intl = useIntl();
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<
    'valid' | 'invalid' | undefined
  >();
  const [nextStep, setNextStep] = useState<boolean>(false);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const confirmReset = () => {
    const validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validEmailRegex)) {
      //  TODO: Function for sending the email.
      setNextStep(true);
    } else {
      setIsEmailValid('invalid');
    }
  };

  //  TODO: Function for resending the emails.
  const handleResendEmail = () => undefined;

  const links = [
    {
      name: intl.formatMessage({ defaultMessage: 'Legal notice' }),
      href: 'google.com',
    },
    {
      name: intl.formatMessage({ defaultMessage: 'Privacy Policy' }),
      href: 'google.com',
    },
  ];

  return (
    <Layout footer={{ links }}>
      {!nextStep ? (
        <div className="my-auto flex max-w-fit flex-col items-center">
          <SvgIcon name="Unlock" className="mb-10 h-16 w-16 fill-gray-400" />
          <H2 className="mb-2 font-medium">
            {intl.formatMessage({ defaultMessage: 'Forgot password?' })}
          </H2>
          <BodyText className="mb-8">
            {intl.formatMessage({
              defaultMessage: "No worries, we'll send you reset instructions.",
            })}
          </BodyText>
          <Input
            label={intl.formatMessage({ defaultMessage: 'Email' })}
            placeholder={intl.formatMessage({ defaultMessage: 'Type here' })}
            onChange={handleChangeEmail}
            value={email}
            icon="Envelope"
            className="mb-8"
            width="64"
            validity={isEmailValid}
          />
          <Button
            variant="main-green"
            className="mb-3 w-64"
            onClick={confirmReset}
          >
            {intl.formatMessage({ defaultMessage: 'Reset password' })}
          </Button>
          <Link href="/login" passHref>
            <Button variant="additional-gray" className="w-64">
              {intl.formatMessage({ defaultMessage: 'Back to login' })}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="mt-auto flex max-w-fit flex-col items-center">
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
            onClick={handleResendEmail}
          >
            {intl.formatMessage({ defaultMessage: 'Click to resend' })}
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default ForgottenPassword;
