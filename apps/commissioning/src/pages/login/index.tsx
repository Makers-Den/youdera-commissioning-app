import { useAuth } from '@src/integrations/youdera/auth/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const [password, setPassword] = useState<string>('');
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setAreCredentialsValid(undefined);
  };

  const [rememberUser, setRememberUser] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated && userInfoQuery.data) {
      router.push(`/${userInfoQuery.data.role}/select-task`);
    }
  }, [isAuthenticated, userInfoQuery.data, router]);

  const handleChangeRememberUser = (): void => setRememberUser(!rememberUser);

  const handleOnLogin = async () => {
    try {
      await loginMutation.mutateAsync({
        email,
        password,
        remember: rememberUser,
      });
      // TODO redirect to dashboard ?
    } catch (err) {
      setAreCredentialsValid('invalid');
    }
  };
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
      <div className="my-auto flex h-full max-w-fit flex-col space-y-7">
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
            width="64"
          />
          <Input
            label={intl.formatMessage({ defaultMessage: 'Password' })}
            placeholder={intl.formatMessage({ defaultMessage: 'Type here' })}
            icon={areCredentialsValid ? undefined : 'Unlock'}
            onChange={handleChangePassword}
            value={password}
            type="password"
            width="64"
            validity={areCredentialsValid}
          />
        </div>
        <div className="gap flex items-center justify-between">
          <Checkbox
            label={intl.formatMessage({ defaultMessage: 'Remember me' })}
            onClick={handleChangeRememberUser}
            isChecked={rememberUser}
            disabled={!!areCredentialsValid}
          />
          <Link href="/forgotten-password" passHref>
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
          onClick={handleOnLogin}
          disabled={!!areCredentialsValid}
          isLoading={loginMutation.isLoading}
        >
          {intl.formatMessage({ defaultMessage: 'Login' })}
        </Button>
      </div>
    </Layout>
  );
};

export default Login;
