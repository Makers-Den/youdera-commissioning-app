import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from 'ui/buttons/Button';
import { Input } from 'ui/inputs/Input';
import { Layout } from 'ui/layout/Layout';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { BodyText, H2 } from 'ui/typography/Typography';

const ForgottenPassword = () => {
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
      name: 'Legal Notice',
      href: 'google.com',
    },
    {
      name: 'Privacy Policy',
      href: 'google.com',
    },
  ];

  return (
    <Layout links={links} className='bg-gray-50'>
      {!nextStep ? (
        <div className="flex flex-col max-w-fit items-center mt-auto">
          <SvgIcon name="Unlock" className="mb-10 fill-gray-400 w-16 h-16" />
          <H2 className="font-medium mb-2">Forgot Password?</H2>
          <BodyText className="mb-8">
            No worries, we&apos;ll send you reset instructions.
          </BodyText>
          <Input
            label="Email"
            placeholder="Type here"
            onChange={handleChangeEmail}
            value={email}
            icon="Envelope"
            className="mb-8"
            width="64"
            validity={isEmailValid}
          />
          <Button
            variant="main-green"
            className="w-64 mb-3"
            onClick={confirmReset}
          >
            RESET PASSWORD
          </Button>
          <Link href="/login" passHref>
            <Button variant="additional-gray" className="w-64">
              BACK TO LOGIN
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col max-w-fit items-center mt-auto">
          <SvgIcon name="Unlock" className="mb-10 fill-gray-400 w-16 h-16" />
          <H2 className="font-medium mb-2">Check Your Email</H2>
          <BodyText className="mb-1">We sent a password reset link to</BodyText>
          <BodyText className="font-medium">{email}</BodyText>
          <div className="w-24 border-b-2 border-gray-400 rounded my-8" />
          <BodyText className="mb-3">Didn&apos;t receive the email?</BodyText>
          <Button
            variant="additional-gray"
            className="w-64"
            onClick={handleResendEmail}
          >
            CLICK TO RESEND
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default ForgottenPassword;
