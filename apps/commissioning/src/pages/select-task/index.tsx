/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */

import React from 'react'
import { useIntl } from 'react-intl';
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { CardLink } from 'ui/card-link/CardLink';
import { Layout } from 'ui/layout/Layout'
import { NavHeaderProps } from 'ui/nav-header/NavHeader';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

const SelectTask: React.FC = () => {
  const intl = useIntl()
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

  const navProps: NavHeaderProps = {
    variant: 'logo',
    items:
      [
        {
          key: 'set',
          children: (
            <Typography className="flex text-sm py-1 font-medium">
              <SvgIcon name="Settings" className="text-orange-400 w-5 mr-3" />
              {intl.formatMessage({ defaultMessage: 'Settings' })}
            </Typography>
          ),
        },
        {
          key: 'log',
          children: (
            <Typography className="flex text-sm py-1 font-medium">
              <SvgIcon
                name="LogOut"
                className="text-orange-400 w-5 mr-3"
                color="rgb(245 126 2 / 1)"
              />
              {intl.formatMessage({ defaultMessage: 'Logout' })}
            </Typography>
          ),
        }
      ],
    imgSrc: "https://v.wpimg.pl/MTkyNjg0YjUKGzhZSEtvIElDbAMOEmF2Hlt0SEgIfWQTVigDC1U_MRsWYA0VRT01HAlgGgsfLCQCVjhbSFQkJxsVLxNIVSA2Dh1hCFNSdGxbSXtHBgB6MkZNelwDHXUwD0BjWF4FdWcPSyoOAVEudhY",
    imgAlt: "avatar",
    title: "Johny Joe",
    subTitle: "Roofer"
  }

  return (
    <Layout footer={{ links: linksProps }} nav={navProps}>
      <Box className='justify-self-start'>
        <BoxHeader>
          <BoxTitle title={intl.formatMessage({ defaultMessage: 'Select task' })} />
        </BoxHeader>
        <BoxContent className='flex space-x-4'>
          <CardLink title={intl.formatMessage({ defaultMessage: 'Commissioning' })} href='http://google.com' icon={<SvgIcon name='Commissioning' />} />
          <CardLink title={intl.formatMessage({ defaultMessage: 'Device swap' })} href='http://google.com' icon={<SvgIcon name='DeviceSwap' />} disabled />
          <CardLink title={intl.formatMessage({ defaultMessage: 'Extenstion' })} href='http://google.com' icon={<SvgIcon name='Extention' />} disabled />
        </BoxContent>
      </Box>
    </Layout >
  )
}

export default SelectTask