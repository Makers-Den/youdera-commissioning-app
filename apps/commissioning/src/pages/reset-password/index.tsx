import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@src/api/youdera/hooks/auth/hooks';
import { Field } from '@src/components/forms/Field';
import { Form } from '@src/components/forms/Form';
import { LEGAL_NOTICE_URL, PRIVACY_POLICY_URL } from '@src/lib/constants';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { Input } from 'ui/inputs/Input';
import { Layout } from 'ui/layout/Layout';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Toast, useToast } from 'ui/toast/Toast';
import { BodyText, H2 } from 'ui/typography/Typography';
import { z } from 'zod';

export const password = z.string().min(10).max(100);

const zodValidation = z.object({
  password,
  passwordConfirmation: password,
});

type FormValues = z.infer<typeof zodValidation>;

const ResetPassword = () => {
  const intl = useIntl();

  const toast = useToast();

  const validation = useMemo(
    () =>
      zodValidation.refine(
        data => data.password === data.passwordConfirmation,
        {
          message: intl.formatMessage({
            defaultMessage: "Passwords don't match",
          }),
          path: ['passwordConfirmation'],
        },
      ),
    [intl],
  );

  const router = useRouter();

  const method = useForm<FormValues>({ resolver: zodResolver(validation) });

  const { handleSubmit, formState } = method;

  const { resetPasswordMutation } = useAuth();

  const onSubmit = async ({ password, passwordConfirmation }: FormValues) => {
    if (router.isReady) {
      try {
        await resetPasswordMutation.mutateAsync({
          password,
          password_confirmation: passwordConfirmation,
          token: router.query.token as string,
          email: router.query.email as string,
        });
        router.push('/reset-password/success');
      } catch (err) {
        //@ts-ignore
        toast.error(err.message);
        // eslint-disable-next-line no-console
        console.error(err);
      }
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
    <>
      <Layout footer={{ links }}>
        <Form className="my-auto" onSubmit={handleSubmit(onSubmit)} {...method}>
          <div className="flex max-w-fit flex-col items-center">
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
            <Field name="password">
              {(register, fieldState) => (
                <Input
                  label={intl.formatMessage({ defaultMessage: 'Password' })}
                  placeholder="*********"
                  type="password"
                  icon={fieldState.invalid ? 'Unlock' : undefined}
                  className="mb-4"
                  validity={fieldState.invalid ? 'invalid' : undefined}
                  {...register('password')}
                />
              )}
            </Field>
            <Field name="passwordConfirmation">
              {(register, fieldState) => (
                <Input
                  label={intl.formatMessage({
                    defaultMessage: 'Confirm password',
                  })}
                  placeholder="*********"
                  type="password"
                  icon={fieldState.invalid ? 'Unlock' : undefined}
                  className="mb-8"
                  validity={fieldState.invalid ? 'invalid' : undefined}
                  {...register('passwordConfirmation')}
                />
              )}
            </Field>
            <Button
              variant="main-green"
              isLoading={formState.isSubmitting}
              className="mb-3 w-64"
              type="submit"
            >
              {intl.formatMessage({ defaultMessage: 'Reset password' })}
            </Button>
          </div>
        </Form>
      </Layout>
      <Toast />
    </>
  );
};

export default ResetPassword;
