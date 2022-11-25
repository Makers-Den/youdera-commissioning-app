import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@src/api/youdera/hooks/auth/hooks';
import { Field } from '@src/components/forms/Field';
import { Form } from '@src/components/forms/Form';
import { LEGAL_NOTICE_URL, PRIVACY_POLICY_URL } from '@src/lib/constants';
import { routes } from '@src/utils/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { Input } from 'ui/inputs/Input';
import { Layout } from 'ui/layout/Layout';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { BodyText, H2 } from 'ui/typography/Typography';
import { z } from 'zod';

const validation = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof validation>;

const ForgotPassword = () => {
  const intl = useIntl();

  const router = useRouter();

  const method = useForm({
    resolver: zodResolver(validation),
    defaultValues: { email: '' },
  });

  const { handleSubmit, formState } = method;

  const { forgotPasswordMutation } = useAuth();

  const onSubmit = async ({ email }: FormValues) => {
    try {
      await forgotPasswordMutation.mutateAsync(email);
    } finally {
      router.push({ pathname: '/forgot-password/success', query: { email } });
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
      <Form className="my-auto" onSubmit={handleSubmit(onSubmit)} {...method}>
        <div className="flex max-w-fit flex-col items-center">
          <SvgIcon name="Unlock" className="mb-10 h-16 w-16 fill-gray-400" />
          <H2 className="mb-2 font-medium">
            {intl.formatMessage({ defaultMessage: 'Forgot password?' })}
          </H2>
          <BodyText className="mb-8">
            {intl.formatMessage({
              defaultMessage: "No worries, we'll send you reset instructions.",
            })}
          </BodyText>
          <Field name="email">
            {(register, fieldState) => (
              <Input
                label={intl.formatMessage({ defaultMessage: 'Email' })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Type here',
                })}
                icon="Envelope"
                className="mb-8 w-64"
                validity={fieldState.invalid ? 'invalid' : undefined}
                {...register('email')}
              />
            )}
          </Field>
          <Button
            type="submit"
            variant="main-green"
            isLoading={formState.isSubmitting}
            className="mb-3 w-64"
          >
            {intl.formatMessage({ defaultMessage: 'Reset password' })}
          </Button>
          <Link href={routes.login} passHref>
            <Button variant="additional-gray" className="w-64">
              {intl.formatMessage({ defaultMessage: 'Back to login' })}
            </Button>
          </Link>
        </div>
      </Form>
    </Layout>
  );
};

export default ForgotPassword;
