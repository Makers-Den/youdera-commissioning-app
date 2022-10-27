import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from 'ui/buttons/Button';
import { Checkbox } from 'ui/checkboxes/Checkbox';
import { Input } from 'ui/inputs/Input';
import { Layout } from 'ui/layout/Layout';
import Logo from 'ui/logo.png';
import { Label } from 'ui/typography/Typography';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const [password, setPassword] = useState<string>('');
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const [rememberUser, setRememberUser] = useState<boolean>(false);
  const handleChangeRememberUser = (): void => setRememberUser(!rememberUser);
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
    <Layout links={links}>
      <div className="flex flex-col space-y-7 max-w-fit h-full mt-auto">
        <Image src={Logo} alt="logo" objectFit="contain" height={60} />
        <div className="space-y-4">
          <Input
            label="Email"
            placeholder="Type here"
            onChange={handleChangeEmail}
            value={email}
            icon="Envelope"
            width="64"
          />
          <Input
            label="Password"
            placeholder="Type here"
            icon="Unlock"
            onChange={handleChangePassword}
            value={password}
            type="password"
            width="64"
          />
        </div>
        <div className="flex items-center justify-between gap">
          <Checkbox
            label="Remember me"
            onClick={handleChangeRememberUser}
            isChecked={rememberUser}
          />
          <Link href="/forgotten-password" passHref>
            <Label className="font-medium underline hover:cursor-pointer">
              Forgot password?
            </Label>
          </Link>
        </div>
        <Button variant="main-green">LOGIN</Button>
      </div>
    </Layout>
  );
};

export default Login;
