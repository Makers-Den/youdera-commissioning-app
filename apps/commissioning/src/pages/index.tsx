import { getUserInfo } from '@src/integrations/youdera/auth/queries/getUserInfo';
import { Role } from '@src/integrations/youdera/auth/types';
import { protectRoute } from '@src/middlewares/protectRoute';
import { getAfterLoginRoute } from '@src/utils/routes';
import { GetServerSideProps } from 'next';
import React from 'react';

const Home = () => <div />

export default Home;

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.electrician, Role.roofer,
]).then(async () => {
  const currentUser = await getUserInfo();

  return {
    redirect: {
      destination: getAfterLoginRoute(currentUser.role)
    }
  };
});
