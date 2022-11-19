import { Role } from '@src/api/youdera/apiTypes';
import { getUserInfo } from '@src/api/youdera/hooks/auth/apiRequests';
import { protectRoute } from '@src/middlewares/protectRoute';
import { getAfterLoginRoute } from '@src/utils/routes';
import { GetServerSideProps } from 'next';
import React from 'react';

const Home = () => <div />;

export default Home;

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.electrician,
  Role.roofer,
]).then(async () => {
  const currentUser = await getUserInfo();

  return {
    redirect: {
      destination: getAfterLoginRoute(currentUser.role),
    },
  };
});
