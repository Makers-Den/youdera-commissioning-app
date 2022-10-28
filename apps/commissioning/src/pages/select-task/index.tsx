/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */

import React from 'react'
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { CardLink } from 'ui/card-link/CardLink';
import { Layout } from 'ui/layout/Layout'
import { SvgIcon } from 'ui/svg-icons/SvgIcon';


const SelectTask: React.FC = () => {
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
    <Layout footer={{ links }}>
      <Box>
        <BoxHeader>
          <BoxTitle title='Select task' />
        </BoxHeader>
        <BoxContent className='flex space-x-4'>
          <CardLink title='Commissioning' href='http://google.com' icon={<SvgIcon name='Close' />} />
          <CardLink title='Commissioning' href='http://google.com' icon={<SvgIcon name='Close' />} />
          <CardLink title='Commissioning' href='http://google.com' icon={<SvgIcon name='Close' />} />
        </BoxContent>
      </Box>
    </Layout>
  )
}

export default SelectTask