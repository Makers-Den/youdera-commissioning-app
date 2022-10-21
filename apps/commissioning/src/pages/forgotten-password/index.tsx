import React, { useState } from 'react';
import { Input } from 'ui/inputs/Input';
import { Button } from 'ui/buttons/Button';
import { Footer } from 'ui/footer/Footer'
import { H2, BodyText } from 'ui/typography/Typography';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';

const ForgottenPassword = () => {
  const [email, setEmail] = useState<string>('');
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <div className="flex flex-col max-w-fit items-center">
        <SvgIcon name='Unlock' className='mb-10 fill-gray-secondary w-16 h-16' />
        <H2 className='font-medium mb-2'>Forgot Password?</H2>
        <BodyText className='mb-8'>No worries, we'll send you reset instructions.</BodyText>
        <Input
          label="Email"
          placeholder="Type here"
          onChange={handleChangeEmail}
          value={email}
          icon="Envelope"
          className="w-64"
        />
        <Button variant='main-green' className="w-64 mb-3 mt-8">RESET PASSWORD</Button>
        <Button variant='additional-gray' className="w-64">BACK TO LOGIN</Button>
      </div>
      <Footer />
    </div>
  );
};

export default ForgottenPassword;
