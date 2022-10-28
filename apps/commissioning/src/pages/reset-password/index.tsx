import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { Input } from 'ui/inputs/Input';
import { Layout } from 'ui/layout/Layout';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { BodyText, H2 } from 'ui/typography/Typography';

const ForgottenPassword = () => {
  const intl = useIntl()
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<
    'valid' | 'invalid' | undefined
  >();
  const [nextStep, setNextStep] = useState<boolean>(false);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => (
    setPassword(e.target.value));

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => (
    setConfirmPassword(e.target.value));

  const confirmReset = () => {
    if (password === confirmPassword && password.length >= 8) {
      setNextStep(true)
    }
    else {
      setIsPasswordValid('invalid')
    }
  };

  //  TODO: Function for resending the emails.

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
    <Layout footer={{ links }}>
      {!nextStep ?
        <div className="flex flex-col max-w-fit items-center mt-auto">
          <SvgIcon name="Unlock" className="mb-10 fill-gray-400 w-16 h-16" />
          <H2 className="font-medium mb-2">{intl.formatMessage({ defaultMessage: "Set New Password" })}</H2>
          <BodyText className="w-64 mb-8 text-center">
            {intl.formatMessage({ defaultMessage: "Your password must be different to previously used passwords." })}
          </BodyText>
          <Input
            label={intl.formatMessage({ defaultMessage: "Password" })}
            placeholder="*********"
            type='password'
            onChange={handleChangePassword}
            value={password}
            icon={isPasswordValid ? undefined : "Unlock"}
            className="mb-4"
            width="64"
            validity={isPasswordValid}
          />
          <Input
            label={intl.formatMessage({ defaultMessage: "Confirm password" })}
            placeholder="*********"
            type='password'
            onChange={handleChangeConfirmPassword}
            value={confirmPassword}
            icon={isPasswordValid ? undefined : "Unlock"}
            className="mb-8"
            width="64"
            validity={isPasswordValid}
          />
          <Button
            variant="main-green"
            className="w-64 mb-3"
            onClick={confirmReset}
          >
            {intl.formatMessage({ defaultMessage: "Reset password" })}
          </Button>
        </div>
        :
        <div className="flex flex-col max-w-fit items-center mt-auto">
          <SvgIcon name="ThumbsUp" className="mb-5 fill-gray-400 w-18 h-16" />
          <H2 className="font-medium mb-2">{intl.formatMessage({ defaultMessage: "Reset Password" })}</H2>
          <BodyText className="mb-8 w-80 text-center">
            {intl.formatMessage({ defaultMessage: "Your password has been successfully reset. Click below to log in magically." })}
          </BodyText>
          <Button
            variant="additional-gray"
            className="w-64 mb-3"
            onClick={() => undefined} // TODO: handler
          >
            {intl.formatMessage({ defaultMessage: "Continue" })}
          </Button>
        </div>
      }
    </Layout>
  );
};

export default ForgottenPassword;
