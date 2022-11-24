import { useAuth } from '@src/api/youdera/hooks/auth/hooks';
import { LEGAL_NOTICE_URL, PRIVACY_POLICY_URL } from '@src/lib/constants';
import { getAfterLoginRoute } from '@src/utils/routes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { Checkbox } from 'ui/checkboxes/Checkbox';
import { Input } from 'ui/inputs/Input';
import { Layout } from 'ui/layout/Layout';
import Logo from 'ui/logo.png';
import { Label } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

const Login = () => {
  const intl = useIntl();
  const router = useRouter();
  const [areCredentialsValid, setAreCredentialsValid] = useState<
    'valid' | 'invalid' | undefined
  >();

  const { loginMutation, isAuthenticated, userInfoQuery } = useAuth();

  const [email, setEmail] = useState<string>('');
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setAreCredentialsValid(undefined);
  };

  const [password, setPassword] = useState<string>('');
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setAreCredentialsValid(undefined);
  };

  const [rememberUser, setRememberUser] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated && userInfoQuery.data) {
      router.push(getAfterLoginRoute(userInfoQuery.data.role));
    }
  }, [isAuthenticated, userInfoQuery.data, router]);

  const handleChangeRememberUser = (): void => setRememberUser(!rememberUser);

  const handleOnLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({
        email,
        password,
        remember: rememberUser,
      });
    } catch (err) {
      setAreCredentialsValid('invalid');
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
      <form
        className="my-auto flex h-full max-w-fit flex-col space-y-7"
        onSubmit={handleOnLogin}
      >
        <Image
          src={Logo}
          alt="logo"
          objectFit="contain"
          height={60}
          className="pointer-events-none"
        />
        <div className="space-y-4">
          <Input
            label={intl.formatMessage({ defaultMessage: 'Email' })}
            placeholder={intl.formatMessage({ defaultMessage: 'Type here' })}
            onChange={handleChangeEmail}
            value={email}
            icon="Envelope"
            className="w-64"
            name="email"
          />
          <Input
            label={intl.formatMessage({ defaultMessage: 'Password' })}
            placeholder={intl.formatMessage({ defaultMessage: 'Type here' })}
            icon={areCredentialsValid ? undefined : 'Unlock'}
            onChange={handleChangePassword}
            value={password}
            type="password"
            className="w-64"
            validity={areCredentialsValid}
          />
          {areCredentialsValid && (
            <Label className="text-red-400">
              {intl.formatMessage({
                defaultMessage: 'Email or password incorrect.',
              })}
            </Label>
          )}
        </div>

        <div className="gap flex items-center justify-between">
          <Checkbox
            label={intl.formatMessage({ defaultMessage: 'Remember me' })}
            onClick={handleChangeRememberUser}
            isChecked={rememberUser}
            disabled={!!areCredentialsValid}
          />
          <Link href="/forgot-password" passHref>
            <Label
              className={clsxm(
                'ml-8 font-medium underline hover:cursor-pointer',
                areCredentialsValid && 'text-red-400',
              )}
            >
              {intl.formatMessage({ defaultMessage: 'Forgot password?' })}
            </Label>
          </Link>
        </div>
        <Button
          variant="main-green"
          disabled={!!areCredentialsValid}
          isLoading={loginMutation.isLoading}
          type="submit"
        >
          {intl.formatMessage({ defaultMessage: 'Login' })}
        </Button>
      </form>
    </Layout>
  );
};

export default Login;
