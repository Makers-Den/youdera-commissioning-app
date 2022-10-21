import React, { useState } from 'react';
import { Checkbox } from 'ui/checkboxes/Checkbox';
import { Input } from 'ui/inputs/Input';
import { UnderlineLink } from 'ui/links/UnderlineLink';
import { BodyText, Label } from 'ui/typography/Typography';
import Image from 'next/image';
import Logo from 'ui/logo.png';
import { Button } from 'ui/buttons/Button';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const [password, setPassword] = useState<string>('');
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const [rememberUser, setRememberUser] = useState<boolean>(false);
  const handleChangeRememberUser = (): void => setRememberUser(!rememberUser);

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <div className="flex flex-col space-y-7 max-w-fit">
        <Image src={Logo} alt="logo" objectFit='contain' height={60} />
        <div className='space-y-4'>
          <Input
            label="Email"
            placeholder="Type here"
            onChange={handleChangeEmail}
            value={email}
            icon="Envelope"
            className="w-64"
          />
          <Input
            label="Password"
            placeholder="Type here"
            icon="Unlock"
            onChange={handleChangePassword}
            value={password}
            type='password'
            className="w-64"
          />
        </div>
        <div className="flex items-center justify-between gap">
          <Checkbox
            label="Remember me"
            onClick={handleChangeRememberUser}
            isChecked={rememberUser}
          />
          <Label className="font-medium underline">Forgot password?</Label>
        </div>
        <Button variant='main-green'>LOGIN</Button>
      </div>

      <footer className="w-screen flex items-center justify-between px-10 absolute bottom-4">
        <section className="flex space-x-8">
          <UnderlineLink openNewTab href="google.com">
            Legal Notice
          </UnderlineLink>
          <div className="h-5 w-0 border-r-2 border-gray rounded" />
          <UnderlineLink openNewTab href="google.com">
            Privacy Policy
          </UnderlineLink>
        </section>
        <BodyText>© 2022 Younergy Solar SA. All Rights Reserved.</BodyText>
      </footer>
    </div>
  );
};

export default Login;
