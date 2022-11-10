import { useAuth } from '@src/integrations/youdera/auth/hooks/useAuth';
import { LEGAL_NOTICE_URL, PRIVACY_POLICY_URL } from '@src/lib/constants';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { PrimaryFooterProps } from 'ui/footer/Footer';
import { ButtonsFooterProps } from 'ui/footer/FooterButtons';
import { Layout } from 'ui/layout/Layout';
import { NavHeaderProps } from 'ui/nav-header/NavHeader';
import { ProfileDropdownProps } from 'ui/profile-dropdown/ProfileDropdown';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

import Logo from '../assets/logo.png';

export type AuthenticatedLayoutProps = {
  children: ReactNode;
  navVariant?: NavHeaderProps['variant'];
  onNavCrossClick?: NavHeaderProps['onClick'];
  navHeader?: NavHeaderProps['header'];
  footerProps?: PrimaryFooterProps | ButtonsFooterProps;
};

export function AuthenticatedLayout({
  children,
  navHeader,
  navVariant,
  onNavCrossClick,
  footerProps,
}: AuthenticatedLayoutProps) {
  const { userInfoQuery, logOutMutation } = useAuth();
  const intl = useIntl();

  const router = useRouter();

  const logOut = async () => {
    await logOutMutation.mutateAsync();
    router.push('/login');
  };

  const user: ProfileDropdownProps["user"] | undefined = useMemo(() => (
    userInfoQuery.data 
    ? {
      imgSrc: userInfoQuery.data?.avatar,
      firstName: userInfoQuery.data?.first_name,
      lastName: userInfoQuery.data?.last_name,
      role: userInfoQuery.data?.role,
    } : undefined), [userInfoQuery.data]); 

  const profileItems = [
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
  ];

  const navProps: NavHeaderProps = {
    variant: navVariant || 'logo',
    logoSrc: Logo.src,
    onClick: onNavCrossClick,
    header: navHeader,
    profileItems,
    user
  };

  const computedFooterProps = footerProps || {
    links: [
      {
        name: intl.formatMessage({ defaultMessage: 'Legal Notice' }),
        href: LEGAL_NOTICE_URL,
      },
      {
        name: intl.formatMessage({ defaultMessage: 'Privacy Policy' }),
        href: PRIVACY_POLICY_URL,
      },
    ],
  };

  return (
    <Layout footer={computedFooterProps} nav={navProps}>
      {children}
    </Layout>
  );
}
