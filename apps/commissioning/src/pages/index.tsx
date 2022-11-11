import { getUserInfo } from '@src/integrations/youdera/auth/queries/getUserInfo';
import { Role } from '@src/integrations/youdera/auth/types';
import { protectRoute } from '@src/middlewares/protectRoute';
import { GetServerSideProps } from 'next';
import { redirect } from 'next/dist/server/api-utils';
import React from 'react';

const Home = () => <div />

export default Home;

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.electrician, Role.roofer,
]).then(async () => {
  const currentUser = await getUserInfo();

  if (currentUser.role === Role.electrician) {
    return {
      redirect: {
        destination: '/electrician/select-task'
      }
    };
  }

  if (currentUser.role === Role.roofer) {
    return {
      redirect: {
        destination: '/roofer/select-task'
      }
    };
  }

  return {
    props: {}
  };
});
