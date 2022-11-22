import { LEGAL_NOTICE_URL, PRIVACY_POLICY_URL } from '@src/lib/constants';
import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { Layout } from 'ui/layout/Layout';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { BodyText, H2 } from 'ui/typography/Typography';

const ResetPasswordSuccess = () => {
  const intl = useIntl();

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
    </Layout>
  );
};

export default ResetPasswordSuccess;
