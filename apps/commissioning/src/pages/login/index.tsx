import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { Checkbox } from 'ui/checkboxes/Checkbox';
import { Input } from 'ui/inputs/Input';
import { Layout } from 'ui/layout/Layout';
import Logo from 'ui/logo.png';
import { Label } from 'ui/typography/Typography';

// eslint-disable-next-line import/no-relative-packages
import clsxm from '../../../../../packages/ui/lib/clsxm';

const Login = () => {
  const intl = useIntl();
  const [areCredentialsValid, setAreCredentialsValid] = useState<'valid' | 'invalid' | undefined>();

  const [email, setEmail] = useState<string>('');
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const [password, setPassword] = useState<string>('');
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setAreCredentialsValid(undefined);
  }

  const [rememberUser, setRememberUser] = useState<boolean>(false);
  const handleChangeRememberUser = (): void => setRememberUser(!rememberUser);

  const handleOnLogin = () => {
    // TODO: Login logic, for now its hardcoded values for front
    // eslint-disable-next-line no-empty
    if (password === '12345678') {

    }
    else {
      setAreCredentialsValid('invalid')
    }
  }
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
      <div className="flex flex-col space-y-7 max-w-fit h-full mt-auto">
        <Image src={Logo} alt="logo" objectFit="contain" height={60} className='pointer-events-none' />
        <div className="space-y-4">
          <Input
            label={intl.formatMessage({ defaultMessage: 'Email' })}
            placeholder={intl.formatMessage({ defaultMessage: 'Type here' })}
            onChange={handleChangeEmail}
            value={email}
            icon="Envelope"
            sizeClass="w-64"
          />
          <Input
            label={intl.formatMessage({ defaultMessage: 'Password' })}
            placeholder={intl.formatMessage({ defaultMessage: 'Type here' })}
            icon={areCredentialsValid ? undefined : "Unlock"}
            onChange={handleChangePassword}
            value={password}
            type="password"
            sizeClass="w-64"
            validity={areCredentialsValid}
          />
        </div>
        <div className="flex items-center justify-between gap">
          <Checkbox
            label={intl.formatMessage({ defaultMessage: 'Remember me' })}
            onClick={handleChangeRememberUser}
            isChecked={rememberUser}
            disabled={!!areCredentialsValid}
          />
          <Link href="/forgotten-password" passHref>
            <Label className={clsxm("font-medium underline hover:cursor-pointer", areCredentialsValid && "text-red-400")}>
              {intl.formatMessage({ defaultMessage: 'Forgot password?' })}
            </Label>
          </Link>
        </div>
        <Button variant="main-green" onClick={handleOnLogin} disabled={!!areCredentialsValid}>{intl.formatMessage({ defaultMessage: 'Login' })}</Button>
      </div>
    </Layout >
  );
};

export default Login;
