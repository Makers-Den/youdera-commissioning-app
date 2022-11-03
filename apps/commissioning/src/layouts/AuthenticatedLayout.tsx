import { useAuth } from '@src/integrations/youdera/auth/hooks/useAuth';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { Layout } from 'ui/layout/Layout';
import { NavHeaderProps } from 'ui/nav-header/NavHeader';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

export type AuthenticatedLayoutProps = {
  children: ReactNode;
};

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const { userInfoQuery, logOutMutation } = useAuth();
  const intl = useIntl();

  const router = useRouter();

  const logOut = async () => {
    await logOutMutation.mutateAsync();
    router.push('/login');
  };

  const navProps: NavHeaderProps = {
    variant: 'logo',
    items: [
      {
        key: 'set',
        children: (
          <Typography className="flex py-1 text-sm font-medium">
            <SvgIcon name="Settings" className="mr-3 w-5 text-orange-400" />
            {intl.formatMessage({ defaultMessage: 'Settings' })}
          </Typography>
        ),
      },
      {
        key: 'log',
        children: (
          <button type="button" onClick={logOut}>
            <Typography className="flex py-1 text-sm font-medium">
              <SvgIcon
                name="LogOut"
                className="mr-3 w-5 text-orange-400"
                color="rgb(245 126 2 / 1)"
              />
              {intl.formatMessage({ defaultMessage: 'Logout' })}
            </Typography>
          </button>
        ),
      },
    ],
    imgSrc: userInfoQuery.data?.avatar || '',
    imgAlt: 'avatar',
    // TODO maybe create a class so we can have some getters to make this a little bit prettier
    title: `${userInfoQuery.data?.first_name} ${userInfoQuery.data?.last_name}`,
    subTitle: userInfoQuery.data?.role || '',
  };

  const linksProps = [
    {
      name: intl.formatMessage({ defaultMessage: 'Legal Notice' }),
      href: 'google.com',
    },
    {
      name: intl.formatMessage({ defaultMessage: 'Privacy Policy' }),
      href: 'google.com',
    },
  ];

  return (
    <Layout footer={{ links: linksProps }} nav={navProps}>
      {children}
    </Layout>
  );
}
