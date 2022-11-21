import { getInverters } from '@src/api/youdera/hooks/inverters/apiRequests';
import { GetServerSidePropsContext } from 'next';

export const fetchInvertersFromParams = async (
  context: GetServerSidePropsContext,
) => {
  const { params } = context;
  const { siteId } = params || {};

  if (!siteId) {
    return {
      notFound: true,
    };
  }

  try {
    const inverters = await getInverters(Number(siteId));
    return {
      props: {
        inverters,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
