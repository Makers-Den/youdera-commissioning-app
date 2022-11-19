import { getSite } from '@src/api/youdera/hooks/sites/apiRequests';
import { GetServerSidePropsContext } from 'next';

export const fetchStringsFromParams = async (
  context: GetServerSidePropsContext,
) => {
  const { params } = context;
  const { projectId, roofId } = params || {};

  if (!projectId) {
    return {
      notFound: true,
    };
  }

  try {
    const project = await getSite(String(projectId));
    return {
      props: {
        project,
        roofId,
        siteId: projectId,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
