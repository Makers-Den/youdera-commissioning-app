import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { Input } from 'ui/inputs/Input';
import { Layout } from 'ui/layout/Layout';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { BodyText, H2 } from 'ui/typography/Typography';

const ForgottenPassword = () => {
  const intl = useIntl();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<
    'valid' | 'invalid' | undefined
  >();
  const [nextStep, setNextStep] = useState<boolean>(false);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setConfirmPassword(e.target.value);

  const confirmReset = () => {
    if (password === confirmPassword && password.length >= 8) {
      setNextStep(true);
    } else {
      setIsPasswordValid('invalid');
    }
  };

  //  TODO: Function for resending the emails.

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
            {intl.formatMessage({ defaultMessage: 'Set New Password' })}
          </H2>
          <BodyText className="mb-8 w-64 text-center">
            {intl.formatMessage({
              defaultMessage:
                'Your password must be different to previously used passwords.',
            })}
          </BodyText>
          <Input
            label={intl.formatMessage({ defaultMessage: 'Password' })}
            placeholder="*********"
            type="password"
            onChange={handleChangePassword}
            value={password}
            icon={isPasswordValid ? undefined : 'Unlock'}
            className="mb-4"
            width="64"
            validity={isPasswordValid}
          />
          <Input
            label={intl.formatMessage({ defaultMessage: 'Confirm password' })}
            placeholder="*********"
            type="password"
            onChange={handleChangeConfirmPassword}
            value={confirmPassword}
            icon={isPasswordValid ? undefined : 'Unlock'}
            className="mb-8"
            width="64"
            validity={isPasswordValid}
          />
          <Button
            variant="main-green"
            className="mb-3 w-64"
            onClick={confirmReset}
          >
            {intl.formatMessage({ defaultMessage: 'Reset password' })}
          </Button>
        </div>
      ) : (
        <div className="mt-auto flex max-w-fit flex-col items-center">
          <SvgIcon name="ThumbsUp" className="w-18 mb-5 h-16 fill-gray-400" />
          <H2 className="mb-2 font-medium">
            {intl.formatMessage({ defaultMessage: 'Reset Password' })}
          </H2>
          <BodyText className="mb-8 w-80 text-center">
            {intl.formatMessage({
              defaultMessage:
                'Your password has been successfully reset. Click below to log in magically.',
            })}
          </BodyText>
          <Button
            variant="additional-gray"
            className="mb-3 w-64"
            onClick={() => undefined} // TODO: handler
          >
            {intl.formatMessage({ defaultMessage: 'Continue' })}
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default ForgottenPassword;
